require('./config/config');
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))

app.use(require('./routes/usuario'))
 
mongoose.connect(process.env.urlDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} , (err, res)=>{
  
  if (err) throw err
  
  console.log('connectado');
}); 

app.listen(process.env.PORT,()=>{
  console.log(`puerto ${process.env.PORT}`);
})