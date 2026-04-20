// assets/js/api.js
// Semua komunikasi dengan backend Express

function getToken() {
  return localStorage.getItem('fb_token') || ''
}

function authHeaders(isFormData = false) {
  const h = { 'Authorization': `Bearer ${getToken()}` }
  if (!isFormData) h['Content-Type'] = 'application/json'
  return h
}

async function handleResponse(res) {
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)
  return data
}

// ─── UPLOAD ───────────────────────────────────────────────────────────────────
export async function apiUploadFile(file, mode = 'replace') {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${API_BASE}/upload/file?mode=${mode}`, {
    method : 'POST',
    headers: authHeaders(true),
    body   : form,
  })
  return handleResponse(res)
}

export async function apiGetRiwayatUpload() {
  const res = await fetch(`${API_BASE}/upload/riwayat`, { headers: authHeaders() })
  return handleResponse(res)
}

export async function apiGetPivot() {
  const res = await fetch(`${API_BASE}/upload/pivot`, { headers: authHeaders() })
  return handleResponse(res)
}

// Hapus satu riwayat upload beserta pivot dan clustering terkait
export async function apiHapusUpload(id, { hapusPivot = true, hapusClustering = true } = {}) {
  const params = new URLSearchParams({
    hapus_pivot     : hapusPivot,
    hapus_clustering: hapusClustering,
  })
  const res = await fetch(`${API_BASE}/upload/riwayat/${id}?${params}`, {
    method : 'DELETE',
    headers: authHeaders(),
  })
  return handleResponse(res)
}

// Reset semua pivot tanpa hapus riwayat
export async function apiResetPivot() {
  const res = await fetch(`${API_BASE}/upload/pivot-semua`, {
    method : 'DELETE',
    headers: authHeaders(),
  })
  return handleResponse(res)
}

// ─── CLUSTERING ───────────────────────────────────────────────────────────────
export async function apiJalankanClustering(centroids = null) {
  const res = await fetch(`${API_BASE}/clustering/jalankan`, {
    method : 'POST',
    headers: authHeaders(),
    body   : JSON.stringify({ centroids_awal: centroids }),
  })
  return handleResponse(res)
}

export async function apiGetHasil() {
  const res = await fetch(`${API_BASE}/clustering/hasil`, { headers: authHeaders() })
  return handleResponse(res)
}

export async function apiGetRiwayatClustering() {
  const res = await fetch(`${API_BASE}/clustering/riwayat`, { headers: authHeaders() })
  return handleResponse(res)
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export async function apiVerifyToken(idToken) {
  const res = await fetch(`${API_BASE}/auth/verify`, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify({ idToken }),
  })
  return handleResponse(res)
}
