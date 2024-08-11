    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "@openzeppelin/contracts/access/Ownable.sol";
    import "hardhat/console.sol";

    contract CoffeeSupplyChain is Ownable {
        struct User {
            address walletAddress;
            string roleName;
            uint256 roleID;
            string nama;
            string telepon;
            string alamat;
            string title;
        }

        enum Status {
            PENDING,
            CONFIRMED
        }

        struct Transaksi {
            string kopiID;
            string varietas;
            uint256 kuantitas;
            address pengirim;
            address penerima;
            uint256 tanggalTransaksi;
            Status status; // Tertunda atau Terkonfirmasi
            string produkID; // Ditambahkan untuk produser dan role setelahnya
            uint256 tanggalPanen; // khusus untuk petani
            bytes32 transaksiID;
        }

        struct Produk {
            string produkID;
            string kopiID;
            uint256 kuantitas;
            uint256 tanggalProduksi;
            uint256 tanggalKadaluarsa;
            address pemilik;
        }

        string[] roles = [
            "PETANI",
            "PENGEPUL",
            "PRODUSER",
            "COFFEE-SHOP",
            "RETAIL"
        ];

        mapping(address => User) public users;
        mapping(string => Transaksi) public transaksi; // Menggunakan kopiID sebagai key
        User[] public allUsers;
        // History transaction by kopiID
        mapping(string => Transaksi[]) public transaction_history; // save history transaction;
        mapping(string => Produk) public produk; // Menggunakan produkID sebagai key
        // string[] public kopiIDs; // Array untuk menyimpan semua kopiID
        mapping(address => Transaksi[]) public user_transaction; //get user's transaction
        // mapping (address => string[]) public transaction_in; // transaction in of user
        // mapping (address => string[]) public transaction_out; // transaction out of user
        mapping(string => string[]) public produkTransaksi; // Mapping produkID ke array transaksi kopiID

        event ProdukDitambahkan(
            string produkID,
            string kopiID,
            string varietas,
            uint256 kuantitas,
            uint256 tanggalProduksi,
            uint256 tanggalKadaluarsa,
            address pemilik
        );
        event TransaksiDitambahkan(
            string kopiID,
            string varietas,
            uint256 kuantitas,
            address pengirim,
            address penerima,
            uint256 tanggalTransaksi,
            string status,
            string produkID,
            uint256 tanggalPanen
        );
        event TransaksiDikonfirmasi(string kopiID, address penerima);
        event UserDitambahkan(
            address walletAddress,
            string roleName,
            uint256 roleID,
            string nama,
            string telepon,
            string alamat
        );
        event AddTransactionChain(
            address fromAddress,
            address toAddress,
            string productId
        );

        constructor() Ownable(msg.sender) {
            users[msg.sender] = User(msg.sender, "ADMIN", 5, "Rina", "Admin app","0812345678","");
        }

        modifier onlyAuthorizedRoles() {
            require(
                users[msg.sender].roleID > 0 && users[msg.sender].roleID <= 5,
                "Peran tidak diizinkan"
            );
            _;
        }

        modifier onlyPenerima(string memory _kopiID) {
            require(
                transaksi[_kopiID].penerima == msg.sender,
                "Hanya penerima yang bisa mengonfirmasi transaksi ini"
            );
            _;
        }

        modifier onlyProduser() {
            require(
                users[msg.sender].roleID == 3,
                "Hanya produser yang bisa menambahkan produk"
            );
            _;
        }

        modifier onlyPetani() {
            require(
                users[msg.sender].roleID == 1,
                "Hanya petani yang bisa menambahkan tanggal panen"
            );
            _;
        }

        function addUser(
            address _walletAddress,
            uint256 _roleID,
            string memory _nama,
            string memory _telepon,
            string memory _alamat,
            string memory _title
        ) public onlyOwner {
            users[_walletAddress] = User(
                _walletAddress,
                roles[_roleID - 1],
                _roleID,
                _nama,
                _telepon,
                _alamat,
                _title
            );
            // Add new users to array
            allUsers.push(users[_walletAddress]);

            emit UserDitambahkan(
                _walletAddress,
                roles[_roleID - 1],
                _roleID,
                _nama,
                _telepon,
                _alamat
            );
        }


        function addTransaksi(
            string memory _kopiID,
            string memory _varietas,
            uint256 _kuantitas,
            address _penerima,
            uint256 _tanggalPanen,
            string memory _productID
        ) public onlyAuthorizedRoles {
            require(bytes(_kopiID).length != 0, "kopiID harus diisi");
            

            uint256 tanggalPanen = 0;
            if (users[msg.sender].roleID == 1) {
                tanggalPanen = _tanggalPanen;
                transaction_history[_kopiID].push(
                    Transaksi(
                        _kopiID,
                        _varietas,
                        _kuantitas,
                        msg.sender,
                        _penerima,
                        block.timestamp,
                        Status.PENDING,
                        _productID,
                        tanggalPanen,
                        keccak256(abi.encodePacked(_varietas, msg.sender, block.timestamp))
                    )
                );
            } 
            if (users[msg.sender].roleID == 3) {
                user_transaction[msg.sender].push(
                Transaksi(
                    _kopiID,
                    _varietas,
                    _kuantitas,
                    msg.sender,
                    _penerima,
                    block.timestamp,
                    Status.PENDING,
                    _productID,
                    tanggalPanen,
                    keccak256(abi.encodePacked(_varietas, msg.sender, block.timestamp))
                )
            );
            } 
            
            
            transaksi[_kopiID] = Transaksi(
                _kopiID,
                _varietas,
                _kuantitas,
                msg.sender,
                _penerima,
                block.timestamp,
                Status.PENDING,
                _productID,
                tanggalPanen,
                keccak256(abi.encodePacked(_varietas, msg.sender, block.timestamp))
            );
            user_transaction[_penerima].push(
                Transaksi(
                    _kopiID,
                    _varietas,
                    _kuantitas,
                    msg.sender,
                    _penerima,
                    block.timestamp,
                    Status.PENDING,
                    _productID,
                    tanggalPanen,
                    keccak256(abi.encodePacked(_varietas, msg.sender, block.timestamp))
                )
            );
            emit TransaksiDitambahkan(
                _kopiID,
                _varietas,
                _kuantitas,
                msg.sender,
                _penerima,
                block.timestamp,
                "Tertunda",
                _productID,
                tanggalPanen
            );
            transaction_history[_kopiID].push(
                Transaksi(
                    _kopiID,
                    _varietas,
                    _kuantitas,
                    msg.sender,
                    _penerima,
                    block.timestamp,
                    Status.PENDING,
                    _productID,
                    tanggalPanen,
                    keccak256(abi.encodePacked(_varietas, msg.sender, block.timestamp))
                )
            );
            // script
            // for (uint256 i = 0; i < user_transaction[msg.sender].length; i++) {
            //     if (
            //         keccak256(
            //             abi.encodePacked(user_transaction[msg.sender][i].kopiID)
            //         ) == keccak256(abi.encodePacked(_kopiID))
            //     ) {
            //         if(users[msg.sender].roleID != 3) {

            //         }
            //         user_transaction[msg.sender][i] = Transaksi(
            //             _kopiID,
            //             _varietas,
            //             _kuantitas,
            //             msg.sender,
            //             _penerima,
            //             block.timestamp,
            //             Status.PENDING,
            //             _productID,
            //             tanggalPanen,
            //             keccak256(abi.encodePacked(_varietas, msg.sender, block.timestamp))
            //         );

            //         return;
            //     }
            // }

            user_transaction[msg.sender].push(
                Transaksi(
                    _kopiID,
                    _varietas,
                    _kuantitas,
                    msg.sender,
                    _penerima,
                    block.timestamp,
                    Status.PENDING,
                    _productID,
                    tanggalPanen,
                    keccak256(abi.encodePacked(_varietas, msg.sender, block.timestamp))
                )
            );

            // transaction_chain[msg.sender].push(TransactionChain(_kopiID, msg.sender, true));
            // transaction_chain[_penerima].push(TransactionChain(_kopiID, _penerima, false));
            // transaction_out[msg.sender].push(_kopiID);
        }

        // function getTransactionChain(address sender)
        //     public
        //     view
        //     returns (TransactionChain[] memory)
        // {
        //     return transaction_chain[sender];
        // }

        function konfirmasiTransaksi(string memory _kopiID)
            public
            onlyPenerima(_kopiID)
        {
            require(
                bytes(transaksi[_kopiID].kopiID).length != 0,
                "Transaksi tidak ditemukan"
            );
            transaksi[_kopiID].status = Status.CONFIRMED;
            Transaksi[] storage _transaction = transaction_history[_kopiID];
            address sender;
            for (uint256 i = 0; i < _transaction.length; i++) {
                if (_transaction[i].penerima == msg.sender) {
                    _transaction[i].status = Status.CONFIRMED;
                    sender = _transaction[i].pengirim;
                } 
            }

            Transaksi[] storage _user_transaction = user_transaction[msg.sender];
            // Transaksi[] storage sender_user_transaction = user_transaction[msg.sender];

            for (uint256 i = 0; i < _user_transaction.length; i++) {
                if (keccak256(abi.encodePacked(_user_transaction[i].kopiID)) == keccak256(abi.encodePacked(_kopiID))) {
                    _user_transaction[i].status = Status.CONFIRMED;
                }
            }

            user_transaction[msg.sender] = _user_transaction;

            transaction_history[_kopiID] = _transaction;

            emit TransaksiDikonfirmasi(_kopiID, msg.sender);
        }

        function getTransactionByWallet(address sender)
            public
            view
            returns (Transaksi[] memory)
        {
            return user_transaction[sender];
        }

        function addProduk(
            string memory _kopiID,
            string memory _varietas,
            uint256 _kuantitas,
            uint256 _tanggalProduksi,
            uint256 _tanggalKadaluarsa,
            string memory _produkID
        ) public onlyProduser {
            require(
                bytes(transaksi[_kopiID].kopiID).length != 0,
                "Transaksi tidak ditemukan"
            );
            // string memory produkID = generateProdukID(_kopiID); // Menghasilkan ProdukID unik
            produk[_produkID] = Produk(
                _produkID,
                _kopiID,
                _kuantitas,
                _tanggalProduksi,
                _tanggalKadaluarsa,
                msg.sender
            );
            // produkTransaksi[produkID].push(_kopiID); // Menyimpan kopiID dalam array produkTransaksi

            emit ProdukDitambahkan(
                _produkID,
                _kopiID,
                _varietas,
                _kuantitas,
                _tanggalProduksi,
                _tanggalKadaluarsa,
                msg.sender
            );
        }

        function getUserDetail(address walletAddress) public view returns (User memory) {
            require(
                users[walletAddress].walletAddress != address(0),
                "User tidak ditemukan"
            );
            return users[walletAddress];
        }

        function getUsers() public view returns (User[] memory) {
            // require(
            //     users[walletAddress].walletAddress != address(0),
            //     "User tidak ditemukan"
            // );
            return allUsers;
        }

        function getHistoryTransaksi(string memory _kopiID)
            public
            view
            returns (Transaksi[] memory)
        {
            require(
                bytes(transaksi[_kopiID].kopiID).length != 0,
                "Transaksi tidak ditemukan"
            );
            return transaction_history[_kopiID];
        }

        function getProduk(string memory _produkID)
            public
            view
            returns (Produk memory)
        {
            require(
                bytes(produk[_produkID].produkID).length != 0,
                "Produk tidak ditemukan"
            );
            return produk[_produkID];
        }

        // function traceProduk(string memory _produkID) public view returns (
        //     string memory kopiID,
        //     string memory varietas,
        //     uint kuantitas,
        //     uint tanggalProduksi,
        //     uint tanggalKadaluarsa,
        //     address pemilik,
        //     uint tanggalPanen,
        //     Status status,
        //     address[] memory perjalananAktor
        // ) {
        //     Produk memory prod = getProduk(_produkID);
        //     Transaksi memory trans = getTransaksi(prod.kopiID);

        //     address[] memory perjalananAktorTemp = new address[](5); // Maksimal 5 aktor dalam rantai pasok
        //     perjalananAktorTemp[0] = trans.pengirim; // Petani
        //     perjalananAktorTemp[1] = trans.penerima; // Pengepul

        //     // Mendapatkan transaksi dari pengepul ke produser
        //     Transaksi memory transPengepul = getTransaksiBySenderAndKopiID(trans.penerima, prod.kopiID);
        //     perjalananAktorTemp[2] = transPengepul.penerima; // Produser

        //     // Mendapatkan transaksi dari produser ke coffee shop/retail
        //     Transaksi memory transProduser = getTransaksiBySenderAndKopiID(transPengepul.penerima, prod.kopiID);
        //     perjalananAktorTemp[3] = transProduser.penerima; // Coffee Shop/Retail

        //     // Mendapatkan transaksi dari coffee shop/retail ke admin
        //     Transaksi memory transRetail = getTransaksiBySenderAndKopiID(transProduser.penerima, prod.kopiID);
        //     perjalananAktorTemp[4] = transRetail.penerima; // Admin

        //     return (
        //         prod.kopiID,
        //         trans.varietas,
        //         prod.kuantitas,
        //         prod.tanggalProduksi,
        //         prod.tanggalKadaluarsa,
        //         prod.pemilik,
        //         trans.tanggalPanen,
        //         trans.status,
        //         perjalananAktorTemp
        //     );
        // }

        // function getTransaksiBySenderAndKopiID(address sender, string memory kopiID)
        //     internal
        //     view
        //     returns (Transaksi memory)
        // {
        //     for (uint256 i = 0; i < kopiIDs.length; i++) {
        //         string memory key = kopiIDs[i];
        //         if (
        //             transaksi[key].pengirim == sender &&
        //             keccak256(abi.encodePacked(transaksi[key].kopiID)) ==
        //             keccak256(abi.encodePacked(kopiID))
        //         ) {
        //             return transaksi[key];
        //         }
        //     }
        //     revert("Transaksi tidak ditemukan");
        // }

        // function uint2str(uint256 _i) internal pure returns (string memory) {
        //     if (_i == 0) {
        //         return "0";
        //     }
        //     uint256 j = _i;
        //     uint256 len;
        //     while (j != 0) {
        //         len++;
        //         j /= 10;
        //     }
        //     bytes memory bstr = new bytes(len);
        //     uint256 k = len;
        //     while (_i != 0) {
        //         k = k - 1;
        //         uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
        //         bytes1 b1 = bytes1(temp);
        //         bstr[k] = b1;
        //         _i /= 10;
        //     }
        //     return string(bstr);
        // }
    }
