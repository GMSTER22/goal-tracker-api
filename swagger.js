const swaggerAutogen = require('swagger-autogen');

// Change needDevMode to true when you need to run localhost:8080 for dev work
// Change needDevMode to false when you need to ship the code & deploy to Render.com
// This allows you to quickly switch between modes with one action, rather than going into swagger.json to change the host & schemes manually
// If you set needDevMode to false, that is meant to be used only when shipping & deploying code to Render.com.
const needDevMode = false;
let doc = {
  info: {
    title: 'Goal Tracker API',
    description: 'An API used to track goals for the parents and the youth.'
  }
};

if (needDevMode) {
  doc.host = 'localhost:8080';
  doc.schemes = ['http', 'https'];
} else {
  doc.host = 'goal-tracker-javr.onrender.com';
  doc.schemes = ['https'];
}

console.log(doc);

const outputFile = 'swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
  'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
