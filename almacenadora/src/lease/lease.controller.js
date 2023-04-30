'use strict'
const Account = require('../account/account.model')
const Cellar = require('../cellar/cellar.model')
const Lease = require('./lease.model')

exports.test = (req, res)=>{
    res.send({message: 'Test function is running'});

}

exports.add = async(req, res)=>{
    try{
        let data = req.body
        //verificar si existe los datos
        let existAccount = await Account.findOne({_id: data.account})
        if(!existAccount) return res.status(404).send({message: 'Account not found'})

        //vefificar si la bodega esta disponible 
        let existCellar = await Cellar.findOne({_id: data.cellar})
        if(existCellar.availability === 'not available') return res.status(409).send({message: 'Cellar is already in use'}) 

        //agregar el arrendamiento  
        let lease = new Lease(data)
        await lease.save()
        return res.status(201).send({message: 'Lease saved sucessfully', lease})

    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to create arrendamiento'})
    }
}