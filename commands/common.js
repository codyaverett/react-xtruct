'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const spawn = require('cross-spawn');

class Common {
    constructor() {
    }

    static readLocalConfig(pathToProject) {
        let config;

        try {
            const configPath = path.resolve(pathToProject, './react-xtruct.json');

            config = JSON.parse(fs.readFileSync(configPath, {encoding: 'utf-8'}));
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

    static getSystemInfo(callback) {
        let system = {
            node: this.nodeVersion(),
            npm: this.npmVersion(),
            yarn: this.yarnVersion(),
            os: this.osVersion()
        };

        return system;
    }

    static getDependencyManager(path) {
        const localConfig = this.readLocalConfig(path);
        const globalConfig = this.readGlobalConfig();
        const dependencyManagerLocal = localConfig && localConfig.options && localConfig.options.dependencyManager ?
            localConfig.options.dependencyManager : null;
        const dependencyManagerGlobal = globalConfig && globalConfig.options && globalConfig.options.dependencyManager ?
            globalConfig.options.dependencyManager : null;

        return dependencyManagerLocal || dependencyManagerGlobal || 'npm';
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

    static npmVersion() {
        let version = 'No version available!';

        try {
            const npm = spawn.sync('npm', ['--version']);

            return `${npm.stdout.toString().replace('\n', '')}`;
        } catch (e) {
            return version;
        }
    }

    static yarnVersion() {
        let version = 'No version available!';

        try {
            const yarn = spawn.sync('yarn', ['version']);

            return `${yarn.stdout.toString().replace('\n', '')}`;
        } catch (e) {
            return version;
        }
    }

    static nodeVersion(callback) {
        let version = 'No version available!';

        try {
            const node = spawn.sync('node', ['--version']);

            return `${node.stdout.toString().replace('\n', '')}`;
        } catch (e) {
            return version;
        }
    }

    static osVersion() {
        let platform = os.platform();
        let system;

        if (platform === 'darwin')
            system = 'macOS';
        else if (platform === 'win32')
            system = 'Windows';
        else
            system = 'Linux';

        return `${system || 'No version available!'}`;
    }
}

module.exports = Common;
