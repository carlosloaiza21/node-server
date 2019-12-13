// PORT 
process.env.PORT = process.env.PORT || 3000;

// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let DB;

if(process.env.NODE_ENV === 'dev') {
  DB ='mongodb://localhost:27017/cafe'
} else {
  DB = process.env.MONGO_URI
}

process.env.urlDB = DB;