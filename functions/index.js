const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
// const cors = require('cors');

admin.initializeApp();
const db = admin.firestore();
const app = express();

// Automatically allow cross-origin requests
// app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

app.get('/:shortened', async (req, res) => {
  const doc = await db.collection('urls').doc(req.params.shortened).get();
  
  if (doc.exists) {
    res.redirect(301, `${doc.data().origin}`);
  } else {
    // To Do: Make 404 Page
    res.status(404).send('No such shortened URL!');
  }
});

// Expose Express API as a single Cloud Function:
exports.redirect = functions.https.onRequest(app);
