const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
// const autoIncrement=require('mongoose-auto-increment');


const dbConfig=require('./configs/db.config');
const serverConfig=require('./configs/server.config');
const Employee=require('./models/employee.model');


app.use(cors());
app.use(bodyParser.json({limit:'10mb'}));

mongoose.connect(dbConfig.DB_URL);
const db=mongoose.connection;

    db.on('error',()=>{
        console.log("#### Error ####")
    });
    
    db.once('open',()=>{
        console.log('Connected')
        init();
    });




async function init()
{
    try
    {
        await Employee.collection.drop();
    }
    catch(err)
    {
        console.log('Error while creating DB',err.message)
    }
}

require('./routes/employee.route')(app);
app.listen(serverConfig.PORT,()=>{
    console.log(`App is listening At PORT:${serverConfig.PORT}`)
})