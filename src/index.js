const express = require("express")
const path = require("path")
const app = express()
const LogInCollection = require("./mongo")
const bodyParser = require('body-parser')
const port = 5500
const srcPath = path.join(__dirname, '../src')
console.log(srcPath);

app.use(express.json())
//app.use(express.static(srcPath))
app.use(bodyParser.urlencoded({ extended: false }))


app.set("views", path.join(__dirname))
app.set("view engine", "ejs")

app.get('/signup', (req, res) => {
    res.send(__dirname + "signup.html")
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})



// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup1', async (req, res) => {
    
    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    const data = {
        email: req.body.email,
        password: req.body.pw
    }

    const checking = await LogInCollection.findOne({ email: req.body.email })

   try {

    if (checking != null && checking.email === req.body.email && checking.pw === req.body.pw) {
        res.send("user details already exists")
    }
    else {
        await LogInCollection.insertMany([data])
    }
   }
   catch (e) {
    console.log(e);
    res.send("wrong inputs")
   }

    res.status(201)
})

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ email: req.body.email })

        if (check.pw === req.body.pw) {
            res.status(201).render("home", { naming: `${req.body.pw}+${req.body.email}` })
        }

        else {
            res.send("incorrect password")
        }
    } 
    
    catch (e) {
        res.send("wrong details")
    }
})

app.listen(port, () => {
    console.log('port connected');
})