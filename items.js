const express = require('express')
const router = new express.Router()
const items = require('./fakedb')
router.get('/', (req, res) => {
    res.send(items)
})
router.post('/', (req, res) =>{
    console.log(req.body)
    const new_item = {name:req.body.name, price:req.body.price}
    console.log(new_item)
    items.push(new_item)
    res.status(201).json(`${new_item.name} has been added`)
})

router.get('/:name', (req, res) =>{
    const item = items.find(i => i.name === req.params.name)
    res.send(item)
})
router.patch('/:name', (req, res) =>{
    const item = items.find(i => i.name === req.params.name)
    item.name = req.body.name 
    item.price = req.body.price
    res.status(200).json(item)
})

router.delete('/:name', (req, res) =>{
    const item = items.find(i => i.name === req.params.name)
    items.splice(item,1)
    res.json({"msg":'Item deleted'})
})




module.exports = router