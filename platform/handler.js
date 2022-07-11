"use strict";

const Cookie = require("cookie");
const DOMAIN = "aws-next.myfanpark.com"; // process.env.DOMAIN;

// edgeRedirect solves the Cloudfront website use-case

/*
  Typical Cloudfront event structure to consume:
  {
    "Records": [
      {
        "cf": {
          "request": {
            "uri": "/test",
            "headers": {
              "cloudfront-viewer-country": [
                {
                  key: "Cloudfromt-Viewer-Country",
                  value: "FR"
                }
              ]
            }
          }
        }
      }
    ]
  }
*/

module.exports.edgeRedirect = (event, context, callback) => {
  console.log(JSON.stringify(event));
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  const uri = request.uri === "/index.html" ? "/" : request.uri;
  const countryCode = headers["cloudfront-viewer-country"][0].value;
  
  console.log(`URI: '${uri}'`);
  console.log(`Country detected: '${countryCode}'`);
  
  if ( uri.includes("en-ZA") || uri.includes("en-CA") || uri.includes("en-US")) {
    callback(null, request);
  }

  var cookies = Cookie.parse(headers["cookie"][0].value);
  if ( "NEXT_LOCALE" in cookies) {
    countryCode = cookies["NEXT_LOCALE"]
  }

  if (['ZA', 'CA'].includes(countryCode)) {
    const response = {
      status: "302",
      statusDescription: "Found",
      headers: {
        location: [
          {
            key: "Location",
            value: `https://${DOMAIN}/en-${countryCode}${uri}`
          }
        ],
        ["cache-control"]: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, private"
          }
        ]
      }
    };
    callback(null, response);
  } else {
    // Allow request to continue as intended
    callback(null, request);
  }
};
