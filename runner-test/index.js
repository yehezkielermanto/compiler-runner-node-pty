const express = require('express');
const pty = require('node-pty');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const webExpress = require('express-ws')(app);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const port = 8080

let commands = ""
let filePaths = ""

app.get('/', (req,res) => {
   res.status(200).send(`server in port ${port} is now working 💪`)
})

app.use(function (req, res, next) {
   // console.log('middleware');
   // assign value from request body
   req.command = commands;
   req.filePath = filePaths;
   return next();
 });

app.post('/execute', (req,res) => {
    try {        
      //get value from request body
        commands = req.body.commands
        filePaths = req.body.filePath
        console.log('ini dari params', commands, filePaths)
         res.status(200).send('OK...')
    } catch (error) {
       console.log(error)
       
    }
});

app.ws('/', function(ws, req){
   // console.log('socket', req.testing)
  // Code to handle incoming messages and send responses to client
//   console.log('ini dari websocket', req.command, req.filePath)
  
  const term = pty.spawn(req.command, [req.filePath], {
     name: 'xterm-color',
     cols: 80,
     rows: 24,
     cwd: process.env.HOME,
     env: process.env
   });
   
   term.onData((data)=>{
      ws.send(data);
   })
   ws.on('message', function(msg){
      // Send data from client to pty
      term.write(msg);
      console.log('ini data dari pesan...', msg)
   });
    
   ws.on('close', function() {
      term.kill();
      console.log('connection closed')
   }); 
});


 app.listen(port, () => {
    console.log(`Server is now working....  and listening in port ${port}`)
 });

 