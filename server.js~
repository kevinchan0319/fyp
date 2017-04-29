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
app.post("/showShoppingDB",function(req,res){
	var cre = req.body;
	var list =[];
	var list1=[];
	var record ={};
	console.log(cre);
	var arr = cre.number;
	var arr1 = cre.id;
	var name =cre.nameOfList
	
	if(name==null ||name==""){
	name="Shopping List";	
	}
	
	for(var i=0;i<arr.length;i++){
		
		if(arr[i]==0){continue;}
		else{
			list[list.length] = arr1[i];
			list1[list1.length]= arr[i];
			
		}		
					
	}
	record={name:name,date:new Date().toDateString(),id:list,quantity:list1};
	
	console.log(record);
	MongoClient.connect(mongourl, function(err, db) {
			db.collection('recordList').insertOne(record,function(err,result){
		db.close();
	});	
	});

	res.render('showList',{list:list,list1:list1,name:name});
});

app.get("/showRecord",function(req,res){
	
MongoClient.connect(mongourl, function(err, db) {
	//db.collection('recordList').find().toArray(function(err,result){
		//db.close();
	//res.render('showRecord',{list:result.id,list1:result.quantity,name:result.name,result:result,_id:result._id});
	showDB2(db,function(result){
	db.close();
	res.render('showRecord',{list:result.id,list1:result.quantity,name:result.name,result:result,_id:result._id});
	});	

	});
	
	
});
function showDB2(db,callback){
	db.collection('recordList').find().toArray(function(err,result){
		callback(result);
	
	
	
	});
	
};
app.get("/showDetail",function(req,res){
 	//var id = req.query.id;
	var id ={'_id':ObjectId(req.query.id)};
MongoClient.connect(mongourl, function(err, db) {
	db.collection('recordList').findOne(id,function(err,result){
		db.close();
	res.render('showList',{list:result.id,list1:result.quantity,name:result.name,result:result,_id:result._id});	
	
	});
	});
	

});
app.post("/delete",function(req,res){
 	//var id = req.query.id;
	//console.log(req.body.del.length);
	//var id ={'_id':ObjectId(req.body.del)};
	//console.log(req.body.del);
	


MongoClient.connect(mongourl, function(err, db) {
	if(!req.body.del){	showDB2(db,function(result){
	db.close();
	res.render('showRecord',{list:result.id,list1:result.quantity,name:result.name,result:result,_id:result._id});
	});}else
	if(req.body.del[0].length==24){
	for(var i=0;i<req.body.del.length;i++){
	var id = {'_id':ObjectId(req.body.del[i])};
	//console.log(id);
	db.collection('recordList').deleteMany(id,function(err,result){
	db.close();	
	//res.(/showRecord);
	
	});}}else{
	var id = {'_id':ObjectId(req.body.del)};
		db.collection('recordList').deleteMany(id,function(err,result){
	db.close();});
	}
	showDB2(db,function(result){
	db.close();
	res.render('showRecord',{list:result.id,list1:result.quantity,name:result.name,result:result,_id:result._id});
	});	
	});
	

});

/*
app.get("/showGrocery",function(req,res){
MongoClient.connect(mongourl, function(err, db) {
	
	showReceipt(db,function(result){
	db.close();
	res.render('showReceipt',{list:result.id,list1:result.quantity,name:result.name,result:result,_id:result._id});
	});	

	});
	
	
});
function showReceipt(db,callback){
	db.collection('Receipt').find().toArray(function(err,result){
		callback(result);
	
	
	
	});
	
};*/
////////////////////
app.get("/insertReceipt",function(req,res){
res.sendFile(__dirname+'/public/createReceipt.html');
});
app.post("/insertReceipt",sampleFile,function(req,res){
	//console.log(req.file.mimetype);
	
	
	
	MongoClient.connect(mongourl, function(err, db) {
			var criteria = req.body;
	var name = criteria.name;
	var quantity = criteria.quantity;
	var price = criteria.price;
	var date =new Date().toDateString();

	var totalPrice=0;
	for(var i =0;i<price.length;i++){
	totalPrice=totalPrice+parseFloat(price[i]);	
	}
		var a ={
	'date':new Date().toDateString(),
	'name':name,
	'quantity':quantity,
	'price':price,
	'totalPrice':totalPrice
	//'image':image
	};	
	
	
		createReceipt(db,a,function(result){
		db.close();
		res.render("showReceiptDetail",{name:name,quantity:quantity,price:price,date:date,totalPrice:totalPrice});
		
		});	
	});
	


});
function createReceipt(db,a,callback){
	db.collection('receipt').insertOne(a,function(err,result){
		callback(result);
	});	
	
};

app.get("/showAllReceipt",function(req,res){
	
MongoClient.connect(mongourl, function(err, db) {
	
	showAllReceipt(db,function(result){
	db.close();
	console.log(result);
	res.render('showAllReceipt',{result:result});
	});	

	});
	
	
});
function showAllReceipt(db,callback){
	db.collection('receipt').find().toArray(function(err,result){
		callback(result);
	
	
	
	});
	
};

app.get("/showReceiptDetail",function(req,res){
 	//var id = req.query.id;
	var id ={'_id':ObjectId(req.query.id)};
MongoClient.connect(mongourl, function(err, db) {
	db.collection('receipt').findOne(id,function(err,result){
		db.close();
	
	res.render("showReceiptDetail",{name:result.name,quantity:result.quantity,price:result.price,date:result.date,totalPrice:result.totalPrice})	
	
	});
	});
	

});
app.post("/deleteReceipt",function(req,res){
 	//var id = req.query.id;
	//console.log(req.body.del.length);
	//var id ={'_id':ObjectId(req.body.del)};
	//console.log(req.body.del);
	


MongoClient.connect(mongourl, function(err, db) {
	if(!req.body.del){		showAllReceipt(db,function(result){
	db.close();
	console.log(result);
	res.render('showAllReceipt',{result:result});
	});}else
	if(req.body.del[0].length==24){
	for(var i=0;i<req.body.del.length;i++){
	var id = {'_id':ObjectId(req.body.del[i])};
	//console.log(id);
	db.collection('receipt').deleteMany(id,function(err,result){
	db.close();	
	//res.(/showRecord);
	
	});}}else{
	var id = {'_id':ObjectId(req.body.del)};
		db.collection('receipt').deleteMany(id,function(err,result){
	db.close();});
	}
	showAllReceipt(db,function(result){
	db.close();
	console.log(result);
	res.render('showAllReceipt',{result:result});
	});
	});
	

});
const arrayUnion = require('array-union');
app.get("/showAllGrocery",function(req,res){
	
MongoClient.connect(mongourl, function(err, db) {
	
	showAllReceipt(db,function(result){
	db.close();
	console.log(result);
	/*
	var outputName=[];
	var outputQuantity=[];
	for(var i=0;i<result.length;i++){
		for(var j=0;j<outputName.length;j++){
			for(var y=0; y<result[i].name.length;y++){
				if(outputName[j]!=result[i].name[y]){}		
				
			}
		}
	}	*/
	var outputName=result[0].name;
	var outputQuantity=[];
	for(var i=1;i<result.length;i++){
	outputName= arrayUnion(outputName,result[i].name);
	}
	console.log(outputName.length);

	for(var c=0;c<outputName.length;c++){
	outputQuantity[c]=0;
	}
	for(var i=0;i<result.length;i++){
		for(var j=0;j<outputName.length;j++){
			
			for(var y=0; y<result[i].name.length;y++){
			if(outputName[j]==result[i].name[y]){
				outputQuantity[j]+=parseFloat(result[i].quantity[y]);
			}				
			}
		}
	}
	console.log(outputQuantity);

	res.render('showGrocery',{outputName:outputName,outputQuantity:outputQuantity});
	});	
	});
	
	
});



app.listen(process.env.PORT || 8099);
