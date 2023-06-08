import admin from "firebase-admin";
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(String(serviceAccount))),
  });
}

const db = admin.firestore();

export { db };
