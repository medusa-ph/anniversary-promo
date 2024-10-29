// Initialize Firebase (replace with your actual Firebase configuration)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};


const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let purchaseCount = 0;
const maxPurchases = 3;

async function submitCode() {
  const codeInput = document.getElementById('code-input').value.trim().toUpperCase();
  console.log(`User entered code: ${codeInput}`);

  try {
    const codeRef = db.collection('purchaseCodes').doc(codeInput);
    const doc = await codeRef.get();

    if (doc.exists && !doc.data().used) {
      console.log('Code is valid and not used. Updating...');
      await codeRef.update({ used: true });

      purchaseCount++;
      updateProgress();
    } else {
      alert('Invalid or already used code.');
    }
  } catch (error) {
    console.error('Error validating code:', error);
    alert('Something went wrong. Please try again later.');
  }

  document.getElementById('code-input').value = '';
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
