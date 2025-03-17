// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2raes3hCVilddJAwI7EgsuU3bg5Xt1B8",
  authDomain: "learn-c1d70.firebaseapp.com",
  projectId: "learn-c1d70",
  storageBucket: "learn-c1d70.firebasestorage.app",
  messagingSenderId: "982097709440",
  appId: "1:982097709440:web:53b3fd6aacbd839d621965"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Sign Up Form Submission
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Create user with email and password
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            console.log("User signed up:", user);

            // Save additional user data to Firestore (optional)
            const db = firebase.firestore();
            db.collection("users").doc(user.uid).set({
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                console.log("User data saved to Firestore.");
                alert("Sign-up successful! Redirecting to the home page...");
                window.location.href = "index.html"; // Redirect to home page
            })
            .catch((error) => {
                console.error("Error saving user data:", error);
                alert("Error saving user data. Please try again.");
            });
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Sign-up error:", errorCode, errorMessage);
            alert(`Sign-up failed: ${errorMessage}`);
        });
});

// login in logic

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Logged in successfully!');
            // Redirect to another page or update UI
        })
        .catch((error) => {
            alert(error.message);
        });
});
