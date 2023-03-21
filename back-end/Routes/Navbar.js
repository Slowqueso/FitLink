import express from 'express'
import navData from '../Models/NavbarSchema.js'
const Router = express.Router()

Router.post('/',(req,res)=>{
    const navbar = req.body;
    console.log(navbar);

    navData.create(navbar, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(navbar);
        }
    })
})

Router.get('/',(req,res)=>{
    navData.find((err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

export default Router;