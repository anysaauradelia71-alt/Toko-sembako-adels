// Array penampung data belanjaan
let keranjang = [];
let totalHarga = 0;

function tambahKeKeranjang(namaProduk, harga) {
    // Cari tahu apakah item sudah pernah ditambah sebelumnya
    let itemAda = keranjang.find(item => item.nama === namaProduk);

    if (itemAda) {
        itemAda.jumlah += 1;
    } else {
        keranjang.push({ nama: namaProduk, harga: harga, jumlah: 1 });
    }

    totalHarga += harga;
    renderKeranjang();
}

function kosongkanKeranjang() {
    keranjang = [];
    totalHarga = 0;
    renderKeranjang();
}

function renderKeranjang() {
    const daftarKeranjang = document.getElementById('daftar-keranjang');
    const totalHargaElement = document.getElementById('total-harga');
    const badgeKeranjang = document.getElementById('badge-keranjang');

    // Kosongkan ul list
    daftarKeranjang.innerHTML = '';

    if (keranjang.length === 0) {
        daftarKeranjang.innerHTML = `
            <li id="keranjang-kosong-msg" class="text-center py-8 text-slate-400 italic">
                <i class="fa-solid fa-face-frown text-2xl mb-2 block text-slate-300"></i> Keranjang belanja masih kosong
            </li>`;
        badgeKeranjang.classList.remove('scale-100');
        badgeKeranjang.classList.add('scale-0');
    } else {
        // Hitung total kuantitas barang
        let totalBarang = 0;

        keranjang.forEach(item => {
            totalBarang += item.jumlah;
            const li = document.createElement('li');
            li.className = "py-3 flex justify-between items-center text-sm";
            li.innerHTML = `
                <div>
                    <span class="font-semibold text-slate-800">${item.nama}</span>
                    <span class="text-xs text-slate-400 block">${item.jumlah}x @ Rp ${item.harga.toLocaleString('id-ID')}</span>
                </div>
                <span class="font-bold text-slate-900">Rp ${(item.harga * item.jumlah).toLocaleString('id-ID')}</span>
            `;
            daftarKeranjang.appendChild(li);
        });

        // Update Badge Keranjang di Navbar
        badgeKeranjang.innerText = totalBarang;
        badgeKeranjang.classList.remove('scale-0');
        badgeKeranjang.classList.add('scale-100');
    }

    // Ubah text total harga rupiah
    totalHargaElement.innerText = totalHarga.toLocaleString('id-ID');
}

function checkoutWhatsApp() {
    if (keranjang.length === 0) {
        alert('Keranjang belanja Anda masih kosong. Yuk pilih sembakonya dulu!');
        return;
    }

    // Memformulasikan teks rapi untuk dikirim ke WhatsApp toko
    let pesan = `Halo *Kedai Sembako Adels*, saya ingin memesan kebutuhan pokok berikut:\n\n`;
    
    keranjang.forEach((item, index) => {
        pesan += `_#${index + 1}_  *${item.nama}* (${item.jumlah}x) -> Rp ${(item.harga * item.jumlah).toLocaleString('id-ID')}\n`;
    });

    pesan += `\n=========================\n`;
    pesan += `*Total Pembayaran: Rp ${totalHarga.toLocaleString('id-ID')}*\n`;
    pesan += `=========================\n\n`;
    pesan += `Mohon info kesediaan stok dan total ongkirnya ya. Terima kasih!`;

    // Silakan ganti nomor di bawah ini dengan nomor WA toko kamu (gunakan format internasional diawali 62)
    const nomorTujuan = "628123456789"; 
    const linkWhatsApp = `https://wa.me/${nomorTujuan}?text=${encodeURIComponent(pesan)}`;

    // Mengalihkan user ke aplikasi WhatsApp di tab baru
    window.open(linkWhatsApp, '_blank');
}