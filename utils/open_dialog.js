/**
  Slack Dialog Utility

  Opens a dialog in response to a trigger, provided the appropriate bot token.
  For full documentation see: https://api.slack.com/methods/dialog.open
*/

const request = require('request');

module.exports = (token, triggerId, dialog, callback) => {

  let data = {
    token: token,
    trigger_id: triggerId,
    dialog: JSON.stringify(dialog)
  };

  // If no token, assume development
  if (!token) {
    console.log('Warning: No token provided for message');
    return callback(null, data);
  }

  request.post({
    uri: 'https://slack.com/api/dialog.open',
    form: data
  }, (err, result) => {

    if (err) {
      return callback(err);
    }

    let body;
    try {
      body = JSON.parse(result.body);
    } catch (e) {
      body = {}
    }

    if (!body.ok) {
      return callback(new Error(body.error ? `Slack Error: ${body.error}` : 'Invalid JSON Response from Slack'));
    }

    callback(null, data);

  });

};
