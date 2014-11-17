/*
 * routes.js - module to provide routing
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  configRoutes,
  mongodb     = require( 'mongodb' ),

  mongoServer = new mongodb.Server(
    'localhost',
    mongodb.Connection.DEFAULT_PORT
  ),
  dbHandle    = new mongodb.Db(
    'cemcollection', mongoServer, { safe : true }
  ),

  makeMongoId = mongodb.ObjectID;
// ------------- END MODULE SCOPE VARIABLES ---------------

// ---------------- BEGIN PUBLIC METHODS ------------------
configRoutes = function ( app, server ) {
  app.all( '/:obj_type/*?', function ( request, response, next ) {
    response.contentType( 'json' );
    next();
  });

  app.post( '/cemetery/create', function ( request, response ) {
    dbHandle.collection(
      // Note I hardwired this; it should come from the URL as in the book
      'cemetery',
      function ( outer_error, collection ) {
        var
          options_map = { safe: true },
          obj_map     = request.body;
	  console.log(request.body);
          collection.insert(
            obj_map,
            options_map,
            function ( inner_error, result_map ) {
	      // I think we should return the _id here, if possible
	      // But ATM I don't know how. . . 
              response.send( JSON.stringify( result_map ));
              }
          ); // end insert
        } // end outer func
    ); // end handler
  });

  app.post( '/:obj_type/update/:id', function ( request, response ) {
    var
      find_map = { _id: makeMongoId( request.params.id ) },
      obj_map  = request.body;

    dbHandle.collection(
      request.params.obj_type,
      function ( outer_error, collection ) {
        var
          sort_order = [],
          options_map = {
            'new' : true, upsert: false, safe: true
          };

        collection.findAndModify(
          find_map,
          sort_order,
          obj_map,
          options_map,
          function ( inner_error, updated_map ) {
            response.send( updated_map );
          }
        );
      }
    );
  });

  app.get( '/:obj_type/delete/:id', function ( request, response ) {
    var find_map = { _id: makeMongoId( request.params.id ) };

    dbHandle.collection(
      request.params.obj_type,
      function ( outer_error, collection ) {
        var options_map = { safe: true, single: true };

        collection.remove(
          find_map,
          options_map,
          function ( inner_error, delete_count ) {
            response.send({ delete_count: delete_count });
          }
        );
      }
    );
  });
};

module.exports = { configRoutes : configRoutes };
// ----------------- END PUBLIC METHODS -------------------

// ------------- BEGIN MODULE INITIALIZATION --------------
dbHandle.open( function () {
  console.log( '** Connected to MongoDB **' );
});
// -------------- END MODULE INITIALIZATION ---------------
