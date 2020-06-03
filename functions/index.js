const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')

admin.initializeApp();
const db = admin.firestore()
const app = express()

app.get('/:shortened', async (req, res) => {
  const shortened = req.params.shortened
  const doc = await db.collection('urls').doc(shortened).get()
  
  if (doc.exists) {
    console.info(`Redirect from: '${shortened}'`)
    res.redirect(301, `${doc.data().origin}`)
  } else {
    // To Do: Make 404 Page
    console.error(`No such shortened URL: '${shortened}'`)
    res.status(404).send('No such shortened URL :(')
  }
});

const runtimeOpts = {
  timeoutSeconds: 30,
  memory: '128MB',
}

exports.redirect = functions.runWith(runtimeOpts).https.onRequest(app)
