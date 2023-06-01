var bot = require("../bot");
const BotService = require('../service/bot-service');
const botService = new BotService();
const CommonUtil = require('../lib/util/common-util');
const LanguageService = require("../service/language-service");

const idLang = new LanguageService('id');
const enLang = new LanguageService('en');

bot.hears(enLang.icons.about, async (ctx) => {
  var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
  await botService.about(ctx, languageService);
});

bot.hears(idLang.icons.about, async (ctx) => {
  var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
  await botService.about(ctx, languageService);
});

bot.hears(enLang.help, async (ctx) => {
  var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
  await botService.about(ctx, languageService);
});

bot.hears(idLang.help, async (ctx) => {
  var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
  await botService.about(ctx, languageService);
});

// bot.hears(enLang.icons.back, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.restart(ctx, languageService);
// });

// bot.hears(idLang.icons.back, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.restart(ctx, languageService);
// });

// bot.hears(enLang.icons.restart, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.restart(ctx, languageService);
// });

// bot.hears(idLang.icons.restart, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.restart(ctx, languageService);
// });

// bot.hears(enLang.icons.report, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.report(ctx, languageService);
// });

// bot.hears(idLang.icons.report, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.report(ctx, languageService);
// });

// bot.hears(enLang.icons.diseaseEntry, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.diseaseEntry(ctx, languageService);
// });

// bot.hears(idLang.icons.diseaseEntry, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.diseaseEntry(ctx, languageService);
// });

// bot.hears(idLang.icons.skdrReportEntry, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.skdrReportEntry(ctx, languageService);
// });

// bot.hears(enLang.icons.skdrReportEntry, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.skdrReportEntry(ctx, languageService);
// });

// bot.hears(enLang.icons.bulletin, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.bulletin(ctx, languageService);
// });

// bot.hears(idLang.icons.bulletin, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.bulletin(ctx, languageService);
// });

// bot.hears(idLang.icons.info, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.info(ctx, languageService);
// });

// bot.hears(enLang.icons.changeLanguage, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.changeLanguage(ctx, languageService);
// });

// bot.hears(idLang.icons.changeLanguage, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.changeLanguage(ctx, languageService);
// });

// bot.hears(enLang.icons.dashboard, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.analytics(ctx, languageService);
// });

// bot.hears(idLang.icons.dashboard, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.analytics(ctx, languageService);
// });

// bot.hears(enLang.icons.profile, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.profile(ctx, languageService);
// });

// bot.hears(idLang.icons.profile, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   await botService.profile(ctx, languageService);
// });

// bot.hears(idLang.icons.gpt, async (ctx) => {
//   var languageService = await CommonUtil.prepareLanguage(ctx.from.id);
//   const OpenAIService = require('../service/open-ai-service');
//   const openAIService = new OpenAIService();
//   await openAIService.createCompletions(ctx, languageService);
// });