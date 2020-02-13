/**
 * The main entry point of the app.
 */

const controller = require('controller');
const express = require('express');
const log = require('log');
const morgan = require('morgan');

// ************************** //
// ***** INITIALIZATION ***** //
// ************************** //

const app = express();
const port = 80;

// Store the Express app in the log module so it can be used in log messages
log.setApp(app);

// Set the app name
// TODO Update 'base-node-project' to your project name
app.set('name', 'base-node-project');

// Logs requests to STDOUT
app.use(morgan('combined'));

// Load requests for static files from the public directory
app.use(express.static('public'));

// Define page request actions
app.get('/', controller.homeAction);
app.get('/test/:foo(\\d+)/:bar([a-zA-Z]+)', controller.testAction);
app.get('/test-html', controller.testHtmlAction);
app.get('/test-json', controller.testJsonAction);

// Begin listening for requests
app.listen(port, (err) => {
    if (err) {
        log.error(`Could not create server: ${err}`);
    } else {
        log.log(`Listening on port ${port}.`);
    }
});
