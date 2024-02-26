const express = require('express')
const {default : mongoose} = require('mongoose')
const { MONGOURI } = require('./keys')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

app.use(require('./routes/auth'))
app.use(require('./routes/posts'))
app.use(require('./routes/user'))

async function connectToDatabase() {
    try {
        await mongoose.connect(MONGOURI);
        console.log("Database Connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

connectToDatabase();


const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})