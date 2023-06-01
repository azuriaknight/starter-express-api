// const LOGGER = require('../config/logger').logApp('bot-controller');
const bot = require("../bot");

const botCommand = require("../handler/command-handler")
// const botVerification = require("../handler/verification-handler")
// const botMention = require("../handler/mention-handler")
// const botAction = require("../handler/action-handler")
const botMessage = require("../handler/message-handler")
// const botOn = require("../handler/on-handler")

module.exports = class BotController {

    constructor() {
    }

    async processMessage(payload) {
        try {
            // LOGGER.error(payload);
            // console.log(payload)
            bot.handleUpdate(payload)
        } catch (error) {
            console.log(error)
            LOGGER.error(error);
        }
    }

};
