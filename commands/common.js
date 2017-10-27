'use strict';

const fs = require('fs');
const path = require('path');

class Common {
    constructor() {
    }

    static readLocalConfig(pathToProject) {
        let config;

        try {
            const configPath = path.resolve(pathToProject, './react-xtruct.json');

            config = JSON.parse(fs.readFileSync(configPath, {encoding: 'utf-8'}));

            config.fromProcessDir = true;
        } catch (e) {
        }

        return config;
    }

    static readGlobalConfig() {
        let config;

        try {
            const configPath = path.resolve(process.cwd(), `${this.getUserHomeDirectory()}/.react-xtruct.json`);

            config = JSON.parse(fs.readFileSync(configPath, {encoding: 'utf-8'}));
        } catch (e) {
        }

        return config;
    }

    static toTitleCase(name) {
        const nameTemp = name.split(' ');

        for (let i = 0; i < nameTemp.length; i++) {
            let j = nameTemp[i].charAt(0).toUpperCase();

            nameTemp[i] = j + nameTemp[i].substr(1);
        }

        return nameTemp.join(' ');
    };

    static getUserHomeDirectory() {
        return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
    }

    static getFilenameFromPath(path) {
        return path.replace(/^.*[\\\/]/, '');
    }
}

module.exports = Common;
