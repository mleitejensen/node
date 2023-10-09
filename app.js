const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const Blog = require("./models/blog")
const { result } = require("lodash")

const app = express()


const dbURI = "mongodb+srv://netninja:Passord1@node.phrgrjy.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=AtlasApp"
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))


// register viev engine
app.set("view engine", "ejs")


// listen for request
//app.listen(3000)

// middleware and staticfiles

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true}))
app.use(morgan("dev"))




app.get("/", (req, res) => {
    res.redirect("/blogs")    
})

app.get("/about", (req, res) => {
    //res.send("<p>about page</p>")
    res.render("about", { title: "About"})
})

app.get("/blogs", (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render("index", { title: "All Blogs", blogs: result })
        }) 
        .catch((err) => {
            console.log(err)
        })
}) 

app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect("/blogs")
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get("/blogs/:id", (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render("details", { blog: result, title: "Blog details"})
        })
        .catch(err => {
            console.log(err)
        })
})

app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: "/blogs" })
        })
        .catch(err => {
            console.log(err)
        })
})

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create"})
        .then(result => console.log(result))
        .catch((err) => {
            console.log(err)
        })
})

// redirect
//app.get("/about-us", (req, res) => {
//    res.redirect("/about")
//})

// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404"})
})