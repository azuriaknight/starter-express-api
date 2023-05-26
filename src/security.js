
const crypto = require("crypto");
const algorithm = 'aes-256-cbc';

const outputEncoding = 'hex';
const inputEncoding = 'utf-8';

class SecurityControl {

  static getKeyVector(){
    return crypto.randomBytes(16);
  }
  static getKeySecret(){
    return crypto.randomBytes(32);
  }

  static encrypt(message, initVector, securityKey) {
    const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
    let encryptedData = cipher.update(message, inputEncoding, outputEncoding);

    encryptedData += cipher.final(outputEncoding);
    return  encryptedData
  }

  static decrypt(encryptedData, initVector, securityKey) {
    const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
    let decryptedData = decipher.update(encryptedData, outputEncoding,inputEncoding);
    decryptedData += decipher.final(inputEncoding);
    return  decryptedData ;
  }

  static stringToBuffer(s){
    return Buffer.from(s, 'hex')
  }

  static bufferToString(buff){
    return buff.toString('hex');
  }
}

module.exports = SecurityControl;
