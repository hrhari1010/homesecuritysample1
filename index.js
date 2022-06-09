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

// Fire API
app.get('/api/fire',function(req,res){
  let database = firebase.database()
  t=req.query['t']
  s=req.query['s']
  objFI={'Temp':t,'Smoke':s}
  
  database.ref("FireInput").set(objFI, function(error) {
    if (error) {
      // The write failed...
      res.send("Failed with error: " + error)
    } 
    else {
      // The write was successful...
     
    }
})//firebase close
console.log("success in adding Fire Inputs",t,s)
var urlfire = 'https://harir.pythonanywhere.com/api/fire?t='+t+'&s='+s;
//https://harir.pythonanywhere.com/api/fire?t=90&s=30
fetch(urlfire)
.then(res => res.json())
.then(data => {
    let ftyp = data["ftype"]
    objFO={'FireType':ftyp}
    database.ref("FireOutput").set(objFO, function(error) {
    if (error) {
      // The write failed...
      res.send("Failed with error: " + error)
    } else {
      // The write was successful...
      res.send("success in adding fire type")
    } })})
.catch(err => {
   res.send(err);
  });
}); // api close


// Gas API
app.get('/api/gas',function(req,res){
  let database = firebase.database()
  g=req.query['g']
  objGI={'Gas':g}
  
  database.ref("GasInput").set(objGI, function(error) {
    if (error) {
      // The write failed...
      res.send("Failed with error: " + error)
    } 
    else {
      // The write was successful...
     
    }
})//firebase close
console.log("success in adding Gas Inputs",g)
var urlgas = 'https://harir.pythonanywhere.com/api/gas?g='+g;
//https://harir.pythonanywhere.com/api/gas?g=9000
fetch(urlgas)
.then(res => res.json())
.then(data => {
    let gwa = data["gwait"]
    objGO={'GasWaitT':gwa}
    database.ref("GasOutput").set(objGO, function(error) {
    if (error) {
      // The write failed...
      res.send("Failed with error: " + error)
    } else {
      // The write was successful...
      res.send("success in adding fire type")
    } })})
.catch(err => {
   res.send(err);
  });
}); // api close
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})
