// const Web3 = require('web3');
// const abi_json = require('../abi.json');
// const abi = abi_json.traceability;
// const rpc = process.env.RPC;
// const web3 = new Web3(new Web3.providers.HttpProvider(rpc));

// // Tambahkan akun menggunakan private key dari .env
// const privateKey = process.env.PRIVATE_KEY; // Mengambil private key dari environment variable
// web3.eth.accounts.wallet.add(privateKey);

// async function getAccounts() {
//     const accounts = web3.eth.accounts.wallet; // Mengambil akun dari wallet yang sudah ditambahkan
//     console.log("Akun yang ditemukan: ", accounts);
//     if (accounts.length === 0) {
//         throw new Error('Tidak ada akun yang ditemukan. Pastikan kamu terhubung ke jaringan Ethereum yang valid dan memiliki akun yang tersedia.');
//     }
//     return accounts;
// }

// async function getNonce(address) {
//     return await web3.eth.getTransactionCount(address, 'pending');
// }

// function convertToTimestamp(dateString) {
//     return Math.floor(new Date(dateString).getTime() / 1000);
// }

// async function addUser(_walletAddress, _roleName, _roleID, _nama, _telepon, _alamat, _foto) {
//     const accounts = await getAccounts();
//     const contract = new web3.eth.Contract(abi.abi, abi.contract_address);

//     const gas = await contract.methods.addUser(_walletAddress, _roleName, _roleID, _nama, _telepon, _alamat, _foto).estimateGas({ from: accounts[0].address });
//     const nonce = await getNonce(accounts[0].address);

//     const receipt = await contract.methods.addUser(_walletAddress, _roleName, _roleID, _nama, _telepon, _alamat, _foto)
//         .send({ from: accounts[0].address, gas, nonce });
//     return receipt;
// }

// async function addTransaksi(_kopiID, _varietas, _kuantitas, _penerima) {
//     const accounts = await getAccounts();
//     const contract = new web3.eth.Contract(abi.abi, abi.contract_address);

//     const gas = await contract.methods.addTransaksi(_kopiID, _varietas, _kuantitas, _penerima).estimateGas({ from: accounts[0].address });
//     const nonce = await getNonce(accounts[0].address);

//     const receipt = await contract.methods.addTransaksi(_kopiID, _varietas, _kuantitas, _penerima)
//         .send({ from: accounts[0].address, gas, nonce });
//     return receipt;
// }

// async function konfirmasiTransaksi(_kopiID) {
//     const accounts = await getAccounts();
//     const contract = new web3.eth.Contract(abi.abi, abi.contract_address);

//     const gas = await contract.methods.konfirmasiTransaksi(_kopiID).estimateGas({ from: accounts[0].address });
//     const nonce = await getNonce(accounts[0].address);

//     const receipt = await contract.methods.konfirmasiTransaksi(_kopiID)
//         .send({ from: accounts[0].address, gas, nonce });
//     return receipt;
// }

// async function addProduk(_kopiID, _varietas, _kuantitas, _tanggalProduksi, _tanggalKadaluarsa, _foto) {
//     const accounts = await getAccounts();
//     const contract = new web3.eth.Contract(abi.abi, abi.contract_address);

//     const produkID = web3.utils.sha3(_kopiID + new Date().getTime().toString());
//     const tanggalProduksiTimestamp = convertToTimestamp(_tanggalProduksi);
//     const tanggalKadaluarsaTimestamp = convertToTimestamp(_tanggalKadaluarsa);

//     const gas = await contract.methods.addProduk(_kopiID, _varietas, _kuantitas, tanggalProduksiTimestamp, tanggalKadaluarsaTimestamp, _foto).estimateGas({ from: accounts[0].address });
//     const nonce = await getNonce(accounts[0].address);

//     const receipt = await contract.methods.addProduk(_kopiID, _varietas, _kuantitas, tanggalProduksiTimestamp, tanggalKadaluarsaTimestamp, _foto)
//         .send({ from: accounts[0].address, gas, nonce });

//     return { produkID, receipt };
// }

// module.exports = {
//     addUser,
//     addTransaksi,
//     konfirmasiTransaksi,
//     addProduk
// };
