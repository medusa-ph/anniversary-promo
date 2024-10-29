let purchaseCount = 0;
const maxPurchases = 3;
let userId = ""; // To store the user's email-based ID

// Function to generate a unique code based on the user's email
function generateCode() {
    const emailInput = document.getElementById("email-input").value.trim();
    if (!emailInput) {
        alert("Please enter a valid email.");
        return;
    }

    userId = emailInput; // Save the user's email as their ID
    const code = btoa(emailInput + "-secret"); // Basic encoding for simplicity
    alert("Your unique code: " + code);
}

// Function to handle code submission
function submitCode() {
    const codeInput = document.getElementById("code-input").value.trim();
    const expectedCode = btoa(userId + "-secret"); // Generate the expected code

    if (codeInput === expectedCode) {
        if (purchaseCount < maxPurchases) {
            purchaseCount++;
            updateProgress();
        } else {
            alert("You have already completed 3 purchases!");
        }
    } else {
        alert("Invalid code. Please try again.");
    }

    document.getElementById("code-input").value = ''; // Clear input field
}

// Function to update progress bar and text
function updateProgress() {
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const discountMessage = document.getElementById("discount-message");

    const progressPercent = (purchaseCount / maxPurchases) * 100;
    progressBar.style.width = progressPercent + '%';
    progressText.innerText = `Progress: ${purchaseCount} / ${maxPurchases} purchases`;

    if (purchaseCount >= maxPurchases) {
        discountMessage.classList.remove("hidden");
    }
}
