require('dotenv').config();
const express = require('express')
const sgMail = require('@sendgrid/mail')
const app = express()
const port = 3001

const { Parser } = require('json2csv');


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/csv', (req, res) => {
  const fields = ['id', 'name', 'email', 'year', 'fee'];
  const opts = { fields }
  const myData = [
    {
      id: 1,
      name: "Neeraj",
      email: "neeraj@gmail.com",
      year: 2015,
      fee: 167000,
    },
    {
      id: 2,
      name: "Vikas",
      email: "vikas@gmail.com",
      year: 2013,
      fee: 785462,
    },

    {
      id: 3,
      name: "Rahul",
      email: "rahul@gmail.com",
      year: 2020,
      fee: 784596,
    }
  ];
  try {
    const parser = new Parser(opts);
    const csv = parser.parse(myData);
    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.send(csv)
  } catch (err) {
    console.error(err);
    res.send(err)
  }
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