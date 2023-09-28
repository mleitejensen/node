const express = require("express")
const morgan = require("morgan")

const app = express()

// register viev engine
app.set("view engine", "ejs")


// listen for request
app.listen(3000)

// middleware and staticfiles

app.use(express.static("public"))

app.use(morgan("dev"))

app.get("/", (req, res) => {
    //res.send("<p>home page</p>")
    const blogs = [
        {title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur"},
        {title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet consectetur"},
        {title: "How to defeat Bowser", snippet: "Lorem ipsum dolor sit amet consectetur"}
    ]
    res.render("index", { title: "Home", blogs: blogs})
})

app.get("/about", (req, res) => {
    //res.send("<p>about page</p>")
    res.render("about", { title: "About"})
})

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create"})
})

// redirect
//app.get("/about-us", (req, res) => {
//    res.redirect("/about")
//})

// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404"})
})