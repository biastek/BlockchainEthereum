# ether-ropsten-api

## Features:
- [x] Setup Enviroment.
- [x] ES2015,ES2017.
- [x] getBalance,transferTo,transferFrom/Tokens.
- [x] getBalance,transferEther/Ether.


## Structure's Project:
```bash
.
|--configs
|--public
|--src
   |--routers
   |--models
   |--repositories
   |--services
   |--utilites
|--index.js
```

## Installation
1. Clone the Repo.
2. Go into the folder and hit the npm install command
3. Run the command: npm start

## How to access API with Postman
1. get Balance.
- [getBalance()-POST] http://localhost:3000/api/getBalance/[{"address":"YOUR_ADDRESS"}]

2. create Account
- [createAccount()-GET] http://localhost:3000/api/createAccount

3. Transfer Token
- [transferTo()-POST] http://localhost:3000/api/transferTo/[{"addressto":"YOUR_ADDRESS_TO","value":YOUR_VALUE}]
- [transferFrom-POST] http://localhost:3000/api/transferFrom/[{"addressfrom":"YOUR_ADDRESS_FROM","privatekey":"PRIATE_KEY_OF_ACCOUNT_FROM","addressto":"YOUR_ADDRESS_TO","value":YOUR_VALUE}]

4. Transfer Ether
- [transferEther-POST] http://localhost:3000/api/transferEther/[{"addressfrom":"YOUR_ADDRESS_FROM","privatekey":"PRIATE_KEY_OF_ACCOUNT_FROM","addressto":"YOUR_ADDRESS_TO","value":YOUR_VALUE}]