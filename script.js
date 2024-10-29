let purchaseCount = 0;
const maxPurchases = 3;
let usedCodes = []; // Track used codes to prevent reuse

// Paste the generated codes here
const validCodes = [
    'A1B2C3D4E5',
    'F6G7H8I9J0',
    'K1L2M3N4O5',
    '1CD8863C6E',
    'B1179AB086',
    'A763A466DD',
    '7759173395',
    'C095303328',
    'CE7902DFDF',
    'EEAE8C7BD0',
    'DE200E90BD',
    '46190F14F0',
    '163B10B98F'
];

function submitCode() {
    const codeInput = document.getElementById('code-input').value.trim().toUpperCase();

    if (validCodes.includes(codeInput) && !usedCodes.includes(codeInput)) {
        // Valid and unused code submitted
        purchaseCount++;
        usedCodes.push(codeInput); // Mark code as used
        updateProgress();
    } else {
        alert('Invalid or already used code. Please try again.');
    }

    document.getElementById('code-input').value = ''; // Clear input field
}

function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const discountMessage = document.getElementById('discount-message');

    const progressPercent = (purchaseCount / maxPurchases) * 100;
    progressBar.style.width = progressPercent + '%';
    progressText.innerText = `Progress: ${purchaseCount} / ${maxPurchases} purchases`;

    if (purchaseCount >= maxPurchases) {
        discountMessage.classList.remove('hidden');
    }
}
