const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const openDialog = require('../../utils/open_dialog.js');

/**
* /hello
*
*   Basic "Hello World" command.
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
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
  // return callback();
  // callback(null, {
  //   text: `Hello, <@${user}>!\nNow that you've selected a building, select a time and duration for your meeting`,
  //   replace_original: false,
  //   delete_original: false,
  //   attachments: [
        // {
        //     text: 'Choose a building',
        //     fallback: 'Can\'t display buildings',
        //     color: '#0051a5 ',
        //     callback_id: 'building_selection',
        //     actions: [
        //         {
        //             name: 'building',
        //             text: 'pick a building...',
        //             type: 'select',
        //             options: [
        //                 {
        //                     text: 'WPP',
        //                     value: 'wpp'
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     text: 'Choose a meeting time',
        //     fallback: 'Can\'t display meeting times',
        //     color: '#0051a5 ',
        //     callback_id: 'time_selection',
        //     actions: [
        //         {
        //             name: 'hours',
        //             text: 'hrs',
        //             type: 'select',
        //             options: [
        //                 {
        //                     text: '6 o'clock',
        //                     value: '6'
        //                 },
        //                 {
        //                     text: '7 o'clock',
        //                     value: '7'
        //                 },
        //                 {
        //                     text: '8 o'clock',
        //                     value: '8'
        //                 },
        //                 {
        //                     text: '9 o'clock',
        //                     value: '9'
        //                 },
        //                 {
        //                     text: '10 o'clock',
        //                     value: '10'
        //                 },
        //                 {
        //                     text: '11 o'clock',
        //                     value: '11'
        //                 },
        //                 {
        //                     text: '12 o'clock',
        //                     value: '12'
        //                 },
        //                 {
        //                     text: '1 o'clock',
        //                     value: '1'
        //                 },
        //                 {
        //                     text: '2 o'clock',
        //                     value: '2'
        //                 },
        //                 {
        //                     text: '3 o'clock',
        //                     value: '3'
        //                 },
        //                 {
        //                     text: '4 o'clock',
        //                     value: '4'
        //                 },
        //                 {
        //                     text: '5 o'clock',
        //                     value: '5'
        //                 }
        //             ]
        //         },
        //         {
        //             name: 'minutes',
        //             text: 'mins',
        //             type: 'select',
        //             options: [
        //                 {
        //                     text: '00 mins',
        //                     value: '0'
        //                 },
        //                 {
        //                     text: '15 mins',
        //                     value: '15'
        //                 },
        //                 {
        //                     text: '30 mins',
        //                     value: '30'
        //                 },
        //                 {
        //                     text: '45 mins',
        //                     value: '45'
        //                 }
        //             ]
        //         }
        //     ]
        // }
  //   ]
  // });
};
