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
        return res.status(500).send({message: 'Error to create lease'})
    }
}

exports.delete = async(req, res)=>{
    try{    
        let leaseId = req.params.id
        let deletedLease = await Lease.findOneAndDelete({_id: leaseId})
        if(!deletedLease) return res.status(404).send({message: 'Lease not found and not deleted'})
        return res.send({message: 'Lease deleted sucessfuly'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to deleted lease'})
    }
}

exports.get = async(req, res)=>{
    try{
        let leases = await Lease.find()
        return res.send({message: 'Leases found', leases})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to got leases'})
    }
}