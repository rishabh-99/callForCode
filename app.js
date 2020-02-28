const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//Database
const cors = require('cors')
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const app = express();
app.use(bodyParser.json())
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

app.get('/api/insertData', (req, res) =>{

        cloudant.use('call_for_code').insert({ happy: true }).then((data) => {
          console.log(data);
          res.status(200).send("OK")
      }).catch((err) => {
        console.log(err);
      });

});




const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));