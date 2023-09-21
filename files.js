const fs = require("fs")


//read file
fs.readFile("./docs/text.txt", (err, data) => {
    if (err){
        console.log(err)
    }
    console.log(data.toString())
})

console.log("1")

//write file or create files
fs.writeFile("./docs/text.txt", "hello, world", () => {
    console.log("file was written")
})

//make a folder or delete folder
if (!fs.existsSync("./assets")){
    fs.mkdir("./assets", (err) => {
        if (err) {
            console.log(err)
        }
        console.log("folder created")
    })
} else {
    fs.rmdir("./assets", (err) => {
        if (err) {
            console.log(err)
        }
        console.log("folder deleted")
    })
}

//deleting files
if (fs.existsSync("./docs/deleteme.txt")) {
    fs.unlink("./docs/deleteme.txt", (err) => {
        if (err){
            console.log(err)
        }
        console.log("file deleted")
    })
}