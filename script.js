// Firebase configuration (replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let purchaseCount = 0;
const maxPurchases = 3;

async function submitCode() {
  const codeInput = document.getElementById('code-input').value.trim().toUpperCase();

  try {
    // Query the document with the submitted code as its ID
    const codeRef = db.collection('purchaseCodes').doc(codeInput);
    const doc = await codeRef.get();

    if (doc.exists && doc.data().used === false) {
      // If the code is valid and not used, mark it as used
      await codeRef.update({ used: true });

      purchaseCount++;
      updateProgress();
    } else {
      alert('Invalid or already used code. Please try again.');
    }
  } catch (error) {
    console.error('Error validating code:', error);
    alert('Something went wrong. Please try again later.');
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
