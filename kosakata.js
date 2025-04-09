// Data arti kata
const wordMeaningsData = {
    "Selamat pagi": {
        en: { "Good": "Bagus", "Morning": "Pagi" },
        jp: { "おはよう": "Pagi" }
    },
    "Terima kasih banyak": {
        en: { "Thank you": "Terima kasih", "Very": "Sangat", "Much": "Banyak" },
        jp: { "ありがとう": "Terima kasih" }
    },
    "Toilet ada di sebelah mana?": {
        en: { "Where": "Dimana", "Toilet": "Kamar kecil" },
        jp: { "トイレ": "Toilet", "どこ": "Di mana" }
    },
    "Aku tidak paham": {
        en: { "I": "Aku", "Don't": "Tidak", "Understand": "Paham" },
        jp: { "わかる": "Paham" }
    }
};

// Menambahkan arti kata sebagai tooltip
function addWordMeanings(text, meanings) {
    if (!meanings || !text) return text;

    const words = text.split(/([\s,.;?!()]+)/);
    return words.map(word => {
        const cleanWord = word.trim().replace(/[.,;?!()]/g, '');
        if (meanings[cleanWord]) {
            return `<span class="word-meaning">${word}<span class="word-tooltip">${meanings[cleanWord]}</span></span>`;
        }
        return word;
    }).join('');
}

// Menampilkan arti kata dalam daftar
function displayWordMeanings(meanings, container, language) {
    if (!meanings) {
        container.innerHTML = "";
        return;
    }

    let html = `<h3 class="font-semibold text-yellow-700 mb-2">Arti Kata ${language}:</h3><ul class="list-disc pl-5">`;
    for (const [word, meaning] of Object.entries(meanings)) {
        html += `<li class="mb-1"><span class="font-medium">${word}:</span> ${meaning}</li>`;
    }
    html += "</ul>";
    container.innerHTML = html;
}

// Menggabungkan data terjemahan dengan arti kata
translations.forEach(translation => {
    const key = translation.id;
    if (wordMeaningsData[key]) {
        translation.wordMeanings = wordMeaningsData[key];
    }
});