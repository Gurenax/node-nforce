# Node nForce

## Getting started
1. Create a `Connected App` in salesforce to get the `Consumer Key` and `Consumer Secret`.
2. Ensure that the Permitted Users setting indicate `All users may self-authorize`.
3. Make sure you also have your salesforce username, password and security token. Reset the security token if you lost it.
4. Provide the info in the .env file
```
CONSUMER_KEY = 
CONSUMER_SECRET = 
SALESFORCE_USERNAME = 
SALESFORCE_PASSWORD = 
SALESFORCE_SECURITY_TOKEN = 
```
5. Run `node app.js`


## About
- The goal of this project is to create a basic implementation of `nforce` using modern javascript while utilising concepts like promises, async/await.


## Reference
- https://github.com/kevinohara80/nforce