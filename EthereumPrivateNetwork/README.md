# EthereumPrivateNetwork.

## Prereqs-ubuntu.
1. apt-get update
2. apt-get upgrade
3. clone the repository 
4. ./prereqs-ubuntu.sh

## Setup Geth.
1. sudo apt-get install software-properties-common
2. sudo add-apt-repository -y ppa:ethereum/ethereum
3. sudo apt-get update
4. sudo apt-get install ethereum

## Start Network.
1. Create new account: geth --datadir=./EthereumPrivateNetwork/ account new
2. Replace "account address" in genesis.json
3. Init data: geth --datadir=./EthereumPrivateNetwork/ init ./EthereumPrivateNetwork/genesis.json
4. Run command geth: geth --identity "process-node"  --datadir=./EthereumPrivateNetwork/ --mine --minerthreads=1 --rpc --rpcaddr "0.0.0.0" --rpcport 8545 --rpcapi="db,eth,net,web3,personal" --rpccorsdomain "*"

## Mist Wallet.
1. Download https://github.com/ethereum/mist/releases/tag/v0.10.0
2. Extract zip file.
3. ./mist  --rpc ~/EthereumPrivateNetwork/geth.ipc
4. if(.deb file) sudo dpkg -i --force-all Mist-Wallet-linux32-0-8-7.deb

## Deploy Smartcontract and transfer Token.
1. copy SmartContract Template at https://ethereum.org/token
2. deploy SmartContract.
3. transfer Token.

## Setup eth-explorer:
1. git clone https://github.com/carsenk/explorer
2. cd explorer/
3. npm install
4. npm install -g bower
5. bower install
6. npm start

## Setup eth-netstats:
1. git clone https://github.com/cubedro/eth-netstats
2. cd eth-netstats
3. npm install
4. npm install -g grunt-cli
5. grunt
6. WS_SECRET=my_secret npm start

## Setup eth-net-intelligence-api:
1. git clone https://github.com/cubedro/eth-net-intelligence-api
2. cd eth-net-intelligence-api
3. npm install
4. sudo -S npm install -g pm2
5. Change value app.json with parameter: "name" : "process-node",
"INSTANCE_NAME" : "name", "WS_SERVER" : "http://localhost:3000",
"WS_SECRET" : "my_secret",
6. pm2 start app.json

