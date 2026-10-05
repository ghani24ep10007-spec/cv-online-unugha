# Portofolio Pemrograman Web — Rizqi Ghani Adinata

Portofolio akademik untuk mendokumentasikan latihan dan contoh proyek Program Studi Sistem Informasi, UNUGHA Cilacap.

## Isi

- **15 rekam demonstrasi** dalam `examples/projects.json`, semuanya data fiktif.
- **Laboratorium kode terpisah** untuk Laravel/PHP, JSON, CSS, Java, dan JavaScript.
- Antarmuka interaktif: filter kategori, pratinjau data JSON, pencarian judul, dan salin kode.
- Setiap contoh tersedia sebagai berkas mandiri di `examples/`.

## Menjalankan pratinjau lokal

Karena situs membaca berkas contoh dengan `fetch`, jalankan server statis dari folder proyek:

```sh
python -m http.server 8000
```

Buka `http://localhost:8000`. Tanpa server, tautan unduh tetap tersedia tetapi pratinjau kode lintas berkas tidak dapat dimuat dari `file://`.

## Batas runtime

Cloudflare Pages melayani situs ini sebagai aset statis. Berkas Laravel/PHP dan Java ditampilkan sebagai materi sumber dan keluaran demonstrasi; untuk menjalankannya diperlukan runtime Laravel/PHP atau Java Development Kit (JDK) di lingkungan terpisah. Situs ini tidak mengirimkan atau menyimpan data formulir.

## Cloudflare Pages dan domain

Repo terhubung ke proyek Pages `cv-online-unugha` pada akun Cloudflare ini. Untuk situs statis tanpa proses kompilasi, gunakan build command `exit 0` dan direktori keluaran `.` (folder utama repo). Cloudflare Pages juga mengharuskan `index.html` berada di direktori keluaran.

Untuk domain apex `rizqighaniadinata.my.id`, asosiasikan domain terlebih dahulu melalui **Workers & Pages → cv-online-unugha → Custom domains**. Setelah aktivasi, Cloudflare membuat atau meminta record CNAME Pages yang diperlukan. Periksa record yang sudah ada sebelum menambah atau mengubah record; jangan mengganti MX/TXT email. Dokumentasi: [Cloudflare Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

Domain tersebut harus terhubung ke proyek Pages yang benar di akun yang sama. Berkas `CNAME` hanya metadata untuk host statis lain; ia tidak mengaktifkan domain di Cloudflare Pages.
