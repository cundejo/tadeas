const fs = require('fs');

/**
 * This script will run in CI before build the prod version to deploy.
 */

// Update the Service Worker cache to force an update in the clients.
const SW_FILEPATH = `${__dirname}/../public/service-worker.js`;
fs.readFile(SW_FILEPATH, 'utf8', function (err, data) {
  var formatted = data.replace(/cache_version_\d*/g, `cache_version_${new Date().getTime()}`);

  fs.writeFile(SW_FILEPATH, formatted, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

// Changing current version of the web application
const VERSION_FILEPATH = `${__dirname}/../src/common/config/version.json`;
//Serialize as JSON and Write it to a file
fs.writeFileSync(VERSION_FILEPATH, JSON.stringify({ version: new Date().getTime().toString() }));
