const nforce = require('nforce')
require('dotenv').config()

const org = nforce.createConnection({
  clientId: process.env.CONSUMER_KEY,
  clientSecret: process.env.CONSUMER_SECRET,
  redirectUri: 'https://localhost:3000/oauth/_callback',
  environment: 'production',
  mode: 'multi'
})

const authenticate = (username, password, securityToken) => (
  new Promise( (resolve, reject) => {
    // Authenticate using multi user mode
    org.authenticate({
      username: username,
      password: password,
      securityToken: securityToken
    }, (error, response) => {
      if(!error) {
        resolve(response)
      }
      else {
        reject(error)
      }
    })
  })
)

const query = (queryString, oauth) => (
  new Promise( (resolve, reject) => {
    org.query({
      query: queryString,
      oauth: oauth
    }, (error, response) => {
      if(!error) {
        resolve(response.records)
      }
      else {
        reject(error)
      }
    })
  })
)

const run = async () => {
  try {
    let oauth = await authenticate(
      process.env.SALESFORCE_USERNAME,
      process.env.SALESFORCE_PASSWORD,
      process.env.SALESFORCE_SECURITY_TOKEN)

    // Perform a query
    let records = await query('SELECT Id, Name FROM Account LIMIT 10', oauth)
    console.log(records)
  }
  catch(error) {
    console.error(error)
  }
  
}

run()
