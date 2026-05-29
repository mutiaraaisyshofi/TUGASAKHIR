// TUGAS AKHIR: Inisialisasi Aplikasi Manajemen Buku

// Impor modul readline bawaan Node.js
const readline = require("readline");

// Membuat interface input/output terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Array penyimpanan data buku
let daftarBuku = [];

// Fungsi menambah buku
function tambahBuku(judul, penulis) {

  const buku = {
    id: daftarBuku.length + 1,
    judul: judul,
    penulis: penulis
  };

  daftarBuku.push(buku);

  console.log(`\nBuku "${judul}" berhasil ditambahkan.`);
}

// Fungsi menampilkan semua buku
function tampilkanBuku() {

  console.log("\n===== DAFTAR BUKU =====");

  if (daftarBuku.length === 0) {

    console.log("Belum ada buku dalam daftar.");

  } else {

    daftarBuku.forEach((buku) => {
      console.log(`${buku.id}. ${buku.judul} - ${buku.penulis}`);
    });

  }

  console.log("=======================");
}

// Fungsi mencari buku berdasarkan judul
function cariBuku(judulCari) {

  const hasil = daftarBuku.find(
    (buku) => buku.judul.toLowerCase() === judulCari.toLowerCase()
  );

  console.log("\n===== HASIL PENCARIAN =====");

  if (hasil) {

    console.log(`ID       : ${hasil.id}`);
    console.log(`Judul    : ${hasil.judul}`);
    console.log(`Penulis  : ${hasil.penulis}`);

  } else {

    console.log("Buku tidak ditemukan.");

  }

  console.log("===========================");
}

// Simulasi mengambil data dari server
function ambilDataBuku() {

  return new Promise((resolve) => {

    setTimeout(() => {
      resolve("Data berhasil dimuat dari server.");
    }, 1500);

  });

}

// Fungsi input buku berulang
function inputBuku() {

  rl.question("\nMasukkan judul buku: ", (judul) => {

    // Validasi judul tidak boleh kosong
    if (judul.trim() === "") {

      console.log("Error: Judul buku tidak boleh kosong.");

      return inputBuku();

    }

    rl.question("Masukkan nama penulis: ", (penulis) => {

      tambahBuku(judul, penulis);

      // Tanya apakah ingin tambah buku lagi
      rl.question("\nTambah buku lagi? (y/n): ", (jawaban) => {

        if (jawaban.toLowerCase() === "y") {

          inputBuku();

        } else {

          tampilkanBuku();

          // Pencarian buku
          rl.question("\nCari judul buku: ", (judulCari) => {

            cariBuku(judulCari);

            rl.close();

          });

        }

      });

    });

  });

}

// Fungsi utama
async function main() {

  console.log("===== APLIKASI MANAJEMEN BUKU =====");

  const pesan = await ambilDataBuku();

  console.log(pesan);

  inputBuku();

}

// Menjalankan aplikasi
main();