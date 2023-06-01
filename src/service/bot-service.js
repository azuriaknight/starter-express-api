const commonUtil = require('../lib/util/common-util');
const KeyboardService = require('../service/keyboard-service');
const keyboardService = new KeyboardService();
var bot = require('../bot');

module.exports = class BotService {

    async restart(ctx, languageService, mainMenu) {

        if (mainMenu) {
            await commonUtil.sleep(5000);
        }

        var nameFrom = commonUtil.getNameFrom(ctx);
        let pesan = '';
        pesan = `${commonUtil.getWelcomeMessage(ctx, nameFrom.firstName, languageService)}${languageService.chooseMenu}`;

        let modules= [
            {
                name: 'About', code: 'ABOUT', desc: 'About Bot'
            },
            {
                name: 'Help', code: 'HELP', desc: 'Help Menu'
            }
        ]
        var keyboard = keyboardService.composeUserKeyboardFromModules(modules, languageService);
        bot.telegram.sendMessage(nameFrom.chat, pesan, keyboardService.composeOptKeyboard(null, keyboard));

        // await redisService.deleteGPTCache(nameFrom.from);

        // let pesan = '';
        // let userInfo = await this.getUserInfoStatus(ctx, nameFrom.from, nameFrom.chat, nameFrom.firstName, languageService);

        // if (userInfo.success) {
        //     if (userInfo.data.is_verified == 1) {
        //         let modules = await restService.getUserModules(nameFrom.from);

        //         if (modules.success) {
        //             var keyboard = keyboardService.composeUserKeyboardFromModules(modules.data.modules, languageService);

        //             if (mainMenu) {
        //                 pesan = languageService.chooseMenu;
        //             }
        //             else {
        //                 pesan = `${commonUtil.getWelcomeMessage(ctx, nameFrom.firstName, languageService)}${languageService.chooseMenu}`;
        //             }

        //             bot.telegram.sendMessage(nameFrom.chat, pesan, keyboardService.composeOptKeyboard(null, keyboard));
        //         } else {
        //             if (modules.message === 'BOT_SERVICE_ERROR') {
        //                 pesan = `${commonUtil.getWelcomeMessage(ctx, nameFrom.firstName, languageService)}${languageService.inactiveBot}`;
        //                 bot.telegram.sendMessage(nameFrom.chat, pesan, keyboardService.composeOnlyHelpKeyboard(languageService));
        //             } else {
        //                 pesan = `${commonUtil.getWelcomeMessage(ctx, nameFrom.firstName, languageService)}${languageService.verifyFirst}`;
        //                 let verificationKeyboard = keyboardService.composeVerificationKeyboard(languageService)
        //                 bot.telegram.sendMessage(nameFrom.chat, pesan, verificationKeyboard);
        //             }
        //         }
        //     } else {
        //         pesan = `${commonUtil.getWelcomeMessage(ctx, nameFrom.firstName, languageService)}${languageService.verifyFirst}`;
        //         let verificationKeyboard = keyboardService.composeVerificationKeyboard(languageService)
        //         bot.telegram.sendMessage(nameFrom.chat, pesan, verificationKeyboard);
        //     }
        // }
    }
    
    async about(ctx, languageService) {
        // let pesan = '🤖';

        // bot.telegram.sendMessage(ctx.chat.id, pesan, options);
        // pesan = languageService.aboutText.replace('__botName__', global.CONFIGURATION.botConfig.name);
        // var options = {
        //     reply_markup: JSON.stringify({
        //         inline_keyboard: [
        //             [{ text: languageService.myPhoto, callback_data: 'BOT~PHOTO' }, { text: languageService.myProfile, callback_data: 'BOT~PROFILE' }, { text: languageService.myWebsite, url: "https://synchro.co.id/" }]
        //         ],
        //         resize_keyboard: true
        //     }),
        //     parse_mode: 'HTML'
        // };

        // bot.telegram.sendMessage(ctx.chat.id, pesan, options);

        // console.log('call about method')
        let pesan = languageService.aboutText.replace('__botName__', global.CONFIGURATION.botConfig.name);
        var options = {
            parse_mode: 'HTML'
        };
        bot.telegram.sendMessage(ctx.chat.id, pesan, options);
        // await this.restart(ctx, languageService, true);
    }

    // async report(ctx, languageService) {
    //     await redisService.deleteGPTCache(ctx.from.id);
    //     var validation = await this.validateMenu(ctx, 'Report', languageService);

    //     if (validation.success) {
    //         let pesan = languageService.chooseReport;
    //         let modules = await restService.getUserModules(ctx.from.id);
    //         let subMenu = this.getSubMenu(modules.data.modules, 'Report');
    //         let keyboard = keyboardService.composeUserKeyboardFromSubModules(subMenu[0].children, languageService);
    //         bot.telegram.sendMessage(ctx.chat.id, pesan, keyboard);
    //     }
    // }

    // async changeLanguage(ctx, languageService) {
    //     await redisService.deleteGPTCache(ctx.from.id);
    //     var validation = await this.validateMenu(ctx, 'Change Language', languageService);

    //     if (validation.success) {
    //         await keyboardService.composeLanguageKeyboard(ctx, languageService);
    //     }
    // }

    // async analytics(ctx, languageService) {
    //     await redisService.deleteGPTCache(ctx.from.id);
    //     var validation = await this.validateMenu(ctx, 'Dashboard', languageService);

    //     if (validation.success) {
    //         var userInfo = await this.getUserInfoStatus(ctx, ctx.from.id, ctx.chat.id, ctx.from.first_name, languageService);

    //         if (userInfo.success) {
    //             if (userInfo.data.user_role_data_level === 'NATION' || userInfo.data.user_role_data_level === 'PROVINCE' || userInfo.data.user_role_data_level === 'CITY' || userInfo.data.user_role_data_level === 'DISTRICT' || userInfo.data.user_role_data_level === 'ORGANIZATION') {

    //                 redisService.deleteCalendarTypeCache(ctx.from.id, 'df-');
    //                 redisService.deleteCalendarTypeCache(ctx.from.id, 'dt-');

    //                 var pesan = `${languageService.dateFrom}: `;
    //                 var minDate = new Date();
    //                 minDate.setDate(minDate.getDate() - 730);
    //                 var message = 'DB:DateRange.';
    //                 var options = CalendarUtil.setCalendarOptions(languageService, 'df-', ctx.from.id, true, minDate, new Date(), message, '-');
    //                 const FromCalendar = require('../lib/util/dashboard-from-calendar');
    //                 const fromcalendar = new FromCalendar(bot, languageService, ctx.from.id, options);
    //                 fromcalendar.setDateListener(() => { });
    //                 bot.telegram.sendMessage(ctx.chat.id, pesan, fromcalendar.getCalendar(new Date()));
    //                 // keyboardService.composeDashboardDateKeyboard(ctx, languageService);
    //             }
    //             else {
    //                 pesan = languageService.noPrivilege;
    //                 bot.telegram.sendMessage(ctx.chat.id, pesan, keyboardService.composeOnlyHelpKeyboard(languageService));
    //             }
    //         }
    //     }
    // }

    // async profile(ctx, languageService) {
    //     await redisService.deleteGPTCache(ctx.from.id);
    //     var validation = await this.validateMenu(ctx, 'Profile', languageService);

    //     if (validation.success) {
    //         var userInfo = await restService.getUserInfo(ctx.from.id);

    //         if (userInfo.success) {
    //             var pesan = languageService.profile.replace('__name__', userInfo.data.user_full_name).replace('__role__', userInfo.data.role_name).replace('__organization__', userInfo.data.user_organization_name);
    //             var options = {
    //                 parse_mode: 'HTML'
    //             };
    //             bot.telegram.sendMessage(ctx.chat.id, pesan, options);
    //             await this.restart(ctx, languageService, true);
    //         }
    //     }
    // }
};