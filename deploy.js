const Web3 = require("web3");
const solc = require('solc')
const path = require("path")
const web3 = new Web3("http://127.0.0.1:7545");
const fs = require('fs')


const abi = fs.readFileSync("sc/abi.txt", "utf8");
const bytecode = fs.readFileSync("sc/bytecode.txt", "utf8");

// fs.writeFileSync('sc/abi.json', JSON.stringify(abi, null, 2));
// fs.writeFileSync('sc/bytecode.txt', bytecode);
// Connect to the Ethereum node

// Create a contract instance
const contract = new web3.eth.Contract(JSON.parse(abi));

// Deploy the contract
async function deploy() {
    const accounts = await web3.eth.getAccounts();
    console.log('Deploying from account:', accounts[0]);

    const deployedContract = await contract.deploy({
        data: bytecode
    }).send({
        from: accounts[0],
        gas: 6721975,
        gasPrice: '20000000000'
    });

    console.log('Contract deployed at address:', deployedContract.options.address);

    fs.writeFileSync("sc/address.json", JSON.stringify({
        address:deployedContract.options.address
    }));
}

deploy();
