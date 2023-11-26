var express = require('express');
var cors = require('cors');
require('dotenv').config();

// installed and added multer for single file upload handling
const multer = require('multer');
const upload = multer();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// passed multer function 'upload' as middleware
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  fileObj = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };
  res.json(fileObj);
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port);
});
