const express = require('express');
const https = require('https');
const fetch = require('node-fetch');
const firebase = require('firebase');
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express()
const port = 3000
app.set('query parser', 'simple');
//var request = require('request');
//const req=request()
var firebaseConfig = {
  apiKey: "AIzaSyDn-o_Acnb54xi1-awdfC7I_xtd3sKTQ7o",
  authDomain: "homesecurity-proto1.firebaseapp.com",
  databaseURL: "https://homesecurity-proto1-default-rtdb.firebaseio.com",
  projectId: "homesecurity-proto1",
  storageBucket: "homesecurity-proto1.appspot.com",
  messagingSenderId: "931404230667",
  appId: "1:931404230667:web:8eec08e5f1c3abd4ed170e"
}
firebase.initializeApp(firebaseConfig)

const options = {
    hostname: 'harir.pythonanywhere.com',
    port: 443,
    path: '/',
    method: 'GET'
  }

  
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
  app.get('/checkreq', function (req, res) {
    res.send(req.query['q'])
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

app.get('/database',function(req,res){
  let database = firebase.database()
  f=req.query['f']
  g=req.query['g']
  obj={'Fire':f,'Gas':g}
  database.ref("Test").set(obj, function(error) {
    if (error) {
      // The write failed...
      res.send("Failed with error: " + error)
    } else {
      // The write was successful...
      res.send("success")
    }
})
});
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})
