import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAA7IN8MwI-Xx_QRGlo4P4BzuphAyqq1lw",
    authDomain: "chakravuyu.firebaseapp.com",
    projectId: "chakravuyu",
    storageBucket: "chakravuyu.firebasestorage.app",
    messagingSenderId: "656993935010",
    appId: "1:656993935010:web:1ebf9efd88ad255f9f81fb",
    measurementId: "G-EPKLL65TH1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.getDocs = getDocs;
window.query = query;
window.where = where;
window.onSnapshot = onSnapshot;

// Quick seeder to initialize the mock database if the user attempts to load the login page
window.seedUsersIfEmpty = async () => {
    try {
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);
        if (snapshot.empty) {
            console.log("Seeding initial authentications to Firebase Firestore...");
            await addDoc(usersRef, { id: "student_001", email: "student@university.edu", password: "password123", role: "student", name: "Alex Researcher" });
            await addDoc(usersRef, { id: "prof_001", email: "teacher@university.edu", password: "admin", role: "teacher", name: "Prof. Johnson" });
        }
    } catch (e) {
        console.error("Firebase Auth Error:", e);
    }
};
