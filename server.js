const express = require('express')
const cookieParser = require('cookie-parser')
const bugService = require('./services/bug.service.js')


const app = express()
const COOKIE_AGE = 1000 * 7
const IS_PREMIUM = false

// App configuration
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())


//List
app.get('/api/bug', (req, res) => {
    const filterBy = req.query
    bugService.query(filterBy).then((bugs) => {
        res.send(bugs)
    })
})

//Update
app.put('/api/bug/:bugId', (req, res) => {
    const bug = req.body
    bugService.save(bug).then((savedBug) => {
        res.send(savedBug)
    })
})

//Create
app.post('/api/bug', (req, res) => {
    const bug = req.body
    bugService.save(bug).then((savedBug) => {
        res.send(savedBug)
    })
})

//Read - GetById
app.get('/api/bug/:bugId', (req, res) => {
    const { bug: bugId } = req.params
    bugService.get(bugId)
        .then((bug) => {
            res.send(bug)
        })
        .catch(err => {
            res.status(418).send(err.message)
        })
})

//Remove
app.delete('/api/bug/:bugId', (req, res) => {
    const { bugId: bugId } = req.params
    bugService.remove(bugId).then(() => {
        res.send({ msg: 'Bug removed successfully', bugId: bugId })
    })
})

// Listen will always be the last line in our server!
app.listen(3030, () => console.log('Server ready at port 3030!'))