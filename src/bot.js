const { Telegraf } = require('telegraf');

const TOKEN = `${global.CONFIGURATION.botConfig.secret}${global.CONFIGURATION.botConfig.secondVerse}`;
// const port = global.CONFIGURATION.serverInfo.port;
const url = global.CONFIGURATION.serverInfo.publishHost;
const hookPath = global.CONFIGURATION.botConfig.hookPath;
const bot = new Telegraf(TOKEN);

// bot.telegram.deleteWebhook();
bot.telegram.setWebhook(`${url}${hookPath}${TOKEN}`);
bot.startWebhook(`${hookPath}${TOKEN}`, null);
// bot.launch()

module.exports = bot;