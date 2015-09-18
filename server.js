/**
 * Created by ppa on 17.09.2015.
 */
var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser());

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://rnd-win2012-1/go_rest_tutorial';
var mongoDb,userCollection;

MongoClient.connect(url, function(err, db) {
    if (err){
        console.log('error connecting');
        return;
    }

    console.log("Connected correctly to server");

    mongoDb = db;
    userCollection = db.collection('users');
});

/*var mongoose = require('mongoose/');
db = mongoose.connect('mongodb://rnd-win2012-1/go_rest_tutorial'),
    Schema = mongoose.Schema;*/

/*var UserSchema = new Schema({
    name: String,
    gender: String,
    age: Number
});
// Use the schema to register a model with MongoDb
mongoose.model('User', UserSchema);
var User = mongoose.model('User');*/


function postUser(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // Create a new message model, fill it up and save it to Mongodb
    var user = {};
    user.name = req.params.name;
    user.gender = req.params.gender;
    user.age = req.params.age;
    userCollection.insert(user, {}, function(){
        res.send(201);
    });
}

server.post('/user', postUser);

server.listen(3002, function() {

    var consoleMessage = '\n A Simple MongoDb, Mongoose, Restify, and Backbone Tutorial'
    consoleMessage += '\n +++++++++++++++++++++++++++++++++++++++++++++++++++++'
    consoleMessage += '\n\n %s says your mongodbServer is listening at %s';
    consoleMessage += '\n great! now open your browser to http://localhost:8080';
    consoleMessage += '\n it will connect to your httpServer to get your static files';
    consoleMessage += '\n and talk to your mongodbServer to get and post your messages. \n\n';
    consoleMessage += '+++++++++++++++++++++++++++++++++++++++++++++++++++++ \n\n'

    console.log(consoleMessage, server.name, server.url);

});