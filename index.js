require('dotenv').config();
const express = require('express')
const sgMail = require('@sendgrid/mail')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/send', (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: 'guidocerioni98@gmail.com', // Change to your recipient
    from: 'guido.cerioni@radiumrocket.com', // Change to your verified sender
    subject: req.query.subject,
    text: req.query.text,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  if (req.query.subject) {
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
        res.send('Email sent')

      })
      .catch((error) => {
        console.error(error)
        res.send(error)
      })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})