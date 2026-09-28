# JokiRuang website

Website statis HTML, CSS, dan JavaScript. Tidak membutuhkan build, database, API key, atau npm install.

## Deploy ke Vercel
1. Ekstrak ZIP, lalu upload seluruh isinya ke root repository GitHub (folder `dist` dan `vercel.json` sejajar).
2. Import repository tersebut di Vercel.
3. Framework Preset: Other. Root Directory: root repository. Build Command: kosong. Output Directory: dist (sudah diatur di vercel.json).
4. Deploy. Halaman paket tersedia di /packages.

Dokumentasi: https://vercel.com/docs/project-configuration/vercel-json

## Edit
- dist/index.html: beranda dan struktur popup.
- dist/packages.html: halaman semua paket.
- dist/style.css: tampilan dan animasi.
- dist/app.js: interaksi, bahasa, dan pesan WhatsApp.
- dist/pricing-data.js: harga, fitur, role, dan add-on.
- dist/intro.js: loading awal.
- dist/assets/: aset lokal.

Nomor WhatsApp ada pada CONTACT_NUMBER di dist/app.js. Pesan dibuat sebagai Unicode lalu di-encode sekali dengan encodeURIComponent. Tombol hanya membuka pesan siap kirim; pengunjung tetap menekan Send di WhatsApp.

## Preview lokal
Jalankan `python -m http.server 8000 --directory dist` lalu buka http://localhost:8000. Untuk preview halaman paket secara lokal gunakan /packages.html.

## Setelah punya domain final
Sesuaikan URL di dist/sitemap.xml dan dist/robots.txt dengan domain Vercel atau domain custom milikmu.

Kode ini tidak memerlukan layanan Sites untuk berjalan. Tidak ada kredensial atau riwayat Git dalam arsip.
