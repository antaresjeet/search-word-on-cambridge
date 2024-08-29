const fs = require('fs');
const path = require('path');

// load the package.json file
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// get the version from package.json
const version = packageJson.version;

// define paths for manifest files
const chromeManifestPath = path.join(__dirname, 'src/manifest-chrome.json');
const firefoxManifestPath = path.join(__dirname, 'src/manifest-firefox.json');

// update the version in Chrome manifest
const chromeManifest = JSON.parse(fs.readFileSync(chromeManifestPath, 'utf8'));
chromeManifest.version = version;
fs.writeFileSync(
  chromeManifestPath,
  JSON.stringify(chromeManifest, null, 2),
  'utf8'
);

// update the version in Firefox manifest
const firefoxManifest = JSON.parse(
  fs.readFileSync(firefoxManifestPath, 'utf8')
);
firefoxManifest.version = version;
fs.writeFileSync(
  firefoxManifestPath,
  JSON.stringify(firefoxManifest, null, 2),
  'utf8'
);

console.log(
  `Updated version to ${version} in manifest files and package.json.`
);
