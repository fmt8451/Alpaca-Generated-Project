/*
 * app.js - Express server with routing
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
  http    = require( 'http'         ),
  express = require( 'express'      ),
  routes = require('./routes.js'    ),
  app     = express(),
  server  = http.createServer( app );
// ------------- END MODULE SCOPE VARIABLES ---------------

// ------------- BEGIN SERVER CONFIGURATION ---------------
app.configure( function () {
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( express.static( __dirname + '' ) );
  app.use(app.router);
});

routes.configRoutes( app, server );

// -------------- END SERVER CONFIGURATION ----------------
// ----------------- BEGIN START SERVER -------------------
server.listen( 8000 );
console.log(
  'Express server listening on port %d in %s mode',
   server.address().port, app.settings.env
);
// ------------------ END START SERVER --------------------
