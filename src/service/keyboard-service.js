const { Markup } = require('telegraf');
const commonUtil = require('../lib/util/common-util');
var bot = require('../bot');

module.exports = class KeyboardService {

    

    composeOnlyHelpKeyboard(languageService) {
        let keyboard = Markup.keyboard([[{
            text: languageService.icons.help,
        }]])

        return keyboard;
    }

    composeOptKeyboard(inlineKeyboard, keyboard) {
        let optPayload = {}
        if (!commonUtil.isEmpty(inlineKeyboard)) optPayload.inline_keyboard = inlineKeyboard
        if (!commonUtil.isEmpty(keyboard)) {
            optPayload.keyboard = keyboard
            optPayload.resize_keyboard = true
            optPayload.one_time_keyboard = true
        }
        let optCustomKeyboard = {
            reply_markup: JSON.stringify(optPayload)
        };

        return optCustomKeyboard;
    }

    async composeLanguageKeyboard(ctx, languageService) {
        var buttons = [];

        const RedisService = require('./redis-service');
        const redisService = new RedisService();
        var cache = await redisService.getUserLanguageCache(ctx.from.id);
        var selectedLanguage = global.CONFIGURATION.botConfig.defaultLanguage;

        if (cache) {
            selectedLanguage = cache;
        }

        buttons.push([Markup.button.callback(`🇺🇸 English ${selectedLanguage == 'en' ? '✅' : ''}`, selectedLanguage == 'en' ? ' ' : 'Language:en')]);
        buttons.push([Markup.button.callback(`🇮🇩 Bahasa Indonesia ${selectedLanguage == 'id' ? '✅' : ''}`, selectedLanguage == 'id' ? ' ' : 'Language:id')]);
        buttons.push(this.getBackButton(languageService));
        let keyboard = Markup.inlineKeyboard(buttons);

        return bot.telegram.sendMessage(ctx.chat.id, languageService.chooseLanguage, keyboard);
    }

    composeUserKeyboardFromModules(modules, languageService) {
        let keyboardResult = []
        var rowKeyboard = []
        for (let i = 0; i < modules.length; i++) {
            var text = KeyboardService.assignIcon(modules[i].name.toLowerCase(), languageService);
            rowKeyboard.push({ text: text });

            if (i % 2 == 1) {
                keyboardResult.push(rowKeyboard);
                rowKeyboard = [];
            } else {
                if (i == (modules.length - 1)) keyboardResult.push(rowKeyboard);
            }
        }

        return keyboardResult;
    }

    getBackButton(languageService) {
        return [Markup.button.callback(KeyboardService.assignIcon('back to main menu', languageService), 'mainmenu')];
    }

    static leaveConversation(languageService) {
        return Markup.inlineKeyboard([Markup.button.callback(KeyboardService.assignIcon('leave conversation', languageService), 'leaveconversation')]);
    }

    static goToThisMonthDashboardCalendar(languageService, prefix, userId) {
        return { "label": KeyboardService.assignIcon("Go to This Month", languageService), "action": `${prefix}today-${userId}` };
    }

    static getBackToMainMenuCalendar(languageService) {
        return { "label": KeyboardService.assignIcon("Back to Main Menu", languageService), "action": "mainmenu" };
    }

    static assignIcon(text, languageService) {
        switch (text.toLowerCase()) {
            case 'report':
                return languageService.icons.report;
            case 'dashboard':
                return languageService.icons.dashboard;
            case 'about':
                return languageService.icons.about;
            case 'info':
                return languageService.icons.info;
            case 'disease entry':
                return languageService.icons.diseaseEntry;
            case 'skdr report entry':
                return languageService.icons.skdrReportEntry;
            case 'restart':
                return languageService.icons.restart;
            case 'back':
                return languageService.icons.back;
            case 'back to main menu':
                return languageService.icons.backToMainMenu;
            case 'back to selection':
                return languageService.icons.backToSelection;
            case 'bulletin':
                return languageService.icons.bulletin;
            case 'change language':
                return languageService.icons.changeLanguage;
            case 'share phone number':
                return languageService.icons.sharePhoneNumber;
            case 'check entry':
                return languageService.icons.checkEntry;
            case 'edit entry':
                return languageService.icons.editEntry;
            case 'update entry':
                return languageService.icons.updateEntry;
            case 'delete entry':
                return languageService.icons.deleteEntry;
            case 'save':
                return languageService.icons.save;
            case 'reset':
                return languageService.icons.reset;
            case 'profile':
                return languageService.icons.profile;
            case 'go to this month':
                return languageService.icons.goToThisMonth;
            case 'gpt':
                return languageService.icons.gpt;
            case 'leave conversation':
                return languageService.icons.leaveConversation;
            case 'conversation ended':
                return languageService.icons.conversationEnded;
            case 'national':
                return languageService.icons.national;
            case 'this province':
                return languageService.icons.thisProvince;
            case 'this city':
                return languageService.icons.thisCity;
            case 'this district':
                return languageService.icons.thisDistrict;
            case 'this district':
                return languageService.icons.thisDistrict;
            default:
                return `▶️ ${commonUtil.toTitleCase(text)}`;
        };
    }

    static assignReportName(text, languageService) {
        switch (text.toLowerCase()) {
            case 'top ten diseases in facility':
                return languageService.topTenDiseasesFacility;
            case 'top ten diseases in surrounding':
                return languageService.topTenDiseasesSurrounding;
            case 'skdr recapitulation':
                return languageService.skdrRecapitulation;
            default:
                return text;
        };
    }

    composeVerificationKeyboard(languageService) {
        let keyboard = Markup.keyboard([[{
            text: KeyboardService.assignIcon('share phone number', languageService),
            request_contact: true,
        }, KeyboardService.assignIcon('back', languageService)]])
            .oneTime()
            .resize();

        return keyboard;
    }

    
}