// Bahasa input saat ini (default: Indonesia)
let currentInputLang = 'id';
let firstOutputLang = 'en';
let secondOutputLang = 'jp';

// Elemen DOM
const inputText = document.getElementById('inputText');
const clearBtn = document.getElementById('clearBtn');
const outputSection = document.getElementById('outputSection');
const firstText = document.getElementById('firstText');
const secondText = document.getElementById('secondText');
const firstWordMeanings = document.getElementById('firstWordMeanings');
const secondWordMeanings = document.getElementById('secondWordMeanings');
const firstTab = document.getElementById('firstTab');
const secondTab = document.getElementById('secondTab');
const firstTranslation = document.getElementById('firstTranslation');
const secondTranslation = document.getElementById('secondTranslation');
const autocompleteDropdown = document.getElementById('autocompleteDropdown');

// Elemen bahasa input
const inputId = document.getElementById('inputId');
const inputEn = document.getElementById('inputEn');
const inputJp = document.getElementById('inputJp');
const inputLangBadge = document.getElementById('inputLangBadge');
const inputLangTitle = document.getElementById('inputLangTitle');

// Elemen judul bahasa output
const firstTabTitle = document.getElementById('firstTabTitle');
const secondTabTitle = document.getElementById('secondTabTitle');
const firstLangBadge = document.getElementById('firstLangBadge');
const firstLangTitle = document.getElementById('firstLangTitle');
const secondLangBadge = document.getElementById('secondLangBadge');
const secondLangTitle = document.getElementById('secondLangTitle');

// Event listeners
inputText.addEventListener('input', handleInput);
clearBtn.addEventListener('click', clearInput);
firstTab.addEventListener('click', () => switchLanguage('first'));
secondTab.addEventListener('click', () => switchLanguage('second'));
inputId.addEventListener('click', () => setInputLanguage('id'));
inputEn.addEventListener('click', () => setInputLanguage('en'));
inputJp.addEventListener('click', () => setInputLanguage('jp'));
inputText.addEventListener('input', showAutocomplete);
inputText.addEventListener('keydown', handleAutocompleteNavigation);

// Variabel autocomplete
let selectedIndex = -1;

// Mengatur bahasa input
function setInputLanguage(lang) {
    currentInputLang = lang;

    inputId.classList.remove('active');
    inputEn.classList.remove('active');
    inputJp.classList.remove('active');

    if (lang === 'id') {
        inputId.classList.add('active');
        inputLangBadge.textContent = 'ID';
        inputLangBadge.className = 'bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-3';
        inputLangTitle.textContent = 'Masukan Bahasa Indonesia';
        inputText.placeholder = 'Ketik kalimat dalam Bahasa Indonesia di sini...';
        firstOutputLang = 'en';
        secondOutputLang = 'jp';
    } else if (lang === 'en') {
        inputEn.classList.add('active');
        inputLangBadge.textContent = 'EN';
        inputLangBadge.className = 'bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-3';
        inputLangTitle.textContent = 'Masukan Bahasa Inggris';
        inputText.placeholder = 'Ketik kalimat dalam Bahasa Inggris di sini...';
        firstOutputLang = 'id';
        secondOutputLang = 'jp';
    } else if (lang === 'jp') {
        inputJp.classList.add('active');
        inputLangBadge.textContent = 'JP';
        inputLangBadge.className = 'bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-3';
        inputLangTitle.textContent = 'Masukan Bahasa Jepang';
        inputText.placeholder = 'Ketik kalimat dalam Bahasa Jepang di sini...';
        firstOutputLang = 'id';
        secondOutputLang = 'en';
    }

    updateOutputLanguageTitles();
    if (inputText.value.trim() !== '') {
        handleInput();
    }
    showAutocomplete();
}

// Memperbarui judul bahasa output
function updateOutputLanguageTitles() {
    if (firstOutputLang === 'en') {
        firstTabTitle.textContent = 'Inggris';
        firstLangBadge.textContent = 'EN';
        firstLangBadge.className = 'bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-3';
        firstLangTitle.textContent = 'Terjemahan ke Bahasa Inggris';
    } else if (firstOutputLang === 'id') {
        firstTabTitle.textContent = 'Indonesia';
        firstLangBadge.textContent = 'ID';
        firstLangBadge.className = 'bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-3';
        firstLangTitle.textContent = 'Terjemahan ke Bahasa Indonesia';
    }

    if (secondOutputLang === 'jp') {
        secondTabTitle.textContent = 'Jepang';
        secondLangBadge.textContent = 'JP';
        secondLangBadge.className = 'bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-3';
        secondLangTitle.textContent = 'Terjemahan ke Bahasa Jepang';
    } else if (secondOutputLang === 'en') {
        secondTabTitle.textContent = 'Inggris';
        secondLangBadge.textContent = 'EN';
        secondLangBadge.className = 'bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-3';
        secondLangTitle.textContent = 'Terjemahan ke Bahasa Inggris';
    }
}

// Menangani teks input
function handleInput() {
    const text = inputText.value.trim().toLowerCase();

    if (text === '') {
        outputSection.classList.add('hidden');
        autocompleteDropdown.style.display = 'none';
        return;
    }

    let translation = null;

    if (currentInputLang === 'id') {
        translation = translations.find(item => item.id && item.id.toLowerCase() === text);
    } else if (currentInputLang === 'en') {
        translation = translations.find(item => item.en && item.en.toLowerCase() === text);
    } else if (currentInputLang === 'jp') {
        translation = translations.find(item =>
            item.jp && (item.jp.toLowerCase() === text || item.jp.split(' ')[0].toLowerCase() === text)
        );
    }

    if (translation) {
        firstText.innerHTML = addWordMeanings(translation[firstOutputLang], translation.wordMeanings[firstOutputLang]);
        secondText.innerHTML = addWordMeanings(translation[secondOutputLang], translation.wordMeanings[secondOutputLang]);
        displayWordMeanings(translation.wordMeanings[currentInputLang], firstWordMeanings, "Masukan");
        displayWordMeanings(translation.wordMeanings[firstOutputLang], firstWordMeanings, "Inggris");
        displayWordMeanings(translation.wordMeanings[secondOutputLang], secondWordMeanings, "Jepang");
        outputSection.classList.remove('hidden');
        firstTranslation.classList.add('fade-in');
        setTimeout(() => firstTranslation.classList.remove('fade-in'), 500);
    } else {
        firstText.textContent = "Terjemahan tidak ditemukan dalam database kami";
        secondText.textContent = currentInputLang === 'id' ?
            "データベースに翻訳が見つかりませんでした" :
            "Translation not found in our database";
        firstWordMeanings.innerHTML = "";
        secondWordMeanings.innerHTML = "";
        outputSection.classList.remove('hidden');
    }
}

// Menampilkan saran autocomplete
function showAutocomplete() {
    const text = inputText.value.trim().toLowerCase();
    autocompleteDropdown.innerHTML = '';
    selectedIndex = -1;

    if (text === '') {
        autocompleteDropdown.style.display = 'none';
        return;
    }

    let suggestions = [];
    if (currentInputLang === 'id') {
        suggestions = translations.filter(item => item.id && item.id.toLowerCase().includes(text)).map(item => item.id);
    } else if (currentInputLang === 'en') {
        suggestions = translations.filter(item => item.en && item.en.toLowerCase().includes(text)).map(item => item.en);
    } else if (currentInputLang === 'jp') {
        suggestions = translations.filter(item => item.jp && item.jp.toLowerCase().includes(text)).map(item => item.jp);
    }

    if (suggestions.length > 0) {
        suggestions.forEach((suggestion, index) => {
            const div = document.createElement('div');
            div.classList.add('autocomplete-item');
            div.textContent = suggestion;
            div.addEventListener('click', () => {
                inputText.value = suggestion;
                autocompleteDropdown.style.display = 'none';
                handleInput();
            });
            autocompleteDropdown.appendChild(div);
        });
        autocompleteDropdown.style.display = 'block';
    } else {
        autocompleteDropdown.style.display = 'none';
    }
}

// Menangani navigasi keyboard untuk autocomplete
function handleAutocompleteNavigation(e) {
    const items = autocompleteDropdown.querySelectorAll('.autocomplete-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        updateAutocompleteSelection(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateAutocompleteSelection(items);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        inputText.value = items[selectedIndex].textContent;
        autocompleteDropdown.style.display = 'none';
        handleInput();
    } else if (e.key === 'Escape') {
        autocompleteDropdown.style.display = 'none';
    }
}

// Memperbarui pemilihan autocomplete
function updateAutocompleteSelection(items) {
    items.forEach((item, index) => {
        item.classList.toggle('active', index === selectedIndex);
        if (index === selectedIndex) item.scrollIntoView({ block: 'nearest' });
    });
}

// Membersihkan input
function clearInput() {
    inputText.value = '';
    outputSection.classList.add('hidden');
    autocompleteDropdown.style.display = 'none';
    inputText.focus();
}

// Beralih antar bahasa
function switchLanguage(lang) {
    if (lang === 'first') {
        firstTab.classList.add('active');
        firstTab.classList.remove('bg-gray-100', 'text-gray-600');
        secondTab.classList.remove('active');
        secondTab.classList.add('bg-gray-100', 'text-gray-600');
        firstTranslation.classList.remove('hidden');
        secondTranslation.classList.add('hidden');
    } else {
        secondTab.classList.add('active');
        secondTab.classList.remove('bg-gray-100', 'text-gray-600');
        firstTab.classList.remove('active');
        firstTab.classList.add('bg-gray-100', 'text-gray-600');
        secondTranslation.classList.remove('hidden');
        firstTranslation.classList.add('hidden');
        secondTranslation.classList.add('fade-in');
        setTimeout(() => secondTranslation.classList.remove('fade-in'), 500);
    }
}

// Menutup autocomplete saat klik di luar
document.addEventListener('click', (e) => {
    if (!inputText.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
        autocompleteDropdown.style.display = 'none';
    }
});