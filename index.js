const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const templatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.static(publicPath))

// hbs.registerPartials(partialPath)

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})

// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async (req, res) => {
    
    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    const data = {
        email: req.body.email,
        password: req.body.password
    }

    const checking = await LogInCollection.findOne({ email: req.body.email })

   try{

    if (checking != null && checking.email === req.body.email && checking.password===req.body.password) {
        res.send("user details already exists")
    }
    else{
        await LogInCollection.insertMany([data])
    }
   }
   catch (e) {
    console.log(e);
    res.send("wrong inputs")
   }

    res.status(201).render("home", {
        naming: req.body.email
    })
})

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ email: req.body.email })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.email}` })
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