var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var co = require('co');
var OSS = require('ali-oss');

var client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAIVaqXh18vRfwl',
  accessKeySecret: '4zhdEOUlH4NkhTv3urZlxlrq3ZMh70',
  bucket: 'menu-app-data'
});

const OSS_FILE_PREFIX = 'images';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', (req, res) => {

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /tmp directory
  form.uploadDir = '/tmp';

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', (field, file) => {
    let newPath = path.join(form.uploadDir, file.name);

    fs.rename(file.path, newPath);

    co(function* () {
      let result = yield client.put(`${OSS_FILE_PREFIX}/${file.name}`, newPath);
      res.json(result);
    })
    .catch(function (err) {
      res.json(err);
    });
  });

  // log any errors that occur
  form.on('error', (err) => {
    console.log('An error has occured: \n' + err);
  });

  // parse the incoming request containing the form data
  form.parse(req);
});

app.delete('/delete/:filename', (req, res) => {
  co(function* () {
    let filename = req.params.filename;
    let result = yield client.delete(`${OSS_FILE_PREFIX}/${filename}`);
    res.json(result);
  })
  .catch(function (err) {
    res.json(err);
  });
});

var server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});