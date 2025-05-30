require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Server is running of echronBimaScore 090525 1 ...')
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/user', require('./routes/user')(express))
app.use('/company', require('./routes/company')(express))
app.use('/plan', require('./routes/plan')(express))
app.use('/plan/details', require('./routes/planDetails')(express))

app.listen(port)