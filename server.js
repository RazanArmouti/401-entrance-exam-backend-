const express = require('express');
const cors = require('cors');

require('dotenv').config();
const app= express();
app.use(cors());
app.use(express.json());
const mongoose= require('mongoose');
const PORT= process.env.PORT;
const MONGO_SERVER = process.env.MONGO_SERVER;
const {getAllAPIController, getAllController, createController, updateController, deleteController}= require('./controllers/watch.controller')

mongoose.connect(`${MONGO_SERVER}`,{useNewUrlParser:true, useUnifiedTopology:true});

app.get('/getAllAPI',getAllAPIController);
app.get('/getAll',getAllController);
app.post('/create',createController);
app.put('/update/:id',updateController);
app.delete('/delete/:id',deleteController);

app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`)
});