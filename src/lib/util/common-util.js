const moment = require('moment');
const fs = require('fs');

class CommonUtil {
  static secondsToMidnight() {
    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    return 86400 - (3600 * hours + 60 * minutes + seconds);
  }
  static async prepareLanguage(userId) {
    const LanguageService = require('../../service/language-service');
    let selectedLang = ''
    const cachePath = `${__basedir}/cache/language.json`;
    let cachesFile = fs.readFileSync(cachePath, {encoding:'utf8'})
    let langCaches = JSON.parse(cachesFile)
    var defaultLanguage = global.CONFIGURATION.botConfig.defaultLanguage;

    var cache = langCaches.filter(x => x.userId == `${userId}`);
    if (cache.length > 0) {
      selectedLang = cache[0].language;
    }
    else {
      langCaches.push({userId: `${userId}`, language: defaultLanguage})
      selectedLang = defaultLanguage
      await fs.promises.writeFile(`${cachePath}`, JSON.stringify(langCaches))
    }

    return new LanguageService(selectedLang);
  }

  static async formatDisease(diseases) {
    const RestService = require('../../service/rest-service');
    const restService = new RestService();
    var allDiseases = (await restService.getDiseases()).data;
    var existing = [];
    var type = 'code';
    var newDiseases = [];

    if (diseases[0].code !== undefined) {
      if (diseases[0].disease_code) {
        for (var i = 0; i < diseases.length; i++) {
          var disease = {};
          disease.code = diseases[i].disease_code;
          disease.total = diseases[i].count;
          newDiseases.push(disease);
        }
      }
      else if (diseases[0].code) {
        for (var i = 0; i < diseases.length; i++) {
          var disease = {};
          disease.code = diseases[i].code;
          disease.total = diseases[i].total;
          newDiseases.push(disease);
        }
      }
      else {
        var keys = Object.keys(diseases);

        for (var i = 0; i < keys.length; i++) {
          var subkeys = Object.keys(diseases[keys[i]])[0];
          var disease = {};
          disease.code = subkeys;
          disease.total = diseases[keys[i]][subkeys];
          newDiseases.push(disease);
        }
      }

      diseases = newDiseases;
    }
    else if (diseases[0].sms_code !== undefined) {
      var newDiseases = [];
      type = 'smsCode';

      for (var i = 0; i < diseases.length; i++) {
        var disease = {};
        disease.code = diseases[i].sms_code;
        disease.total = diseases[i].count;
        newDiseases.push(disease);
      }

      diseases = newDiseases;
    }
    else {
      var keys = Object.keys(diseases);

      for (var i = 0; i < keys.length; i++) {
        var subkeys = Object.keys(diseases[keys[i]])[0];
        var disease = {};
        disease.code = subkeys;
        disease.total = diseases[keys[i]][subkeys];
        newDiseases.push(disease);
      }

      diseases = newDiseases;
    }

    for (var i = 0; i < diseases.length; i++) {
      for (var j = 0; j < allDiseases.length; j++) {
        if ((type == 'code' && allDiseases[j].code == diseases[i].code) || (type == 'smsCode' && allDiseases[j].sms_code == diseases[i].code)) {
          var diseaseObject = {};
          diseaseObject.code = allDiseases[j].code;
          diseaseObject.disease = allDiseases[j].disease;
          diseaseObject.smsCode = allDiseases[j].sms_code;
          diseaseObject.total = diseases[i].total;
          existing.push(diseaseObject);
          break;
        }
      }
    }

    return existing;
  }
  static getNameFrom(ctx) {
    let objResult = {};
    objResult.firstName = ctx.update.callback_query ? ctx.update.callback_query.from.first_name : ctx.from.first_name;
    objResult.lastName = ctx.update.callback_query ? ctx.update.callback_query.from.last_name : ctx.from.last_name;
    objResult.from = ctx.update.callback_query ? ctx.update.callback_query.from.id : ctx.from.id;
    objResult.chat = ctx.update.callback_query ? ctx.update.callback_query.message.chat.id : ctx.chat.id;

    if (objResult.lastName) {
      objResult.firstName += ` ${objResult.lastName}`;
    }

    return objResult;
  }

  static async formatIcd10Disease(diseases) {
    const RestService = require('../../service/rest-service');
    const restService = new RestService();
    var allDiseases = (await restService.getIcdDiseases()).data;
    var existing = [];

    if (!diseases[0].code) {
      if (diseases[0].disease_code) {
        for (var i = 0; i < diseases.length; i++) {
          for (var j = 0; j < allDiseases.length; j++) {
            for (var k = 0; k < allDiseases[j].diseases.length; k++) {
              if (allDiseases[j].diseases[k].code == diseases[i].disease_code) {
                var diseaseObject = {};
                diseaseObject.groupCode = allDiseases[j].groupCode;
                diseaseObject.group = allDiseases[j].group;
                diseaseObject.code = allDiseases[j].diseases[k].code;
                diseaseObject.disease = allDiseases[j].diseases[k].disease;
                diseaseObject.total = diseases[i].count;
                existing.push(diseaseObject);
              }
            }
          }
        }
      }
      else {
        var newDiseases = [];
        var keys = Object.keys(diseases);

        for (var i = 0; i < keys.length; i++) {
          var subkeys = Object.keys(diseases[keys[i]])[0];
          var disease = {};
          disease.code = subkeys;
          disease.total = diseases[keys[i]][subkeys];
          newDiseases.push(disease);
        }

        for (var i = 0; i < newDiseases.length; i++) {
          for (var j = 0; j < allDiseases.length; j++) {
            for (var k = 0; k < allDiseases[j].diseases.length; k++) {
              if (allDiseases[j].diseases[k].code == newDiseases[i].code) {
                var diseaseObject = {};
                diseaseObject.groupCode = allDiseases[j].groupCode;
                diseaseObject.group = allDiseases[j].group;
                diseaseObject.code = allDiseases[j].diseases[k].code;
                diseaseObject.disease = allDiseases[j].diseases[k].disease;
                diseaseObject.total = newDiseases[i].total;
                existing.push(diseaseObject);
              }
            }
          }
        }
      }
    }
    else {
      for (var i = 0; i < diseases.length; i++) {
        for (var j = 0; j < allDiseases.length; j++) {
          if (allDiseases[j].groupCode == diseases[i].code) {
            for (var k = 0; k < allDiseases[j].diseases.length; k++) {
              if (allDiseases[j].diseases[k].code == diseases[i].icd) {
                var diseaseObject = {};
                diseaseObject.groupCode = allDiseases[j].groupCode;
                diseaseObject.group = allDiseases[j].group;
                diseaseObject.code = allDiseases[j].diseases[k].code;
                diseaseObject.disease = allDiseases[j].diseases[k].disease;
                diseaseObject.total = diseases[i].total;
                existing.push(diseaseObject);
              }
            }
          }
        }
      }
    }

    return existing;
  }

  static formDate(languageService, date, format) {
    var dateObj = this.getDateFromString(date, format);
    var month = languageService.monthNames[dateObj.getMonth()];

    return `${dateObj.getDate()}-${month}-${dateObj.getFullYear()}`;
  }

  static formCityCode(provinceCode, cityCode) {
    return cityCode.includes('.') ? cityCode : `${provinceCode}.${cityCode}`;
  }

  static formDistrictCode(provinceCode, cityCode, districtCode) {
    var formCityCode = this.formCityCode(provinceCode, cityCode);
    return districtCode.includes('.') ? districtCode : `${formCityCode}.${districtCode}`;
  }

  static formFacilityCode(provinceCode, cityCode, districtCode, facilityCode) {
    var formDistrictCode = this.formDistrictCode(provinceCode, cityCode, districtCode);
    return facilityCode.includes('.') ? facilityCode : `${formDistrictCode}.${facilityCode}`;
  }

  static getWelcomeMessage(ctx, name, languageService) {
    return languageService.welcomeMessage.replace('__name__', name).replace('__botName__', ctx.botInfo.first_name);
  }

  static removeBotName(ctx, text, isIcd) {
    const me = ctx.botInfo.username;
    if (isIcd) return text.replace(`@${me} `, '').replace('CheckICDTransaction', 'IDE').trim();

    return text.replace(`@${me} `, '').replace('CheckTransaction', 'DCDE').trim();
  }

  static isEmpty(variable) {
    if (variable == null || variable === '') {
      return true;
    }
    if (variable instanceof Object) {
      return Object.keys(variable).length == 0;
    }
    return false;
  }

  static toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  static generateSHA512(keyword) {
    const crypto = require('crypto');

    return crypto.createHash('sha512')
      .update(keyword, 'utf-8')
      .digest('hex');
  }

  static getCompositeUidKey(uuid) {
    if (!uuid || uuid.length === 0) {
      return '';
    }
    let idLength = uuid.split("-")[0].length + 1;
    return uuid.substr(idLength, uuid.length);
  }

  static getCompositeIdKey(uuid) {
    if (!uuid || uuid.length === 0) {
      return '';
    }
    return uuid.split("-")[0];
  }

  static generateUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = '0123456789abcdef';
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substring(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substring((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';

    return s.join('');
  }

  static capitalizeAtPositions(string, indexes) {
    (indexes || []).forEach(function (index) {
      if (string.length < index) return;

      string = string.slice(0, index) +
        string.charAt(index).toUpperCase() + string.slice(index + 1);
    });
    return string;
  }

  static generateDummyVerificationCode() {
    var text = "";
    var possible = "KLMNOPQRSABCDEF456789GVWXYZHIJTU0123";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    let result = this.capitalizeAtPositions(text, [0, 1, 3, 5])
    return result;
  }


  static setReportGroupMenuOptions(userId, languageService, reports, chatId, isCallbackButton, prefix) {
    var options =
    {
      userId: userId,
      languageService: languageService,
      reports: reports,
      prefix: '',
      chatId: chatId,
      isCallbackButton: isCallbackButton
    };

    if (prefix) options.prefix = prefix;

    return options;
  }

  static setRegionMenuOptions(userId, languageService, roleRegion, chatId, prefix, orgCode) {
    var options =
    {
      userId: userId,
      languageService: languageService,
      roleRegion: roleRegion,
      orgCode: orgCode,
      provinceCode: null,
      cityCode: null,
      districtCode: null,
      prefix: '',
      chatId: chatId
    };

    if (prefix) options.prefix = prefix;

    var regs = orgCode.split('.');

    if (roleRegion === 'DISTRICT' || roleRegion === 'CITY' || roleRegion === 'PROVINCE') {
      options.provinceCode = regs[0];
    }

    if (roleRegion === 'DISTRICT' || roleRegion === 'CITY') {
      options.cityCode = regs[1];
    }

    if (roleRegion === 'DISTRICT') {
      options.districtCode = regs[2];
    }

    return options;
  }

  static setIcd10MenuOptions(userId, languageService, diseases, chatId, showSaveButton, isCallbackButton, prefix) {
    var options =
    {
      userId: userId,
      languageService: languageService,
      diseases: diseases,
      prefix: '',
      chatId: chatId,
      showSaveButton: showSaveButton,
      isCallbackButton: isCallbackButton
    };

    if (prefix) options.prefix = prefix;

    return options;
  }

  static setWeekOptions(languageService, instancePrefix, weeks, userId, startWeek, startYear, prefix, suffix) {
    var options =
    {
      weeks: [],
      languageService: languageService,
      instancePrefix: instancePrefix,
      userId: userId,
      startWeek: startWeek,
      startYear: startYear,
      prefix: '',
      suffix: '',
      minWeek: 0,
      maxWeek: 0,
      minYear: 0,
      maxYear: 0,
      // years: []
    };

    weeks = weeks.sort(this.dynamicSortMultiple('year', 'week'));
    options.minWeek = weeks[0].week;
    options.minYear = weeks[0].year;

    options.maxWeek = weeks[weeks.length - 1].week;
    options.maxYear = weeks[weeks.length - 1].year;

    if (!startYear) {
      options.startYear = options.minYear;
    }

    if (!startWeek) {
      options.startWeek = options.minWeek;
    }

    var currentYear = 0;
    var yearObj = {};

    for (var i = 0; i < weeks.length; i++) {
      if (currentYear != weeks[i].year) {
        if (currentYear != 0) options.weeks.push(yearObj);

        currentYear = weeks[i].year;
        yearObj = {};
        yearObj.year = weeks[i].year;
        yearObj.weeks = [];
      }

      yearObj.weeks.push(weeks[i].week);

      if (i == weeks.length - 1) {
        options.weeks.push(yearObj);
      }
    }

    if (prefix) options.prefix = prefix;
    if (suffix) options.suffix = suffix;

    return options;
  }

  static async sleep(duration) {
    return await new Promise(r => setTimeout(r, duration));
  }

  static getDateDiff(startDate, endDate) {
    let a = moment(startDate);
    let b = moment(endDate);
    a.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    b.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    let duration = moment.duration(b.diff(a));
    return duration.asDays();
  }

  static getCurrentWeekNumber() {
    var currentDate = new Date();
    var startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

    return Math.ceil(days / 7);
  }

  static onlyCapitalLetters(str) {
    return str.replace(/[^A-Z]+/g, "");
  }

  static toYyyymmdd(date) {
    let mm = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();

    return [
      date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd,
    ].join('-');
  }

  /**
   * Check if myDate is in same year and month as testDate
   * @param {*Date} myDate input date
   * @param {*Date} testDate test date
   * @returns bool
   */
  static isSameMonth(myDate, testDate) {
    if (!myDate) return false;

    testDate = testDate || new Date();
    try {
      return (
        myDate.getFullYear() === testDate.getFullYear() &&
        myDate.getMonth() === testDate.getMonth()
      );
    } catch (error) {
      myDate = new Date(myDate);

      return (
        myDate.getFullYear() === testDate.getFullYear() &&
        myDate.getMonth() === testDate.getMonth()
      );
    }

  }

  /**
   * Check if myDate is in same date as testDate
   * @param {*Date} myDate input date
   * @param {*Date} testDate test date
   * @returns bool
   */
  static isSameDate(myDate, testDate) {
    if (!myDate) return false;

    testDate = testDate || new Date();

    return (
      myDate.getFullYear() === testDate.getFullYear() &&
      myDate.getMonth() === testDate.getMonth() &&
      myDate.getDate() === testDate.getDate()
    );
  }

  /**
   * This uses unicode to draw strikethrough on text
   * @param {*String} text text to modify
   */
  static strikethroughText(text) {
    return text.trim().split('').reduce(function (acc, char) {
      return acc + char + '\u0336';
    }, '');
  }

  static getDateText(text, date) {
    if (date.getDay() === 0) {
      text = `♦️${text}`;
    }

    if (this.isSameDate(date)) {
      text = `📌${text}`;
    }

    return text;
  }

  static randomStr(len) {
    var ans = '';
    var arr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (var i = len; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }

    return ans;
  }

  static getMemberOfDate(startDate, endDate, languageService) {
    let dates = [];
    const weekday = languageService.dayNames;
    for (const m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
      dates.push(
        {
          dayName: weekday[m.isoWeekday()],
          date: m.format('YYYY-MM-DD')
        }
      )
    }
    return dates;
  }

  static getMemberOfDays(startDate, endDate) {
    let days = [];
    const weekday = languageService.dayNames;
    for (const m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
      days.push(weekday[m.isoWeekday()])
    }
    return days;
  }

  static getDateFormat(date, format = 'DD MMM YYYY') {
    return moment(date).format(format)
  }

  static getDateFromString(str, format) {
    return moment(str, format).toDate();
  }

  static addDaysToDateFormat(date, addition, format = 'DD-MMM-YYYY') {
    if (addition > 0)
      return moment(date).add(addition, 'd').format(format);
    else
      return moment(date).subtract(-1 * addition, 'd').format(format);
  }

  static addDaysToDate(date, addition) {
    if (addition > 0)
      return moment(date).add(addition, 'd').toDate();
    else
      return moment(date).subtract(addition, 'd').toDate();
  }

  static getTimeFormat(time, format = 'HH:mm') {
    return moment(time, 'HHmmss').format(format);
  }

  static async validateDate(date, format = 'DD MMM YYYY') {
    const isValid = await moment(date, format).isValid();
    return isValid;
  }

  static timestampToDate(timestamp, format = 'DD MMM YYYY') {
    return moment.unix(timestamp).format(format)
  }

  // static toCamelCase(objs, isPascalCase = false){
  //   return camelcaseKeys(objs, {deep: true, pascalCase: isPascalCase})
  // }

  static async groupArrayBy(arrayValue, groupingKey) {
    const groupBy = key => array =>
      array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      }, {});

    const groupByBrand = groupBy(groupingKey);
    return await groupByBrand(arrayValue)
  }

  static dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  static dynamicSortMultiple() {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
      var i = 0, result = 0, numberOfProperties = props.length;
      /* try getting a different result from 0 (equal)
       * as long as we have extra properties to compare
       */
      while (result === 0 && i < numberOfProperties) {
        result = CommonUtil.dynamicSort(props[i])(obj1, obj2);
        i++;
      }
      return result;
    }
  }

  static getStringAfterDelimiterLastOccurence(text, delimiter) {
    const lastIndex = text.lastIndexOf(delimiter);

    return text.slice(lastIndex + 1);
  }

  static generateNewPassword() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i <= 8; i++) {
      var char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    return pass;
  }

  static generateVerificationCode() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  static addHours(numOfHours, date = new Date()) {
    let newDate = moment().add(numOfHours, 'hours')

    return newDate;
  }

  static isPositiveInteger(str) {
    if (typeof str !== 'string') {
      return false;
    }

    const num = Number(str);

    if (Number.isInteger(num) && num > 0) {
      return true;
    }

    return false;
  }
}

module.exports = CommonUtil;