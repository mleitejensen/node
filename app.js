const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const { result } = require("lodash")
const blogRoutes = require("./routes/blogRoutes")

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

app.use("/blogs", blogRoutes)

// redirect
//app.get("/about-us", (req, res) => {
//    res.redirect("/about")
//})

// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404"})
})