const express = require('express')
const { getConnection } = require('./db/conect-mongo');
const cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT;

app.use (cors());

getConnection();

app.use(express.json());

app.use('/auth', require ('./routes/auth'))
app.use('/director', require('./routes/director'))
app.use('/genero', require('./routes/genero'))
app.use('/media', require('./routes/media'))
app.use('/productora', require('./routes/productora'))
app.use('/tipo', require('./routes/tipo'))
app.use('/usuario', require('./routes/usuario'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});