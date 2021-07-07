process.env.NODE_ENV ="test"
const request = require('supertest')
const app = require('./app')
const items = require('./fakedb')

let item1 = {"name": 'popsicle', "price": 1.45}
let item2 = {"name":'cheerios', "price": 3.4}

beforeEach(function(){
    items.push(item1, item2)
})
afterEach(function(){
    items.length = 0
})

describe('get /items', function(){
    test('getting all items', async () =>{
        const resp = await request(app).get('/items/')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual([{"name": 'popsicle', "price": 1.45}, {"name":'cheerios', "price": 3.4}])
    })
    
})

describe('post /items', function(){
    test('posting items', async () =>{
        const resp = await request(app).post('/items/')
        expect(resp.statusCode).toBe(201)
    })
})

describe('get /items/:name', () =>{
    test('get by name', async () =>{
        const resp = await request(app).get(`/items/${item1.name}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({"name": 'popsicle', "price": 1.45})
    })

})

describe('patch /items/:name', () =>{
    test('updating items', async () =>{
        const resp =  await request(app).patch(`/items/${item1.name}`).send({name:"poptarts"})
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({"name": 'poptarts'})
    })
})

describe('delete /items/:name', ()=>{
    test('deleteing items', async () =>{
        const resp = await request(app).delete(`/items/${item1.name}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toBe({"msg":'Item deleted'})
    })
})