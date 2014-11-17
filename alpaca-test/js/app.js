$('#form').alpaca({
    "schema": {
        "type": "object",
        "required": false,
        "properties": {
            "cemetery": {
                "type": "string",
                "required": false
            },
            "ownerType": {
                "required": true,
                "enum": [
                    "US",
                    "State",
                    "City",
                    "Township",
                    "Church",
                    "Private",
                    "Other"
                ]
            },
            "establishedDate": {
                "type": "string",
                "required": false
            },
            "hasRegistry": {
                "type": "boolean",
                "required": false
            },
            "hasReading": {
                "type": "boolean",
                "required": false
            }
        }
    },
    "options": {
        "focus": false,
        "type": "object",
        "validate": true,
        "disabled": false,
        "showMessages": true,
        "collapsible": true,
        "legendStyle": "button",
        "fields": {
            "cemetery": {
                "type": "text",
                "label": "Cemetery Name",
                "focus": false,
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40,
                "helper": "Official Cemetery Name"
            },
            "ownerType": {
                "type": "select",
                "label": "Ownership",
                "focus": false,
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "emptySelectFirst": false
            },
            "establishedDate": {
                "type": "date",
                "label": "Date Established",
                "focus": false,
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "size": 40,
                "dateFormat": "mm/dd/yy",
                "dateFormatRegex": {},
                "datepicker": {
                    "yearRange": "1860:1950",
                    "changeMonth": true,
                    "changeYear": true,
                    "dateFormat": "mm/dd/yy"
                }
            },
            "hasRegistry": {
                "type": "checkbox",
                "label": "Has official registry",
                "focus": false,
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "rightLabel": ""
            },
            "hasReading": {
                "type": "checkbox",
                "label": "Reading Document Available",
                "focus": false,
                "validate": true,
                "disabled": false,
                "showMessages": true,
                "rightLabel": ""
            }
        }
    },
    "data": {
        "ownerType": "Other",
        "establishedDate": "1/1/1888"
    }
});
