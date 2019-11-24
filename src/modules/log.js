/**
 * Centralized logging functions, for consistent formatting with a timestamp.  If prefix is present, prints it inside
 * square brackets before the message. Logs to STDERR.
 *
 * @module Log
 */

module.exports = new function () {
    // ********************* //
    // ***** VARIABLES ***** //
    // ********************* //

    /** @type {object} Private object-scope variables. */
    let my = {
        /** @type {express} The Express app. This should be set immediately when the app is being initialized. */
        app: undefined,
    };

    // ********************* //
    // ***** FUNCTIONS ***** //
    // ********************* //

    // ------ //
    // PUBLIC //
    // ------ //

    /**
     * Log an error.
     *
     * @param {string|*} message Must be JSON-encodable.
     * @param {string} [prefix]
     */
    this.error = function (message, prefix) {
        log('error', message, prefix);
    };

    /**
     * Log a message.
     *
     * @param {string|*} message Must be JSON-encodable.
     * @param {string} [prefix]
     */
    this.log = function (message, prefix) {
        log('log', message, prefix);
    };

    /**
     * Store the Express app for later use.
     *
     * @param {express} app
     */
    this.setApp = function (app) {
        my.app = app;
    };

    /**
     * Log a warning.
     *
     * @param {string|*} message Must be JSON-encodable.
     * @param {string} [prefix]
     */
    this.warn = function (message, prefix) {
        log('warn', message, prefix);
    };

    // ------- //
    // PRIVATE //
    // ------- //

    function log(type, message, prefix) {
        let appName = my.app ? my.app.get('name') : 'node app';

        let date = (new Date()).toISOString();

        let typeName = type.charAt(0).toUpperCase() + type.slice(1);

        if (prefix) {
            prefix = `[${prefix}] `;
        } else {
            prefix = '';
        }

        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        }

        console[type](`[${appName}] [${date}] ${typeName}: ${prefix}${message}`);
    }
};
