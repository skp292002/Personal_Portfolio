const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoConnect = require('./util/database').mongoConnect;
const getDb = require('./util/database').getDb;


const app = express();
app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile('index.html', {root: __dirname});
})
app.get('/readData',(req,res)=>{
    const db = getDb();
    db.collection('data')
    .find()
    .toArray((err,result)=>{
        if(err)throw err;
        res.send(result);
    })
})

app.post('/submitData',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    console.log(name+" "+ email+" " + message);
    //Save data in db
    saveToDb(name,email,message)
    res.redirect('/');
})
// app.use((error,req,res)=>{
//   console.log(error);
// })

mongoConnect(() =>{
app.listen(3000,()=>{
  console.log('Server started on localhost , port no:3000')
});
});


const saveToDb = (name,email,msg) =>{
    //Update db as processing
    const db = getDb();
    const doc = {name:name,email:email,msg: msg };
    db.collection('data')
    .insertOne(doc)
    .then(result =>{
        console.log(result);
    })
    .catch(err =>{
      console.log(err);
    });
};