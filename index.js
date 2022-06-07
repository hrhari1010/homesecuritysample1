const express = require('express');
const https = require('https');
//const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express()
const port = 3000
//var request = require('request');
//const req=request()

const options = {
    hostname: 'harir.pythonanywhere.com',
    port: 443,
    path: '/',
    method: 'GET'
  }
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
app.get('/senddata', (req, res) => {
     reqq = https.request(options, ress => {
        console.log(`statusCode: ${ress.statusCode}`)
      
        ress.on('data', d => {
            ress.return('data')
        })
      })
      
      reqq.on('error', error => {
        console.error(error)
      })
      
      reqq.end()
    
  })

  app.get('/data', function (req, res) {
    var url = 'https://harir.pythonanywhere.com/api/?temp=30&smoke=44';
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.send((data['temperature']));
    })
    .catch(err => {
        res.send(err);
    });
});
app.get('/name', function (req, res) {
    const name={
        "data": "hello world"
    }
    res.send(name['data'])
});
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})
