require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet')
const privateKey = process.env.VUE_APP_PRIVATE_KEY.replace(/\\n/g, '\n')
const privateKeyId = process.env.VUE_APP_PRIVATE_KEY_ID
const credentials = {
  type: 'service_account',
  project_id: 'shai3-nai1',
  private_key_id: privateKeyId,
  private_key: privateKey,
  client_email: 'shai3-nai1@shai3-nai1.iam.gserviceaccount.com',
  client_id: '110542729974001017531',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/shai3-nai1%40shai3-nai1.iam.gserviceaccount.com'
}

/**
 * @param  {String} docID the document ID
 * @param  {String} sheetID the google sheet table ID
 * @param  {String} credentials the credentials path defalt is './credentials.json'
 */
async function getData (docID, sheetID, callback) {
  const result = []
  const doc = new GoogleSpreadsheet(docID)
  await doc.useServiceAccountAuth(credentials)
  await doc.loadInfo()
  const sheet = doc.sheetsById[sheetID]
  const rows = await sheet.getRows()
  let row = {}
  for (row of rows) {
    result.push(row._rawData)
  }
  callback(result)
};

module.exports = {
  getData
}
