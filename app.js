const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const upload = multer({dest: __dirname + '/public/images'});
const cors = require('cors')
var fs = require("fs");
var rl = require('readline');
const { exec } = require("child_process");

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: "50gb" }));
app.use(express.static('public'));

app.use(cors(corsOptions))
var Cloudant = require('@cloudant/cloudant');

// Initialize the library with my account.
var cloudant = Cloudant({
    "apikey": "DYIN2SYOVTKMEju5Hd5OWfDfMghQPdSknUqnzMMyWsUO",
    "host": "907c4623-3cbd-4372-9390-3bc90b6cf33e-bluemix.cloudantnosqldb.appdomain.cloud",
    "iam_apikey_description": "Auto-generated for key 19744262-ea4a-456c-a9d8-2e2b1407ba47",
    "iam_apikey_name": "call-for-code",
    "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
    "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/3b4dd5c1c30348139221afec6af53681::serviceid:ServiceId-1673f2f7-5555-4022-939b-df127dc2f4b6",
    "password": "f55c31896c7118a7027a762e9f34b748da37597b54e29fbc5349d2958d35dfe1",
    "port": 443,
    "url": "https://907c4623-3cbd-4372-9390-3bc90b6cf33e-bluemix:f55c31896c7118a7027a762e9f34b748da37597b54e29fbc5349d2958d35dfe1@907c4623-3cbd-4372-9390-3bc90b6cf33e-bluemix.cloudantnosqldb.appdomain.cloud",
    "username": "907c4623-3cbd-4372-9390-3bc90b6cf33e-bluemix"
  });
  require('dotenv').config()
  

  app.get('/',async (req, res) =>{

    

});

app.post('/api/insertData', (req, res) =>{
        console.log(req.body)
        cloudant.use('call_for_code').insert(req.body).then((data) => {
          console.log(data);
          res.send(data.id)
      }).catch((err) => {
        console.log(err);
      });

});

app.post("/api/insertImage", function(req, res){
  var name = req.body.name;
  var img = req.body.image;
  console.log(req.body.name)
  var realFile = Buffer.from(img,"base64");
  var lineReader = rl.createInterface({
    input: fs.createReadStream(__dirname+'/counter')
  });
  
  lineReader.on('line', function (line) {
    fs.writeFile(`./public/images/${line}_${name}`, realFile, function(err) {
      if(err)
         console.log(err);
   });
    val = parseInt(line);
    val++;
    if(val<=9){
    str = `00${val}`;
    }
    else if(val<=99){
      str = `0${val}`;
    }
    else {
      str = `${val}`;
    }
    fs.writeFile(__dirname+'/counter',str, (err) => console.log(err));
  });    
 
   res.send("OK");
   console.log('AA')
 });

 app.post('/la',function(req,res){


  exec("dir", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
  });
 })
 
 app.post("/api/searchDetails", function(req, res){
  
  fs.readFile(`./public/images/${req.body.name}.jpg`,(err,data) => {
    if(err)
      console.log(err);
    // res.sendFile(__dirname`/public/images/${req.body.name}`)
     res.send(data)
  })
  
 });

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));