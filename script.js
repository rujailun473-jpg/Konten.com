// Fungsi Navigasi Antar Menu
function openTool(toolId) {
    document.getElementById('dashboardHome').style.display = 'none';
    document.querySelectorAll('.tool-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(toolId).classList.add('active');
}

function goHome() {
    document.querySelectorAll('.tool-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('dashboardHome').style.display = 'block';
}

// Logika Hitung Kata & Karakter (Fitur 1)
const textarea = document.getElementById('inputText');
const wordCountDisplay = document.getElementById('wordCount');
const charCountDisplay = document.getElementById('charCount');
const copyBtn = document.getElementById('copyBtn');
const notif = document.getElementById('notif');

if (textarea) {
    textarea.addEventListener('input', function() {
        const text = textarea.value.trim();
        const charCount = text.length;
        const words = text === '' ? [] : text.split(/\s+/);
        const wordCount = words.length;

        wordCountDisplay.textContent = `Kata: ${wordCount}`;
        charCountDisplay.textContent = `Karakter: ${charCount}`;
        notif.textContent = '';
    });
}

if (copyBtn) {
    copyBtn.addEventListener('click', function() {
        if (textarea.value.trim() === '') {
            notif.style.color = '#dc3545';
            notif.textContent = 'Teks masih kosong!';
            return;
        }
        navigator.clipboard.writeText(textarea.value).then(() => {
            notif.style.color = '#28a745';
            notif.textContent = 'Berhasil disalin ke clipboard!';
            setTimeout(() => { notif.textContent = ''; }, 2000);
        });
    });
}

// Fungsi Salin Cepat untuk Hook (Fitur 2)
function copyTextDirect(text) {
    navigator.clipboard.writeText(text).then(() => {
        const hookNotif = document.getElementById('hookNotif');
        hookNotif.textContent = `Tersalin: "${text}"`;
        setTimeout(() => { hookNotif.textContent = ''; }, 2000);
    });
}
// Logika Fitur Generator Hashtag
const generateBtn = document.getElementById('generateBtn');
const hashtagInput = document.getElementById('hashtagInput');
const hashtagOutput = document.getElementById('hashtagOutput');

if (generateBtn) {
    generateBtn.addEventListener('click', function() {
        const text = hashtagInput.value.trim();
        if (text === '') {
            hashtagOutput.textContent = '⚠️ Masukkan topik terlebih dahulu!';
            hashtagOutput.style.color = '#dc3545';
            return;
        }

        // Mengubah teks spasi menjadi hashtag
        const words = text.split(/\s+/);
        let tags = words.map(w => '#' + w.toLowerCase()).join(' ');
        
        // Tambahkan hashtag pendukung otomatis
        tags += ' #fyp #kontenkreator #videoviral';

        // Tampilkan hasil dan otomatis salin ke clipboard
        hashtagOutput.style.color = '#28a745';
        hashtagOutput.textContent = `Berhasil dibuat: ${tags}`;
        
        navigator.clipboard.writeText(tags);
    });
}
// Logika Pencatat Timestamp Klip
const saveClipBtn = document.getElementById('saveClipBtn');
const clipTitleInput = document.getElementById('clipTitle');
const clipStartInput = document.getElementById('clipStart');
const clipEndInput = document.getElementById('clipEnd');
const clipList = document.getElementById('clipList');
const clipNotif = document.getElementById('clipNotif');

let savedClips = [];

if (saveClipBtn) {
    saveClipBtn.addEventListener('click', function() {
        const title = clipTitleInput.value.trim();
        const start = clipStartInput.value.trim();
        const end = clipEndInput.value.trim();

        if (title === '' || start === '' || end === '') {
            clipNotif.style.color = '#dc3545';
            clipNotif.textContent = '⚠️ Harap isi semua kolom!';
            return;
        }

        // Masukkan data ke dalam array
        savedClips.push({ title, start, end });

        // Tampilkan daftar terbaru ke layar
        renderClips();

        // Bersihkan form input
        clipTitleInput.value = '';
        clipStartInput.value = '';
        clipEndInput.value = '';
        clipNotif.style.color = '#28a745';
        clipNotif.textContent = '✅ Klip berhasil dicatat!';
        setTimeout(() => { clipNotif.textContent = ''; }, 2000);
    });
}

function renderClips() {
    if (savedClips.length === 0) {
        clipList.innerHTML = '<p style="font-size: 13px; color: #888; font-style: italic;">Belum ada klip yang dicatat.</p>';
        return;
    }

    clipList.innerHTML = '';
    savedClips.forEach((clip, index) => {
        const card = document.createElement('div');
        card.style.background = '#f8f9fa';
        card.style.padding = '10px';
        card.style.borderRadius = '8px';
        card.style.border = '1px solid #e9ecef';
        card.style.fontSize = '13px';
        
        card.innerHTML = `
            <div style="font-weight: bold; color: #007bff; margin-bottom: 4px;">${index + 1}. ${clip.title}</div>
            <div style="color: #555; display: flex; justify-content: space-between; align-items: center;">
                <span>⏱️ ${clip.start} s.d. ${clip.end}</span>
                <span style="color: #28a745; cursor: pointer; font-weight: bold; padding: 4px 8px; background: #e8f5e9; border-radius: 4px;" onclick="copyClipInfo('${clip.title}', '${clip.start}', '${clip.end}')">Salin</span>
            </div>
        `;
        clipList.appendChild(card);
    });
}

function copyClipInfo(title, start, end) {
    const text = `Klip: ${title} (${start} - ${end})`;
    navigator.clipboard.writeText(text).then(() => {
        clipNotif.style.color = '#28a745';
        clipNotif.textContent = `Tersalin: ${title}`;
        setTimeout(() => { clipNotif.textContent = ''; }, 2000);
    });
}
