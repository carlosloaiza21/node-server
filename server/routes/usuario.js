const express = require('express')
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');


app.get('/usuario', (req, res) => {
  res.json('get Usuario');
});

app.post('/usuario', (req, res) => {
  let body = req.body
  
  const { nombre, email, password, role } = body;
  
  let usuario = new Usuario({
    nombre,
    email,
    password: bcrypt.hashSync(password, 10),
    role 
  });
  
  usuario.save((error, usuario)=>{
    if(error) {
      return res.status(400).json({
        err: true,
        error
      })
    }
      res.json({
        ok: true,
        usuario
      })
  
  })
});

app.put('/usuario/:id', (req, res) => {
  let id= req.params.id;
  res.json({
    id
  });
});

app.delete('/usuario', (req, res) => {
  res.json('delete Usuario');
});

module.exports = app;
