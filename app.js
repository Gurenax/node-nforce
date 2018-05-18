const nforce = require('nforce')
require('dotenv').config()

/**
 *  Initialise connection parameters for Salesforce Connected App
 */
const org = nforce.createConnection({
  clientId: process.env.CONSUMER_KEY,
  clientSecret: process.env.CONSUMER_SECRET,
  redirectUri: 'https://localhost:3000/oauth/_callback',
  environment: 'production',
  mode: 'multi'
})

/**
 * Authenticate to login a user in the org
 * @param {*} username - e.g. john@example.com
 * @param {*} password
 * @param {*} securityToken - Your user's security token.
 *                            This can be reset in the org if needed.
 */
const authenticate = (username, password, securityToken) =>
  new Promise((resolve, reject) => {
    // Authenticate using multi user mode
    org.authenticate(
      {
        username: username,
        password: password,
        securityToken: securityToken
      },
      (error, response) => {
        if (!error) {
          resolve(response)
        } else {
          reject(error)
        }
      }
    )
  })

/**
 * Perform a SOQL Query
 * @param {*} queryString - SOQL query
 * @param {*} oauth - OAuth string received from successful authentication
 */
const query = (queryString, oauth) =>
  new Promise((resolve, reject) => {
    org.query(
      {
        query: queryString,
        oauth: oauth
      },
      (error, response) => {
        if (!error) {
          resolve(response.records)
        } else {
          reject(error)
        }
      }
    )
  })

/**
 * Run the app
 */
const run = async () => {
  try {
    let oauth = await authenticate(
      process.env.SALESFORCE_USERNAME,
      process.env.SALESFORCE_PASSWORD,
      process.env.SALESFORCE_SECURITY_TOKEN
    )

    // Perform a query
    let records = await query('SELECT Id, Name FROM Account LIMIT 10', oauth)
    console.log(records)
  } catch (error) {
    console.error(error)
  }
}
run()
