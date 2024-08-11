-- Tabel user
CREATE TABLE user (
    walletAddress VARCHAR(255) PRIMARY KEY,
    roleName VARCHAR(255),
    roleID INT,
    nama VARCHAR(255),
    telepon VARCHAR(255),
    alamat VARCHAR(255),
    foto VARCHAR(255)
);

-- Tabel transaksi
CREATE TABLE transaksi (
    transaksiID INT AUTO_INCREMENT PRIMARY KEY,
    produkID VARCHAR(255),
    varietas VARCHAR(255),
    kuantitas INT,
    pengirim VARCHAR(255),
    penerima VARCHAR(255),
    tanggalTransaksi DATETIME,
    status VARCHAR(50),
    FOREIGN KEY (pengirim) REFERENCES user(walletAddress),
    FOREIGN KEY (penerima) REFERENCES user(walletAddress)
);

-- Tabel produk
CREATE TABLE produk (
    produkID VARCHAR(255) PRIMARY KEY,
    kopiID VARCHAR(255),
    varietas VARCHAR(255),
    kuantitas INT,
    tanggalProduksi DATETIME,
    tanggalKadaluarsa DATETIME,
    foto VARCHAR(255),
    pemilik VARCHAR(255),
    FOREIGN KEY (pemilik) REFERENCES user(walletAddress)
);
