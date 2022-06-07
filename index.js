const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('listening and success')
})
app.get('/senddata', (req, res) => {
  res.send('sending data')
})
app.get('/senddata2', (req, res) => {
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://harir.pythonanywhere.com/", requestOptions)
  .then(response => response.text())
  .then(result => res.send(result))
  .catch(error => console.log('error', error));
 })
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})
