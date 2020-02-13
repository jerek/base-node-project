/**
 * Generic functions related to the web interface.
 *
 * @module Web
 */

const log = require('log');

module.exports = new function () {
    // ********************* //
    // ***** CONSTANTS ***** //
    // ********************* //

    /** @type {number} The default number of seconds we'll let the browser cache responses. */
    const CACHE_TIME = 12 * 60 * 60;

    // ********************* //
    // ***** FUNCTIONS ***** //
    // ********************* //

    // ------ //
    // PUBLIC //
    // ------ //

    /**
     * Send an HTML response to the user without the site template.
     *
     * @param {Response} res
     * @param {string} response
     * @param {number|null} [cacheTime] Use null to set a page to not cache.
     */
    this.htmlRawResponse = async function (res, response, cacheTime) {
        sendResponse(res, 'text/html', response, cacheTime);
    };

    /**
     * Send an HTML response to the user using the site template.
     *
     * @param {Response} res
     * @param {string} response
     * @param {number|null} [cacheTime] Use null to set a page to not cache.
     */
    this.htmlResponse = async function (res, response, cacheTime) {
        // Construct the HTML with a simple template
        // TODO You should implement a templating system
        let title = '<title>Base Node Project</title>';
        let styles = '<style>@import "/css/styles.css";</style>';
        let head = `<head>${title}${styles}</head>`;
        let navItems = [
            '<a href="/">Home</a>',
            '<a href="/test/123/abc">Test page with params</a>',
            '<a href="/test-html">Raw HTML page</a>',
            '<a href="/test-json">JSON page</a>',
        ];
        let nav = '<nav>' + navItems.join('') + '</nav>';
        let body = `<body>${nav}${response}</body>`;
        let html = `<html>${head}${body}</html>`;

        sendResponse(res, 'text/html', html, cacheTime);
    };

    /**
     * Send a JSON response to the user.
     *
     * Note that data sent to this function should not be JSON encoded yet.
     *
     * @param {Response} res
     * @param {*} response Any JSON-encodable content.
     * @param {number|null} [cacheTime] Use null to set a page to not cache.
     */
    this.jsonResponse = async function (res, response, cacheTime) {
        let json = JSON.stringify(response);

        sendResponse(res, 'application/json', json, cacheTime);
    };

    // ------- //
    // PRIVATE //
    // ------- //

    /**
     * Send the given response to the user.
     *
     * @param {Response} res
     * @param {string} contentType A valid MIME type.
     * @param {string} content
     * @param {number|null} [cacheTime] Use null to set a page to not cache.
     */
    function sendResponse(res, contentType, content, cacheTime) {
        try {
            // Set the content type
            res.set('Content-Type', contentType);

            // Set the cache headers
            if (cacheTime === null) {
                res.set('Cache-Control', 'no-store');
                res.set('Expires', (new Date(0)).toUTCString());
            } else {
                if (typeof cacheTime !== 'number') {
                    cacheTime = CACHE_TIME;
                }
                res.set('Cache-Control', 's-maxage=' + cacheTime);
                res.set('Expires', (new Date(Date.now() + cacheTime * 1000)).toUTCString());
            }

            // Send the content
            res.send(content);
        } catch (e) {
            res.sendStatus(500);
            log.error(`Error generating response: ${e.message}`);
        }
    }
};
