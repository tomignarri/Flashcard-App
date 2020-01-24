const request = require('request');
const uuidv4 = require('uuid/v4');


var key_var = 'TRANSLATOR_TEXT_SUBSCRIPTION_KEY';
if (!process.env[key_var]) {
    throw new Error('Please set/export the following environment variable: ' + key_var);
}
var subscriptionKey = process.env[key_var];
var endpoint_var = 'TRANSLATOR_TEXT_ENDPOINT';
if (!process.env[endpoint_var]) {
    throw new Error('Please set/export the following environment variable: ' + endpoint_var);
}
var endpoint = process.env[endpoint_var];



let options = {
    method: 'POST',
    baseUrl: endpoint,
    url: 'translate',
    qs: {
      'api-version': '3.0',
      'to': ['en']
    },
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    body: [{
          'text': 'hallo welt'
    }],
    json: true,
};

var accessBingTranslate = document.getElementById("accessBingTranslateButton");

function displayBingTranslate() {
  request(options, function(err, res, body){
    document.querySelector("#bingTranslateOutput") = JSON.stringify(body, null, 4);
  });
};


accessBingTranslate.addEventListener("click", function() {
  displayBingTranslate();
});




