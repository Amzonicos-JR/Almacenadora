'use strict'

exports.test = (req, res)=>{
    res.send({message: 'Test function is running'});

}

exports.add = (req, res)=>{
    try{
        let data = req.body
        //verificar si existe los datos
        
        //vefificar si la bodega esta disponible 
        //agregar el total 

    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to create arrendamiento'})
    }
}