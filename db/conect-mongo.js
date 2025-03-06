const mongoose = require('mongoose');

const getConnection = async () => {
    try{
        const url = 'mongodb+srv://edwinbotero:fwM6aoFHncqiioWU@ebotero86.hh01w.mongodb.net/Ingenieria-webii?retryWrites=true&w=majority';


        await mongoose.connect(url);
        console.log('conexion exitosa');

    } catch(error){
        console.log(error);

    }
}
    module.exports ={
        getConnection,
    }   


    