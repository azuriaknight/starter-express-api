const axios = require("axios")
const TELE_BOT_KEY = '2123471074:AAGQ6KhF0u8ZzvEiUH4t4Aj8KwVTR7nNYe0';
const TELE_CHANNEL_ID = '@solitudeXzero';
let teleBaseApiUrl = `https://api.telegram.org/bot${TELE_BOT_KEY}/sendMessage?chat_id=${TELE_CHANNEL_ID}&text=`

module.exports = {

  sendMessage: function ({message}) {
    let urlTeleX = `${teleBaseApiUrl}${message}&parse_mode=html&disable_web_page_preview=true`
    axios.get(urlTeleX).then(resp => {
        // console.log(resp.data);
    });
  }
};
