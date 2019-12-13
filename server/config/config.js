// PORT 
process.env.PORT = process.env.PORT || 3000;

// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let DB;

if(process.env.NODE_ENV === 'dev') {
  DB ='mongodb://localhost:27017/cafe'
} else {
  DB ='mongodb+srv://cloaiza21:ncmaya01052011@cluster0-1labi.mongodb.net/cafe?retryWrites=true&w=majority'
}

process.env.urlDB = DB;