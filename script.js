let purchaseCount = 0;
const maxPurchases = 3;
let usedCodes = []; // Track used codes to prevent reuse

// Example: Pre-generated valid codes (in real life, these will be generated server-side)
const validCodes = ['PURCHASE123', 'PURCHASE456', 'PURCHASE789'];

// Function to handle code submission
function submitCode() {
    const codeInput = document.getElementById('code-input').value.trim();

    if (validCodes.includes(codeInput) && !usedCodes.includes(codeInput)) {
        // Valid and unused code submitted
        purchaseCount++;
        usedCodes.push(codeInput); // Mark code as used
        updateProgress();
    } else {
        alert("Invalid or already used code. Please try again.");
    }

    document.getElementById('code-input').value = ''; // Clear input field
}

// Function to update the progress bar and text
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
