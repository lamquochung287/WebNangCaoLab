const express = require('express')
const app = express()
const path = require('path')
const handlebars = require('express-handlebars')
const cookie = require('cookie-parser')
const session = require('express-session')
const { json } = require('express')
const flash = require('express-flash')

const listProduct = [
    {id: 1, name: 'iPhone XS', price: 1999, description: 'Description iPhone XS'},
    {id: 2, name: 'iPhone 12 Pro', price: 1399, description: 'Description iPhone 12 Pro'},
    {id: 3, name: 'Macbook Pro 13" M1', price: 1299, description: 'Description Macbook Pro 13" M1'},
    {id: 4, name: 'Airpod Pro', price: 499, description: 'Description Airpod Pro'}
]

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({secret: 'aaaa'}))
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// function isAuthenticated (req, res, next) {
//     if (req.session.user) next() // if user login
//     else next(res.redirect('/login')) // not login render /login page
// }
const login = (req, res, next)=>{
    if(req.session.user != null)
        next()
    else{
        res.redirect('/login');
    }
}
app.get('/',login,(req, res) => {
        res.status(200)
        res.render('home',{product: listProduct})
    /* else
    res.redirect('/login') */
})


app.get('/add', login,(req, res) => {
    res.status(200)
    return res.render('add')
})

//Home page show list product in table after user login successful


app.get('/login', (req, res) => {
    res.status(200)
    res.render('login')
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    if (email === "admin@gmail.com" && password === "123456") {
        req.session.user = email
        res.status(200)
        return res.redirect("/")
    }
    else {
        res.status(404)
        return res.render("login", {
            error: `<tr class="error-message">
                    <td colspan="2">Email or password incorrect<span></span></td>
                    </tr>`})
                    
                }
            })

app.get('/:id',login, (req, res) => {
    const id = req.params
    const product = listProduct.find((i) => i.id == id.id)
    if(product !== null){
        return res.render('details', {product:product})
    }
})

app.get('/edit/:id',login,(req, res)=>{
    const id = req.params
    const product = listProduct.find((i) => i.id == id.id)
    if(product !== null) {
        return res.render('edit', { product: product})
    }
    
})

app.post('/edit/:id',(req, res)=>{
    const id = req.params
    const {name,price,description} = req.body
    const product = listProduct.find((i) => i.id == id.id)
    if(product !== null) {
        let index = listProduct.findIndex(x => x.id == product.id)
        listProduct[index].name = name
        listProduct[index].price = price
        listProduct[index].description = description
        return res.redirect('/')
    }
    else{
        res.status(404)
        return res.render('/edit/:id',{error:`<tr class="error-message">
        <td colspan="2">Information of product is not valid<span></span></td>
        </tr>`})
    }
    
})


app.post('/add', (req, res) => {
    const newItem = {
        id: parseInt(req.body.id),
        name: req.body.name,
        price: parseInt(req.body.price),
        description: req.body.description
    }
    const product = listProduct.find((i) => i.id === newItem.id)
    if(!product) {
        listProduct.push(newItem)
        res.status(201)
        return res.redirect('/')
    }
    else{
        res.status(404)
        return res.render('add', {error: `<tr class="error-message">
        <td colspan="2">This product is exist in database<span></span></td>
        </tr>`})
    }
})

app.get('/delete/:id',login,(req, res) => {
    const { id } = req.params
    console.log(id)
    index = listProduct.findIndex((i) => i.id === Number(id.id))
    listProduct.splice(index,1)
    res.status(201) 
    return res.redirect('/')
})

app.all('*',(req, res)=>{
    res.status(404).render('404')
})


app.listen(3000)