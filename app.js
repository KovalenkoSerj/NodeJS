const express = require('express');
const app = express();
const PORT = 3000



// app.use((req, res, next) => {
//     console.log("i'm in the First page") // always running
//     next()
// })

// app.use((req, res, next) => {
//     res.send('<h1>Second page</h1>')
//     console.log("i'm in the second page")
// })



app.use('/users', (req, res, next) => {
    res.send('<h1>Result page</h1>')
    console.log("i'm in the result page")
})

app.use('/', (req, res, next) => {
    res.send('<h1>Initial page</h1>')
    console.log("i'm in the initial page")
})


app.listen(PORT)