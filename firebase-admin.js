const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "artemis-c9b03",
  "private_key_id": "bf027f122deab7390bd7b9f1bd35ab455bb66b70",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCiihS9kfHVByi/\nVuIq9es3LpmXpnACDfdY8d3+Dk8f7vA0KJpzgusbnCNHB2rQINOBvg1M0UN1E5RW\no2Xv+pelYTtxNNVoeoeQAxwceYdj1bI49sZQKEhFouoGTAuc9HDMrsUqTS8SYQg8\nLXMHTsEzgn6+tVLymrcE8p1fkss9sGo28yleIC0Rxz9xWZGIT/igseSKaruT6gHN\nQMYfMFMMXPXOuNEQbvIo22/4IA62xuNq+P5OCQ5+fx95jpQIuB7UScQFwlKwxLK+\nCiUVdDT5rke1QQAuARtHuE+XCxFisilN4LbNboKfOAELmJ4kNP2nuP4AUdnT2Yxw\n23HoSPCFAgMBAAECggEACEelb9S/73yqYDjiU5LsdQasL1P8r7YbbA4CI3+CG1vW\nI6oP2COKq4DkMSmZENojPCA82DVuzMd/DnzLZBKtZ/DQkN9CocxgHH90DqVINtc7\neXhkuM+cguOeLUzxaIDxQBQFGjcNV0/XFg2wpuYlpGSY5UkiXRZxjVB4oNY/ATjn\nH75ofrBRIWxmLgafVHhXxVfqTnurunZZpbS81BpRoCrqavGmnnHDAvmCBZWYvFrr\nc6AnU+pTTrBSSBGjQf4R1mC3YolLf/o1YlL9y0DoV+HcYL3yme5kfuwt3YOwrvhF\nMIlP7H8An8umnT9WFUQyiljsZfv5obEEFQ8/zsU4sQKBgQDNfkyioJl5Kl1/t94f\n8QrHHwKhieAHsuojiNo6KGYVgcA4ERmZB2iunL0/J+4pJ8FA+9IiescmO/FoBkhP\nnTnIwPEay54kOnRApD10NaYxj6rZjA/ZoKeuRFy0LxJ1y7+SA/2r+ae0X5sbrYd+\nJGMoIsaaYyok/C5mpJnI1boIyQKBgQDKfRro9iGczfPh0KezJWyDKGAJ4ejQAruw\nttsjRKX9tJePA6o3wnLZBOOlF9gnvPr9msZ5XIFEZCsbX8284ED3TTyJidZsjZIs\nDM/Jlcq/OOv7+YxMU6+BihyNlrQ7Oj5gyHzAsPgQZsaeD9FNCqYGjbD2FPqluTb+\nOYBvI20D3QKBgQC88BBEQsd5mVNIV+U6lySiukdwAVXjnkQbEfwcFwLtaVQz+L0B\nb8d3LJPwGqWmX3AXcLHfk+XBqMGoNIaN9PCpPYUxbt/jTX+P47LBQ4af8QlUZqw4\nG7ewyhg2b0VY21IzTcoSMkRY2sLBawa2G3yz7W2Pi/e288syAsuG1cPryQKBgDz1\noO5VexUL48ot2O7T63Eo7JDNFBvbVsoCosJhXl+cyKvjfJFA1vaCxE3lecus1xsW\nR34t3TTLuzaIhxW/pY9OD1WQy57ul/zu9ndHwzwCVPkMzbIE16d1/taZcjUKedEF\nSplwLZ4ycsUPGgHJnOYILihHdJYDxoyOnx3WWnF5AoGAEk3UJ+aVbLGCfnDfkXiQ\nVaH+9VlJ89UWq3d0swoHwMcOfO7EUzsl6q/L+ClwWKsJlKZwZQr98RgHhFqaNzoe\nRjk0RGTxPCrDdW2Oh4ELH2QWRmU2tGiES5jPGdRCBlSAzoxryhUaeFQzoGPWEsAQ\nR0bLJYTZbXi7JMIIwVh2Vmw=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-magnw@artemis-c9b03.iam.gserviceaccount.com",
  "client_id": "100016657242428277913",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-magnw%40artemis-c9b03.iam.gserviceaccount.com"
};

let databaseUrl = "https://artemis-c9b03-default-rtdb.asia-southeast1.firebasedatabase.app/";
let adminInstance;

module.exports = class FirebaseAdmin {
  static getAdmin() {
    if (adminInstance) {
      return adminInstance;
    }
    adminInstance = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: databaseUrl
    });

    return adminInstance
  }
};

