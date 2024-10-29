const maxPurchases = 3; // Total purchases required
let purchaseCount = 0;
let userId = 'user123'; // Simulate unique user ID (can come from login system)

// Example valid purchase codes (in real scenarios, these would come from your backend)
const validCodes = ['MEDUSA1030-001', 'MEDUSA1030-002', 'MEDUSA1030-003', 'MEDUSA1030-004', 'MEDUSA1030-005', 'MEDUSA1030-006', 'MEDUSA1030-007', 'MEDUSA1030-008', 'MEDUSA1030-009', 'MEDUSA1030-0010'];

// Load user progress from localStorage
window.onload = function () {
    const savedData = JSON.parse(localStorage.getItem(userId)) || { count: 0 };
    purchaseCount = savedData.count;
    updateProgress();
};

// Function to handle code submission
function submitCode() {
    const codeInput = document.getElementById('code-input').value.trim();

    if (validCodes.includes(codeInput)) {
        if (purchaseCount < maxPurchases) {
            purchaseCount++;
            validCodes.splice(validCodes.indexOf(codeInput), 1); // Invalidate code after use
            saveProgress();
            updateProgress();
        }
    } else {
        alert('Invalid or already used code. Please try again.');
    }

    document.getElementById('code-input').value = ''; // Clear input field
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem(userId, JSON.stringify({ count: purchaseCount }));
}

// Update progress bar and text
function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const discountMessage = document.getElementById('discount-message');
    const progressPercent = (purchaseCount / maxPurchases) * 100;

    progressBar.style.width = progressPercent + '%';
    progressText.innerText = `Progress: ${purchaseCount} / ${maxPurchases} purchases`;

    if (purchaseCount >= maxPurchases) {
        discountMessage.classList.remove('hidden');
        document.getElementById('submit-button').disabled = true;
    }
}
