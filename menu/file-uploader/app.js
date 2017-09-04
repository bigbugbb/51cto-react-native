var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var co = require('co');
var OSS = require('ali-oss');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    let newPath = path.join(form.uploadDir, file.name);
    console.log(newPath);

    fs.rename(file.path, newPath);

    var result = {};

    co(function* () {
      var client = new OSS({
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAIt25c6IspTk8Q',
        accessKeySecret: '8uvDmcknFJb2ArQN73ydixO2RjXXAC'
      });

      client.useBucket('my-app-test');
      result = yield client.put(`/images/${file.name}`, newPath);
      res.json(result);
    }).catch(function (err) {
      result = err;
      res.json(err);
    });
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});