var bot = require("../bot");
const BotService = require('../service/bot-service');
const botService = new BotService();
const CommonUtil = require('../lib/util/common-util');

bot.start(async (ctx) => {
    var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
    await botService.restart(ctx, languageService);
});

bot.command('restart', async (ctx) => {
    var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
    await botService.restart(ctx, languageService);
});

bot.command('reloadmenu', async (ctx) => {
    var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
    await botService.restart(ctx, languageService, true);
});

// bot.command('bot', async (ctx) => {
//     bot.telegram.sendMessage(ctx.chat.id, 'Pak Haji siap? Zidan siap?');
// });