const lib = require('lib')({token: process.env.STDLIB_TOKEN});

const getBotToken = require('../helpers/get_bot_token.js');
const message = require('../utils/message.js');

/**
 * Slack Actions (Interactive Messages) Response Handler
 *   This function receives actions (interactive messages) from Slack and
 *     dispatches the appropriate handler. You should use this function as the
 *     endpoint for all actions, and place action handlers in
 *     /functions/actions/NAME.js, where NAME is the name parameter of the
 *     action you are dispatching from your interactive message.
 *
 *   You can test from the command line using:
 *     lib .actions.NAME [username] [channel name]
 *
 *   For more about interactive messages and how to respond to them, see Slack's
 *     documentation: https://api.slack.com/docs/message-buttons
 *
 *   You should not need to modify this file to get a basic Slack app running.
 *
 * @bg empty
 * @returns {object}
 */
module.exports = (context, callback) => {

  let params = context.params;
  let dialog;

  if (params.payload) {
    try {
      dialog = JSON.parse(params.payload);
    } catch (err) {
      return callback(err)
    }
  }

  if (!dialog) {
    return callback(null, {error: 'No dialog specified'});
  }

  // Use dialog.callback_id to distinguish between different dialogs

  let user = dialog.user; // Object with username and id
  let channel = dialog.channel; // Object with name and id
  let submission = dialog.submission; // Object with name and value pairs
  let team = dialog.team;

  getBotToken(team.id, (err, botToken) => {

    if (err) {
      callback(err);
    }

    // Do whatever you want here
    message(
      botToken,
      dialog.channel.id,
      'hey, you chose: ' + JSON.stringify(submission),
      callback
    );

  });

};
