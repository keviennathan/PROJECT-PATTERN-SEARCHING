/*
====================================================
 Aplikasi Deteksi Plagiarisme
 Metode : Pattern Searching (Brute Force Algorithm)
 Bahasa : JavaScript
====================================================
*/

/**
 * Fungsi untuk mencari pola (pattern) di dalam teks
 * @param {string} text - teks dokumen
 * @param {string} pattern - pola/kalimat pembanding
 * @returns {array} posisi indeks kemunculan pola
 */
function patternSearch(text, pattern) {
    let positions = [];

    // Samakan huruf (case-insensitive)
    text = text.toLowerCase();
    pattern = pattern.toLowerCase();

    let n = text.length;
    let m = pattern.length;

    // Algoritma Brute Force
    for (let i = 0; i <= n - m; i++) {
        let j;
        for (j = 0; j < m; j++) {
            if (text[i + j] !== pattern[j]) {
                break;
            }
        }
        // Jika seluruh karakter cocok
        if (j === m) {
            positions.push(i);
        }
    }
    return positions;
}

/**
 * Fungsi utama untuk mengecek plagiarisme
 * Dipanggil saat tombol ditekan
 */
function checkPlagiarism() {
    let text = document.getElementById("text").value.trim();
    let pattern = document.getElementById("pattern").value.trim();
    let resultDiv = document.getElementById("result");

    // Validasi input
    if (text === "" || pattern === "") {
        resultDiv.innerHTML = "⚠️ Teks dokumen dan pola tidak boleh kosong.";
        return;
    }

    // Cari pola dalam teks
    let matches = patternSearch(text, pattern);

    // Hitung estimasi kemiripan (sederhana)
    let similarity = ((pattern.length / text.length) * 100).toFixed(2);

    // Tampilkan hasil
    if (matches.length > 0) {
        resultDiv.innerHTML = `
            ⚠️ <b>Terindikasi Plagiarisme</b><br><br>
            Kalimat yang diuji ditemukan dalam dokumen.<br>
            <b>Posisi indeks:</b> ${matches.join(", ")}<br>
            <b>Estimasi tingkat kemiripan:</b> ${similarity}%
        `;
    } else {
        resultDiv.innerHTML = `
            ✅ <b>Tidak Terindikasi Plagiarisme</b><br><br>
            Tidak ditemukan kesamaan teks secara langsung.<br>
            <b>Estimasi tingkat kemiripan:</b> 0%
        `;
    }
}
