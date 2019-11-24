/**
 * The actions for requests.
 *
 * @module Controller
 */

const web = require('web');

module.exports = new function () {
    /**
     * Homepage handler.
     *
     * @param {Request} req
     * @param {Response} res
     */
    this.homeAction = async function (req, res) {
        let html = 'This is the homepage.';

        let log = require('log');
        log.warn('test');

        await web.htmlResponse(res, html);
    };

    /**
     * Test handler.
     *
     * @param {Request} req
     * @param {Response} res
     */
    this.testAction = async function (req, res) {
        let foo = parseInt(req.params.foo);
        let bar = req.params.bar;

        if (isNaN(foo) || !bar) {
            res.sendStatus(404);
            return;
        }

        let html = 'The URL set:<ul>';
        html += `<li>foo = ${foo} (must be 0-9)</li>`;
        html += `<li>bar = ${bar} (must be a-z or A-Z)</li>`;
        html += '</ul>';

        await web.htmlResponse(res, html);
    };

    this.testHtmlAction = async function (req, res) {
        let html = 'This raw HTML page has no template.';
        html += '<br><br><a href="/">Back to the homepage</a>';

        await web.htmlRawResponse(res, html);
    };

    this.testJsonAction = async function (req, res) {
        await web.jsonResponse(res, {'success': true});
    };
};
