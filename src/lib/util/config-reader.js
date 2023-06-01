const fs = require('fs');

const yaml = require('js-yaml');

//Unix
const filePath = `${process.env.PWD}/src/config/application-config.yml`;
//Windows
//const filePath = `${process.cwd()}/config/application-config.yml`;
let configFile = yaml.load(fs.readFileSync(filePath, 'utf8'));

class ConfigReader {
  constructor() {
    if (!new.target) {
      return new ConfigReader();
    }
  }

  static get(name) {
    let property = {};
    try {
      property = configFile;
      const results = name.split('.');
      for (let i = 0; i < results.length; i += 1) {
        property = property[`${results[i]}`];
      }
    } catch (e) {
      console.log(e);
    }
    return property;
  }

  static getByEnv(name) {
    let property = {};
    try {
      let env = 'DEVELOPMENT';
      if (process.env.NODE_ENV != null) {
        env = process.env.NODE_ENV.toUpperCase();
      }
      property = configFile[env];
      if (property === undefined) {
        property = configFile[env.toLowerCase()]
      }
      const results = name.split('.');
      for (let i = 0; i < results.length; i += 1) {
        property = property[`${results[i]}`];
      }
    } catch (e) {
      console.log(e);
    }
    return property;
  }

  static getEnv() {
    let property = {};
    try {
      let env = 'DEVELOPMENT';
      if (process.env.NODE_ENV != null) {
        env = process.env.NODE_ENV.toUpperCase();
      }
      property = configFile[env];
      if (property === undefined) {
        property = configFile[env.toLowerCase()]
      }
      return property;
    } catch (e) {
      console.log(e);
    }
    return property;
  }

  static reloadEnv() {
    try {
      let env = 'DEVELOPMENT';
      if (process.env.NODE_ENV != null) {
        env = process.env.NODE_ENV.toUpperCase();
      }
      configFile = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
      global.CONFIGURATION = configFile[env];
      if (global.CONFIGURATION === undefined) {
        global.CONFIGURATION = configFile[env.toLowerCase()]
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ConfigReader;
