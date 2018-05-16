const nforce = require('nforce')
require('dotenv').config()

const org = nforce.createConnection({
  clientId: process.env.CONSUMER_KEY,
  clientSecret: process.env.CONSUMER_SECRET,
  redirectUri: 'https://localhost:3000/oauth/_callback',
  environment: 'production',
  mode: 'multi'
})

// Authenticate using multi user mode
let oauth;
org.authenticate({
  username: process.env.SALESFORCE_USERNAME,
  password: process.env.SALESFORCE_PASSWORD,
  securityToken: process.env.SALESFORCE_SECURITY_TOKEN
}, (err, resp) => {

  // Check for authentication errors
  if(!err) {
    oauth = resp
    console.log('oauth: '+oauth)

    // Perform a query
    let q = 'SELECT Id, Name FROM Account LIMIT 10'
    org.query({ query: q, oauth: oauth }, (err, resp) => {
      
      if(!err && resp.records) {
        // Output the records
        console.log(resp.records)
      }
    })
  }
  else {
    // Output the error
    console.error('err: '+err)
  }
})