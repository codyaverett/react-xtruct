#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const packageFilePath = path.resolve(__dirname, '../package.json');

const packageFile = JSON.parse(fs.readFileSync(packageFilePath));
const version = packageFile.version.split('.');
const args = process.argv;

let major = +version[0];
let minor = +version[1];
let patch = +version[2];
let newVersion;
let filePath;

if (args.indexOf('patch') > -1) {
    patch++;
} else if (args.indexOf('minor') > -1) {
    minor++;
    patch = 0;
} else if (args.indexOf('major') > -1) {
    major++;
    minor = 0;
    patch = 0;
}

newVersion = `${major}.${minor}.${patch}`;

filePath = args[3];

fs.createReadStream(path.resolve(__dirname, filePath)).on('data', (data) => {
    try {
        const jsonContent = JSON.parse(data.toString());

        if (jsonContent.dependencies && jsonContent.dependencies['react-xtruct']) {
            jsonContent.dependencies['react-xtruct'] = `^${newVersion}`;

            fs.createWriteStream(path.join(__dirname, filePath)).write(JSON.stringify(jsonContent, null, 4));

            console.log(`Updated version from ${version.toString().replace(/,/g, '.')} to ${newVersion} in ${filePath}`);
        } else {
            console.error(`File not recognized, version update failed!`);
        }
    } catch (e) {
        const data2String = data.toString();
        let dataReplaced = data2String.replace(/([0.9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2})/g, newVersion);

        fs.createWriteStream(path.join(__dirname, filePath)).write(dataReplaced);

        console.log(`Updated version from ${version.toString().replace(/,/g, '.')} to ${newVersion} in ${filePath}`);
    }
});


