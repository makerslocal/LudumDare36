'use strict';

let express = require('express'),
    app = express()

app.use('/node_modules', express.static('node_modules'))
app.use('/assets', express.static('assets'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(3000, function () {
    console.log('Listening on port 3000...')
})