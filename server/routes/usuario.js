const express = require('express')
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');


app.get('/usuario', (req, res) => {
  const start = Number(req.query.start) || 0;
  const end = Number(req.query.end) || 5;
  Usuario.find({estado:true}, 'nombre email role estado google img')
          .skip(start)
          .limit(end)
          .exec((err, response)=>{
            
            Usuario.count({estado:true}, (err, conteo)=>{
              res.json({
                response,
                conteo
              })
            })
            
          })
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
  let body = req.body;
  
  body = _.pick(body, 'nombre', 'email', 'role', 'estado');
  
  
  Usuario.findByIdAndUpdate(id, body, {new:true, runValidators: true, context: 'query'}, (err, user)=>{
    if(err) {
      return res.json({
        error: 0,
        err
      })
    }
    res.json({
      user
    })    
  })
});

app.delete('/usuario/:id', (req, res) => {
  const id= req.params.id;
  // Usuario.findByIdAndRemove(id,(err, result)=>{
  Usuario.findByIdAndUpdate(id,{estado:false},{new:true},(err, result)=>{
    
    if(result === null){
      return res.json({
        message: 'usuario no encontrado'
      })
    }
    
    
    res.json({
      result
    });
  })
});

module.exports = app;
