var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var mongourl = 'mongodb://kevinchan0319:66792310@ds147979.mlab.com:47979/fyp0319';
//var mongourl = 'mongodb://localhost:27017/test';
var express = require('express');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var multer  =   require('multer');
var app = express();


//Middleware
app.use(fileUpload());
app.use(bodyParser.json());
var sampleFile = multer().single('sampleFile');
//app = express(); cannot put upper the middleware
app = express();
//Variable


//EJS
app.set('view engine','ejs');

//Login

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));



/////////////////
app.get('/',function(req,res){
res.redirect('/index.html');
});

/////////////////////////////////////////////////

app.get('/api/read/:a', function(req,res) { 
var a = req.params.a;

MongoClient.connect(mongourl,a, function(err, db) {
read(db,a,function(result){
db.close();

res.status(200).json(result);


});
});

});
////
function read(db,a,callback){

db.collection(a).find().toArray(function(err,result){
callback(result);
});
};

app.get("/insert",function(req,res){
res.sendFile(__dirname+'/public/createShopping.html');
});
app.post("/insert",sampleFile,function(req,res){
	//console.log(req.file.mimetype);
	
	
	
	MongoClient.connect(mongourl, function(err, db) {
			var criteria = req.body;
	var name = criteria.name;
	var bfile = req.file;
	var type = criteria.type;
	//var image = criteria.image;
	console.log(type);
	var a ={
	'type':type,
	'name':name ,
	//'image':image
	'data':new Buffer(bfile.buffer).toString('base64'),'mimetype' : bfile.mimetype
	};
		create(db,a,function(result){
		db.close();
		res.redirect('/insert');		
		});	
	});
	


});

function create(db,a,callback){
	db.collection('fyp').insertOne(a,function(err,result){
		callback(result);
	});	
	
};
////////////////////

app.get("/showShoppingDB",function(req,res){
	MongoClient.connect(mongourl, function(err, db) {
		showDB(db,function(result){
		db.close();
		console.log(result.name);
		res.render('showDB',{type:result.type,name:result.name,data:result.data,_id:result._id,result:result,mimetype:result.mimetype});		
		});				
	});
});

function showDB(db,callback){
	db.collection('fyp').find().toArray(function(err,result){
		callback(result);
	});	
	
};

app.listen(process.env.PORT || 8099);