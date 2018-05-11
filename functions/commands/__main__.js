const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const getBotToken = require('../../helpers/get_bot_token.js');
const message = require('../../utils/message.js');
const openDialog = require('../../utils/open_dialog.js');

/**
* Slack Slash Command Handler:
*   This function receives slash commands from Slack and dispatches
*   the appropriate handler. You should use this function as the endpoint
*   for all commands, and place commands in /functions/commands/NAME.js,
*   where NAME is the name of your command.
*
*   You can test individual slash commands from the command line with:
*     $ lib .commands.NAME [username] [channel] [text]
*
*   You should not need to modify this file to get a basic Slack app running.
*
* @returns {object}
*/
module.exports = (context, callback) => {
  let command = context.params;
  if (!command.command) {
    return callback(new Error('No command specified'));
  }
  if (command.command[0] !== '/') {
    return callback(new Error('Commands must start with /'));
  }
  let name = command.command.substr(1);
  getBotToken(command.team_id, (err, botToken) => {
    if (err) {
      callback(err);
    }
    openDialog(botToken, command.trigger_id, {
      callback_id: 'schedule_dialog',
      title: 'Request a Ride',
      submit_label: 'Request',
      elements: [
        {
          label: 'Choose a building',
          type: 'select',
          name: 'building',
          options: [
            {
                label: 'WPP',
                value: 'wpp'
            }
          ]
        }
      ]
    }, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, {});
    })
  });
};
