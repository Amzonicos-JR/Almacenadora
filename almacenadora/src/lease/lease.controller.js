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
        // si esta disponible cambiar la disponibilidad 
        await Cellar.findOneAndUpdate({_id: data.cellar}, {availability: 'not available'})

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

exports.update = async(req, res)=>{
    try{
        let leaseId = req.params.id
        let { cellar } = req.body
        //verificar que los datos existan 
        let existCellar = await Cellar.findOne({_id: cellar})
        if(!existCellar) return res.status(404).send({message: 'Cellar not found'})

        //verificar si es la misma bodega
        let existLease = await Lease.findOne({_id: leaseId}) 
        if(existLease.cellar == cellar) return res.send({message:' Ya tienes asignado la misma bodeba'})

        //verificar si la nueva bodega esta disponible
        if(existCellar.availability === 'not available') return res.status(409).send({message: 'Cellar is already in use'}) 

        // la antigua bodeba se vuelve a habilitar 
        await Cellar.findOneAndUpdate({_id: existLease.cellar},{availability: 'available'})

        // la nueva bodega se desabilita
        await Cellar.findOneAndUpdate({_id: cellar},{availability: 'not available'})
        //actualizar 
        let updatedLease = await Lease.findOneAndUpdate(
            {_id: leaseId},
            {cellar: cellar},
            {new: true}
        )
        if(!updatedLease) return res.send({message: 'Lease not found and not updated'})
        return res.send({message: 'Lease updated', updatedLease})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to updated lease'})
    }
}