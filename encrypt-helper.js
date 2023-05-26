const readline = require('readline');
const Security = require('./security');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please select \n1. CREATE STRING SECRET KEY AND STRING VECTOR \n2. ENCRYPT \n3. DECRYPT \nYour choice: ',
  (selected) => {
  console.log(selected)
    if(selected.length === 0){
      selected = 1;
    }
    let selectedNumb = parseInt(selected);
    if( Number.isNaN(selectedNumb) || selectedNumb < 1 || selectedNumb > 3){
      console.log('Your selection is invalid');
      rl.close();
      process.exit();
    } else {
      if(selected === '1' ){
        let secret = Security.getKeySecret();
        let vector = Security.getKeyVector();
        let secretString = Security.bufferToString(secret);
        let vectorString = Security.bufferToString(vector);
        console.log(" Secret Key : ",secretString);
        console.log(" Vector Key : ",vectorString);
        rl.close();
        process.exit();
      } else if ( selected === '2' || selected === '3'){
        rl.question('please input your string secret key ', (secretString)=>{
          rl.question('please input your string vector key ', (vectorString)=>{
            if(selected === '3'){
              rl.question('please input your encrypted message ', (encryptedMessage)=>{
                try {
                  let sec = Security.stringToBuffer(secretString);
                  let vec = Security.stringToBuffer(vectorString);
                  let decrypted = Security.decrypt(encryptedMessage,vec,sec);
                  console.log("Your decrypt message : ", decrypted);
                  rl.close();
                  process.exit();
                }catch (e) {
                  console.log("An Error Occured : ", e);
                  rl.close();
                  process.exit();
                }
              })
            } else if ( selected === '2'){
              rl.question('please input your message ', (decryptedMessage)=>{
                try {
                  let sec = Security.stringToBuffer(secretString);
                  let vec = Security.stringToBuffer(vectorString);
                  let decrypted = Security.encrypt(decryptedMessage,vec,sec);
                  console.log("Your encrypted message : ", decrypted);
                  rl.close();
                  process.exit();
                }catch (e) {
                  console.log("An Error Occured : ", e);
                  rl.close();
                  process.exit();
                }
              })
            }
          });
        });
      }
    }

});



