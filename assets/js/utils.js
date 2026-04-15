// Utilitas umum yang dipakai di semua halaman

// Tampilkan toast notifikasi
export function toast(pesan, tipe = 'success', durasi = 3000) {
  let container = document.getElementById('toast-container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'toast-container'
    document.body.appendChild(container)
  }
  const el = document.createElement('div')
  el.className = `toast toast-${tipe}`
  el.textContent = pesan
  container.appendChild(el)
  setTimeout(() => el.remove(), durasi)
}

// Format angka ke Rupiah
export function formatRupiah(n) {
  return new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', maximumFractionDigits:0 }).format(n)
}

// Format angka biasa dengan pemisah ribuan
export function formatAngka(n) {
  return new Intl.NumberFormat('id-ID').format(n)
}

// Format tanggal Indonesia
export function formatTanggal(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    weekday:'long', year:'numeric', month:'long', day:'numeric'
  })
}

// Warna badge per kategori
export function warnaKategori(kat) {
  if (kat === 'paling laris') return { bg:'#dcfce7', text:'#166534', border:'#86efac' }
  if (kat === 'cukup laris')  return { bg:'#fef9c3', text:'#854d0e', border:'#fde047' }
  return { bg:'#fee2e2', text:'#991b1b', border:'#fca5a5' }
}

// Warna cluster
export function warnaCluster(cl) {
  const map = { c1:'#0d9488', c2:'#d97706', c3:'#dc2626' }
  return map[cl] || '#6b7280'
}

// Interpretasi silhouette score
export function interpretasiSil(score) {
  if (score >= 0.70) return { label:'Sangat Baik', kelas:'badge-green', icon:'✅' }
  if (score >= 0.50) return { label:'Cukup Baik',  kelas:'badge-blue',  icon:'✅' }
  if (score >= 0.25) return { label:'Lemah',        kelas:'badge-amber', icon:'⚠️' }
  return                   { label:'Buruk',         kelas:'badge-red',   icon:'❌' }
}

// Buat HTML navbar (sama di semua halaman)
export function renderNavbar(halamanAktif) {
  const menu = [
    { href:'dashboard.html', label:'Dashboard',   icon:'⬡' },
    { href:'upload.html',    label:'Upload Data',  icon:'↑' },
    { href:'clustering.html',label:'Clustering',   icon:'◈' },
    { href:'hasil.html',     label:'Hasil & Saran',icon:'◉' },
  ]
  const nama = localStorage.getItem('user_nama') || 'Admin'
  return `
    <nav class="bg-white border-b-2 border-teal-100 sticky top-0 z-50 shadow-sm">
      <div class="max-w-6xl mx-auto px-5 h-14 flex items-center gap-3">
        <a href="dashboard.html" class="flex items-center gap-2 mr-4 no-underline">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-600 to-green-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">AT</div>
          <span class="font-extrabold text-teal-700 text-sm">ClusterToko</span>
        </a>
        <div class="flex gap-1 flex-1 flex-wrap">
          ${menu.map(m => `
            <a href="${m.href}" class="px-3 py-1.5 rounded-lg text-xs font-bold no-underline transition
              ${m.label === halamanAktif
                ? 'bg-teal-100 text-teal-700'
                : 'text-gray-500 hover:bg-teal-50 hover:text-teal-700'}">
              ${m.icon} ${m.label}
            </a>
          `).join('')}
        </div>
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-full bg-gradient-to-br from-teal-600 to-green-600 text-white flex items-center justify-center text-xs font-bold">${nama[0]}</div>
          <span class="text-xs text-gray-500 font-medium hidden sm:block">${nama}</span>
          <button onclick="window._logout()" class="text-xs bg-teal-50 border border-teal-200 text-teal-700 px-3 py-1 rounded-lg font-semibold hover:bg-teal-100 transition">Keluar</button>
        </div>
      </div>
    </nav>
  `
}
