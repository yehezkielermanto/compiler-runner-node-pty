const {runCode} = require('./run-code')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {removeCode} = require('./file-system/removeCode')
const { spawn } = require('child_process')

const app = express()
const port = 3000

const filePathCode = './codes'
const filePathOutput = './outputs'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const sendResponse = (res, StatusCode, body) => {
    const timeStamp = Date.now()

    res.status(StatusCode).send({
        timeStamp,
        status: StatusCode,
        ...body
    })
}

// app get to view that server is currently working
app.get('/', async(req, res) => {
    res.status(200).send('3...2...1... "Server is now working !!"....🚀')
})

// post data from client to server
app.post('/', async(req, res) => {
    try {
        const output = await runCode(req.body.language, req.body.code)
        sendResponse(res, 200, output)
    } catch (err) {
        sendResponse(res, err?.status || 500, err)
    }
})

// app.get('/run', async(req,res) => {
//     try {
        

//         res.status(200).send("OK")

//     } catch (error) {
//         console.log(error)
//     }
// })

// remove code and output
app.get('/remove', async(req, res) => {
    try {
        await removeCode(filePathCode)
        await removeCode(filePathOutput)
        sendResponse(res, 200)
    } catch (error) {
        sendResponse(res, error?.status || 500, error)
    }
})

// app is listening....
app.listen(port, function(){
    console.log(`Server is running in port ${port} 🔥️`)
    // spawning child process (node in node) 🤯️
        const child = spawn("node", ['index.js'], {
            // file path for child process
            cwd: '../runner-test'
        })


        child.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
          
        child.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
          
        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

        // process.on('SIGQUIT', function(){
        //     child.kill();
        // })
})