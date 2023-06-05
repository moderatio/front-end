
/* eslint-disable */
/**
 * This is just the definition of the security rule we are using.
 * Authentication is done via wallet signatures and we validate
 * the signatures on the server side of Nextjs.
 *
 */

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read;
    }

    // Allow write access to any collection and document based on a custom rule
    match /{collection}/{document} {
      allow write: if customCondition();
    }

    function customCondition() {
      return request.auth.uid == 'your-server-uid'; // Allow write access unconditionally it matches uid
    }
  }
}
