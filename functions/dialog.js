const lib = require('lib')({token: process.env.STDLIB_TOKEN});

const getBotToken = require('../helpers/get_bot_token.js');
const message = require('../utils/message.js');

/**
 * Slack Dialog (Interactive Messages) Response Handler
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

  // Use dialog.callback_id to distinguish between different dialogs if you need to

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
