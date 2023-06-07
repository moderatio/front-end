import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.stringify(serviceAccount)),
  });
}

const db = admin.firestore();

export { db };
