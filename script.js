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
  console.log(`User entered code: ${codeInput}`); // Log user input

  try {
    // Query Firestore to check if the code exists and is valid
    const codeRef = db.collection('purchaseCodes').doc(codeInput);
    const doc = await codeRef.get();
    console.log(`Document exists: ${doc.exists}`); // Log whether the document exists

    if (doc.exists && doc.data().used === false) {
      console.log('Code is valid and not used. Updating...'); // Log success

      // Mark the code as used
      await codeRef.update({ used: true });

      purchaseCount++;
      updateProgress();
    } else {
      console.log('Code is invalid or already used.'); // Log invalid case
      alert('Invalid or already used code. Please try again.');
    }
  } catch (error) {
    console.error('Error validating code:', error); // Log any errors
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
