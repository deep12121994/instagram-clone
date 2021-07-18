const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const {MONGOURI} = require('./key');

require('./models/userModel');
require('./models/postModel');

app.use(express.json());   // for read the json data
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));
 
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',() => {
    console.log('connected to mongo yehh');
})
mongoose.connection.on('error',(err)=>{
    console.log('err connecting',err)
})


app.get('/',(req,res) => {
    res.send('hello')
})

app.listen(PORT, () => {
    console.log('server is running on', PORT);
})