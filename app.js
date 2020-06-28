var MongoClient = require('mongodb').MongoClient;														//All the prerequisites
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000
const session = require('express-session');
var url = 'mongodb://localhost:27017/mydb';
//var url = require("url");
//var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017/ams');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'aabbcc',saveUninitialized: true,resave: true}));


MongoClient.connect("mongodb://localhost:27017/ams", function (err, db) {										//db connection
		console.log();
		console.log("db connected");
     if(err) throw err;

     //Write databse Insert/Update/Query code here..
                
});


app.get('/', (request, response) => {																			//basepage
  response.sendFile('basepage.html', {root: __dirname })
})


app.get('/adminlog.html', (request, response) => {																//admin loginpage
	response.sendFile('adminlog.html', {root: __dirname })
})


app.post('/auth', (request, response) => {																		//admin authorization
	var usn=(request.body.username);
	var pass=(request.body.password);
	if(usn=="admin"&&pass=="admin"){
	response.sendFile('adminbase.html', {root: __dirname })}
	else{
			response.sendFile('adminlog.html', {root: __dirname })
		}
	response.sendFile('adminbase.html', {root: __dirname })
});


app.get('/flightlist1.html',  function(req, res) {																//for getting flight list
		MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
		const database = client.db('ams');
		const collection = database.collection('flight');
		var result = collection.find().toArray();
		result.then(function(dbres) {																			//retreaval
		res.writeHeader(200, {"Content-Type": "text/html"});  
		//res.sendFile("flightlist1.html", {root: __dirname });
		res.write("<html><head>");
		res.write("<h1 style='color:Red ;text-shadow: 5px 10px 50px rgba(0,0,0,0.5)'><center><marquee>Airline Reservation System</marquee></center></h1></html>"+
					"<body style='background-color:#5dffb8'>");
				res.write("<div><ul><hr>"+
			    "</ul></div><center><h2><br><br>Flight List<br><br></h2></center>"+												//table creation																		
				"<style>table { border-collapse: collapse; width: 100%;)"+
				"th, td {text-align: left; padding: 8px;}"+
				"tr:nth-child(even){background-color: #f2f2f2}"+
				"th { background-color: #4CAF50; color: white;}</style>	"+
				"<table  border='10' align='center' background-color: '#ffffff'>"+
					"<tr><b>"+
					"<th background-color: #4CAF50; color: white;>Flight Id</th>"+
					"<th background-color: #4CAF50; color: white;>Flight Name</th>"+
					"<th background-color: #4CAF50; color: white;>boarding</th>"+
					"<th background-color: #4CAF50; color: white;>Destination</th>"+
					"<th background-color: #4CAF50; color: white;>Boarding Time</th>"+
					"<th background-color: #4CAF50; color: white;>Departure Time</th>"+
					"<th background-color: #4CAF50; color: white;>Duration(hrs)</th>"+
					"<th background-color: #4CAF50; color: white;>Departure Date</th>"+
					"<th background-color: #4CAF50; color: white;>Arrival Date</th>"+
					"<th background-color: #4CAF50; color: white;>Arrival Airport Id</th>"+
					"</b></tr>");
					
        for (const index in dbres ){
			 res.write( "<tr>"+																					//printing from databse
						 "<td><center>"+dbres[index].fid+"</td>"+
						 "<td><center>"+dbres[index].fname+"</td>"+
						 "<td><center>"+dbres[index].boarding+"</td>"+
						 "<td><center>"+dbres[index].destination+"</td>"+
						 "<td><center>"+dbres[index].btime+"</td>"+
						 "<td><center>"+dbres[index].deptime+"</td>"+
						 "<td><center>"+dbres[index].jourtime+"</td>"+
						 "<td><center>"+dbres[index].depdate+"</td>"+
						 "<td><center>"+dbres[index].arrdate+"</td>"+
						 "<td><center>"+dbres[index].aid+"</td>"+
						
						 "</tr>");
		}
		res.write("</body></html>");		  
		if(err) throw err;                
	});
    });
	});


app.get('/apassengdet.html',  function(req, res) {																//for getting passenger list
		MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
		const database = client.db('ams');
		const collection = database.collection('passenger');
		var result = collection.find().toArray();
		result.then(function(dbres) {																			//retreaval
						res.writeHeader(200, {"Content-Type": "text/html"});  
						res.write("<html><head>");
						res.write("<h1 style='color:Red ;text-shadow: 5px 10px 50px rgba(0,0,0,0.5)'><center><marquee>Airline Reservation System</marquee></center></h1></html>");
						res.write("<table  border='10' align='center'>"+										//table create
									"<div><ul>"+
									"<br><hr>");
						res.write("</ul></div><center><h2><br><br>Passenger List<br><br></h2></center>"+
									"<body style='background-color:#5dffb8'>"+														//table create
									"<style>table { border-collapse: collapse; width: 100%;)"+
									"th, td {text-align: left; padding: 8px;}"+
									"tr:nth-child(even){background-color: #f2f2f2}"+
									"th { background-color: #4CAF50; color: white;}</style>	"+
									"<table    border='5' align='center' background-color: '#f2f2f2'"+
									"<tr><b>"+
									"<th>Passenger Id</th>"+
									"<th>Passenger Name</th>"+
									"<th>Age</th>"+
									"<th>Adhaar No</th>"+
									"<th>Address</th>"+
									"<th>Password</th>"+
									"</b>"+
									"</tr>");
						for (const index in dbres ){
							res.write("<tr>"+																	//printing from databse
									  "<td><center>"+dbres[index].pid+"</td>"+
									  "<td><center>"+dbres[index].pname+"</td>"+
									  "<td><center>"+dbres[index].age+"</td>"+
									  "<td><center>"+dbres[index].adhaarno+"</td>"+
									  "<td><center>"+dbres[index].address+"</td>"+
									  "<td><center>"+dbres[index].pswd+"</td>"+
									  "</tr>");
						}
		res.write("");		  
		if(err) throw err;                
	});
    });
	});


app.get('/asearch.html',  function(req, res) {																	//for getting flight search list(1 function)
		res.sendFile('asearch.html', {root: __dirname })
});


app.post('/asearch1', (request, res) => {																		//for fligtht search result
	var fcode1=(request.body.fcode);
	MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
	const database = client.db('ams');
	const collection = database.collection('flight');
	var result=collection.findOne({fid:fcode1});
	result.then(function(dbres) {																			//retreaval
	res.writeHeader(200, {"Content-Type": "text/html"});  
	res.write("<html><head>");
	res.write("<h1 id='title' style='color:Red ;text-shadow: 5px 10px 50px rgba(0,0,0,0.5)'><center><marquee>Airline Reservation System</marquee></center></h1></html>");
	res.write("</h1><div><ul><body style='background-color:#5dffb8'<hr>"+
		"	</ul><h2><br><br><center>Flight Information<br><br>"+
		"<style>table { border-collapse: collapse; width: 100%;)"+
		"th, td {text-align: left; padding: 8px;}"+
		"tr:nth-child(even){background-color: #f2f2f2}"+
		"th { background-color: #4CAF50; color: white;}</style>	"+
		"</div><table  border='10' align='center'>"+														//table create
					"<tr><b>"+
					"<th>Flight Id</th>"+
					"<th>Flight Name</th>"+
					"<th>boarding</th>"+
					"<th>Destination</th>"+
					"<th>Boarding Time</th>"+
					"<th>Departure Time</th>"+
					"<th>Duration(hrs)</th>"+
					"<th>Departure Date</th>"+
					"<th>Arrival Date</th>"+
					"<th>Arrival Airport Id</th>"+
					"</b>"+
					"</tr>");
			 res.write( "<tr>"+																					//printing from databse
						 "<td><center>"+dbres.fid+"</td>"+
						 "<td><center>"+dbres.fname+"</td>"+
						 "<td><center>"+dbres.boarding+"</td>"+
						 "<td><center>"+dbres.destination+"</td>"+
						 "<td><center>"+dbres.btime+"</td>"+
						 "<td><center>"+dbres.deptime+"</td>"+
						 "<td><center>"+dbres.jourtime+"</td>"+
						 "<td><center>"+dbres.depdate+"</td>"+
						 "<td><center>"+dbres.arrdate+"</td>"+
						 "<td><center>"+dbres.aid+"</td>"+
						
						 "</tr>");
		res.write("/html");		  
		if(err) throw err;                
	});
    });		
});


app.get('/addflight.html',  function(req, res) {																//for adding flight
		res.sendFile('addflight.html', {root: __dirname })
			});


app.post('/abc', (request, res) => {																			//for flight add result
	var fcode1=(request.body.fcode);
	var fname1=(request.body.fname);
	var boar=(request.body.boar);
	var dest=(request.body.dest);
	var btime1=(request.body.btime);
	var dtime=(request.body.dtime);
	var dur=(request.body.dur);
	var depdate1=(request.body.depdate);
	var adate=(request.body.adate);
	var aid1=(request.body.aid);
	var cost1=(request.body.cost);
	MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
		console.log();
		console.log("db connected");
		const database = client.db('ams');
		const collection = database.collection('flight');
		var result=collection.insertOne({fid:fcode1,fname:fname1,boarding:boar,destination:dest,btime:btime1,deptime:dtime,jourtime:dur,depdate:depdate1,arrdate:adate,aid:aid1,cost:cost1});
		result.then(function(dbres) {																			//retreaval
		res.sendFile("adminbase.html", {root: __dirname });
		});
    });		
});


app.get('/acancel.html',  function(req, res) {																	//for getting flight list to delete it
		MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
		const database = client.db('ams');
		const collection = database.collection('flight');
		var result = collection.find().toArray();
		result.then(function(dbres) {																			//retreaval
		res.writeHeader(200, {"Content-Type": "text/html"});  
		res.write("<html><head>");
		res.write("<h1 style='color:Red ;text-shadow: 5px 10px 50px rgba(0,0,0,0.5)'><center><marquee>Airline Reservation System</marquee></center></h1></html>");
						res.write("<table  border='10' align='center'>"+										//table create
									"<div><ul>"+
									"<!--<li><a href='basepage><i class='fa fa-home' aria-hidden='true'></i> Home</a></li>"+
									"<li><a href='basepage'><i class='fa fa-sign-out' aria-hidden='true'></i> Logout</a></li>-->");
						res.write("<br><hr>");
						res.write("</ul></div><center><h2><br><br>Enter the Flight Code<br><br></h2></center>"+
									"<body style='background-color:#5dffb8'>"+														//table create
									"<style>table { border-collapse: collapse; width: 100%;)"+
									"th, td {text-align: left; padding: 8px;}"+
									"tr:nth-child(even){background-color: #f2f2f2}"+
									"th { background-color: #4CAF50; color: white;}"+
									"</style>	");
		res.write("<table  border='10' align='center'>"+														//table create
					"<tr><b>"+
					"<th>Flight Id</th>"+
					"<th>Flight Name</th>"+
					"<th>boarding</th>"+
					"<th>Destination</th>"+
					"<th>Boarding Time</th>"+
					"<th>Departure Time</th>"+
					"<th>Duration(hrs)</th>"+
					"<th>Departure Date</th>"+
					"<th>Arrival Date</th>"+
					"<th>Arrival Airport Id</th>"+
					"</b>"+
					"</tr>");
        for (const index in dbres ){
			 res.write( "<tr>"+																					//printing from databse
						 "<td>"+dbres[index].fid+"</td>"+
						 "<td>"+dbres[index].fname+"</td>"+
						 "<td>"+dbres[index].boarding+"</td>"+
						 "<td>"+dbres[index].destination+"</td>"+
						 "<td>"+dbres[index].btime+"</td>"+
						 "<td>"+dbres[index].deptime+"</td>"+
						 "<td>"+dbres[index].jourtime+"</td>"+
						 "<td>"+dbres[index].depdate+"</td>"+
						 "<td>"+dbres[index].arrdate+"</td>"+
						 "<td>"+dbres[index].aid+"</td>"+
						
						 "</tr>");
		}
		res.write("</table><center><style>"+
				  ".form-inline button { padding: 10px 20px;background-color: dodgerblue; border: 1px solid #ddd; color: white;}"+
				  ".form-inline button { padding: 10px 20px; background-color: dodgerblue; border: 1px solid #ddd; color: white;"+
				  ".form-inline label { margin: 5px 10px 5px 0;}"+
				  ".form-inline {display: flex; flex-flow: row wrap; align-items: center;width:250px}"+
				  ".form-inline input {vertical-align: middle;margin: 5px 10px 5px 0;padding: 10px;background-color: #fff;border: 1px solid #ddd;}"+
				  "@media (max-width: 800px) {.form-inline input {  margin: 10px 0; } .form-inline { flex-direction: column; align-items: stretch; }</style>"+
				"<form class='form-inline' action='adelete' method='POST'><br><br>"+
				"<input type='text' name='fcode' placeholder='flight code' required><br><br>"+
				"<button type='submit'>Submit</button>"+
				"</form></center>");		  

		res.write("");		  
		if(err) throw err;                
	});
	});
	});


app.post('/adelete', (request, res) => {																		//for fligtht delete operation
	var fcode1=(request.body.fcode);
	MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
		const database = client.db('ams');
		const collection = database.collection('flight');
		var result=collection.removeOne({fid:fcode1});
		res.write("flight canceleedddde");
	});
    });


app.get('/aeditflight.html',  function(req, res) {																//for getting flight list to update it
		MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
		const database = client.db('ams');
		const collection = database.collection('flight');
		var result = collection.find().toArray();
		result.then(function(dbres) {																			//retreaval
		res.writeHeader(200, {"Content-Type": "text/html"});  
		res.write("<html><head>");
		res.write("<h1 style='color:Red ;text-shadow: 5px 10px 50px rgba(0,0,0,0.5)'><center><marquee>Airline Reservation System</marquee></center></h1></html>"+
				  "<!--<div><ul><li><a href='basepage><i class='fa fa-home' aria-hidden='true'></i> Home</a></li>"+
				  "<li><a href='basepage'><i class='fa fa-sign-out' aria-hidden='true'></i> Logout</a></li>-->"+
				  "<body style='background-color:#5dffb8'><hr>		"+	
					"</ul><h2><br><br><center>Enter Flight no.<br><br>"+
				  "<tr><b>");
		res.write("<style>table { border-collapse: collapse; width: 100%;)"+
				"th, td {text-align: left; padding: 8px;}"+
				"tr:nth-child(even){background-color: #f2f2f2}"+
				"th { background-color: #4CAF50; color: white;}</style>	"+
				"<table  border='10' align='center'>"+														//table create
					"<tr><b>"+
					"<th>Flight Id</th>"+
					"<th>Flight Name</th>"+
					"<th>boarding</th>"+
					"<th>Destination</th>"+
					"<th>Boarding Time</th>"+
					"<th>Departure Time</th>"+
					"<th>Duration(hrs)</th>"+
					"<th>Departure Date</th>"+
					"<th>Arrival Date</th>"+
					"<th>Arrival Airport Id</th>"+
					"</b>"+
					"</tr>");
        for (const index in dbres ){
			 res.write( "<tr>"+																					//printing from databse
						 "<td><center>"+dbres[index].fid+"</td>"+
						 "<td><center>"+dbres[index].fname+"</td>"+
						 "<td><center>"+dbres[index].boarding+"</td>"+
						 "<td><center>"+dbres[index].destination+"</td>"+
						 "<td><center>"+dbres[index].btime+"</td>"+
						 "<td><center>"+dbres[index].deptime+"</td>"+
						 "<td><center>"+dbres[index].jourtime+"</td>"+
						 "<td><center>"+dbres[index].depdate+"</td>"+
						 "<td><center>"+dbres[index].arrdate+"</td>"+
						 "<td><center>"+dbres[index].aid+"</td>"+
						
						 "</tr>");
		}
				res.write("</table><br><br><center>"+
				"<form  action='aupdate1.html' method='POST'>"+
				"<input type='text' name='fcode' placeholder='flight code' required><br>"+
				"<input type='submit'>"+
				"</form></center>");		  

		res.write("</html>");		  
		if(err) throw err;                
});
});
});


app.post('/aupdate1.html',  function(req, res) {																//for adding flight update 2
var fcode1=(req.body.fcode);
	MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
		const database = client.db('ams');
		const collection = database.collection('flight');
		var result=collection.findOne({fid:fcode1});
		result.then(function(dbres) {																			//retreaval
		res.writeHeader(200, {"Content-Type": "text/html"});  
			res.write("<html><head>");
		res.write("<h1 style='color:Red ;text-shadow: 5px 10px 50px rgba(0,0,0,0.5)'><center><marquee>Airline Reservation System</marquee></center></h1></html>"+
				  "<body>"+
					"<center><h2>Edit Details</h2></center>"+
					"<body style='background-color:#5dffb8'>	"+
					"				<tr><b>");
				res.write("<html><body style='background-color:#5dffb8'><form action='aupdate2' method='post'><center>"+
						"flight code:<input type='text' name='fcode'  value="+dbres.fid+"><br><br>"+
						"flight name:<input type='text' name='fname' value="+dbres.fname+"><br><br>"+
						"boarding:<input type='text' name='boar' value="+dbres.boarding+"><br><br>"+
						"destination:<input type='text' name='dest' value="+dbres.destination+"><br><br>"+
						"boarding time:<input type='text' name='btime' value="+dbres.btime+"><br><br>"+
						"departure time:<input type='text' name='dtime' value="+dbres.deptime+"><br><br>"+
						"duration:<input type='text' name='dur' value="+dbres.jourtime+"><br><br>"+
						"deparuture date:<input type='text' name='depdate' value="+dbres.depdate+"><br><br>"+
						"arrival date:<input type='text' name='adate' value="+dbres.arrdate+"><br><br>"+
						"arrival airport id:<input type='text' name='aid' value="+dbres.aid+"><br><br>"+
						"cost:<input type='text' name='cost' value="+dbres.cost+"><br><br>"+
						"<input type='submit' name='submit' value='SUBMIT'/>"+
						"</center></form></body></html>		");
			});
	});
});


app.post('/aupdate2', (request, res) => {																		//for fligtht update2
	var fcode1=(request.body.fcode);
	var fname1=(request.body.fname);
	var boar=(request.body.boar);
	var dest=(request.body.dest);
	var btime1=(request.body.btime);
	var dtime=(request.body.dtime);
	var dur=(request.body.dur);
	var depdate1=(request.body.depdate);
	var adate=(request.body.adate);
	var aid1=(request.body.aid);
	var cost1=(request.body.cost);
	MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
		const database = client.db('ams');
		const collection = database.collection('flight');
		var result=collection.updateMany({fid:fcode1},{$set:{fname:fname1,boarding:boar,destination:dest,btime:btime1,deptime:dtime,jourtime:dur,depdate:depdate1,arrdate:adate,aid:aid1,cost:cost1}});
		result.then(function(dbres) {																			//retreaval
		res.sendFile("adminbase.html", {root: __dirname });
		});
	});
});


app.get('/guestlog.html', (request, response) => {																//guest loginpage
  response.sendFile('guestlog.html', {root: __dirname })
})

var sess;
app.get('/guestsignup.html', (request, response) => {																//guest loginpage
  response.sendFile('guestsignup.html', {root: __dirname })
})

app.post('/auth2', (request, response) => {																		//guest authorization
		var usn=(request.body.username);
		var pass=(request.body.password);
		sess = request.session;
		sess.usn = request.body.username;
		sess.pass = request.body.password;
		MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
				const database = client.db('ams');
				const collection = database.collection('passenger');
				var result=collection.findOne({$and: [{pname:usn},{pswd:pass}]});
				result.then(function(dbres) {		
					sess.pid=dbres.pid;
				if(dbres){
					response.sendFile('guestbase.html', {root: __dirname });
					} else {
					console.log("Credentials wrong");
					response.end("Login invalid");
				  }
		});		
 });
});


app.get('/flightlist2.html',  function(req, res) {																//for getting flight list
				MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
		const database = client.db('ams');
		const collection = database.collection('flight');
		var result = collection.find().toArray();
		result.then(function(dbres) {																			//retreaval
		res.writeHeader(200, {"Content-Type": "text/html"});  
		//res.sendFile("flightlist1.html", {root: __dirname });
		res.write("<html><head>");
		res.write("<h1 style='color:Red ;text-shadow: 5px 10px 50px rgba(0,0,0,0.5)'><center><marquee>Airline Reservation System</marquee></center></h1></html>"+
					"<body style='background-color:#5dffb8'>");
				res.write("<div><ul><hr>"+
				"</ul></div><center><h2><br><br>Flight List<br><br></h2></center>"+												//table creation																		
				"<style>table { border-collapse: collapse; width: 100%;)"+
				"th, td {text-align: left; padding: 8px;}"+
				"tr:nth-child(even){background-color: #f2f2f2}"+
				"th { background-color: #4CAF50; color: white;}</style>	"+
				"<table  border='10' align='center' background-color: '#ffffff'>"+
					"<tr><b>"+
					"<th background-color: #4CAF50; color: white;>Flight Id</th>"+
					"<th background-color: #4CAF50; color: white;>Flight Name</th>"+
					"<th background-color: #4CAF50; color: white;>boarding</th>"+
					"<th background-color: #4CAF50; color: white;>Destination</th>"+
					"<th background-color: #4CAF50; color: white;>Boarding Time</th>"+
					"<th background-color: #4CAF50; color: white;>Departure Time</th>"+
					"<th background-color: #4CAF50; color: white;>Duration(hrs)</th>"+
					"<th background-color: #4CAF50; color: white;>Departure Date</th>"+
					"<th background-color: #4CAF50; color: white;>Arrival Date</th>"+
					"<th background-color: #4CAF50; color: white;>Arrival Airport Id</th>"+
					"</b></tr>");
					
        for (const index in dbres ){
			 res.write( "<tr>"+																					//printing from databse
						 "<td><center>"+dbres[index].fid+"</td>"+
						 "<td><center>"+dbres[index].fname+"</td>"+
						 "<td><center>"+dbres[index].boarding+"</td>"+
						 "<td><center>"+dbres[index].destination+"</td>"+
						 "<td><center>"+dbres[index].btime+"</td>"+
						 "<td><center>"+dbres[index].deptime+"</td>"+
						 "<td><center>"+dbres[index].jourtime+"</td>"+
						 "<td><center>"+dbres[index].depdate+"</td>"+
						 "<td><center>"+dbres[index].arrdate+"</td>"+
						 "<td><center>"+dbres[index].aid+"</td>"+
						
						 "</tr>");
		}
		res.write("</body></html>");		  
		if(err) throw err;                
	});
    });
	});


app.get('/bflight.html',  function(req, res) {																    //for getting flight list to update it
		MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
		const database = client.db('ams');
		const collection = database.collection('flight');
		var result = collection.find().toArray();
		result.then(function(dbres) {																			//retreaval
		res.writeHeader(200, {"Content-Type": "text/html"});  
		res.write("<html><head>");
		res.write("<h1 style='color:Red ;text-shadow: 5px 10px 50px rgba(0,0,0,0.5)'><center><marquee>Airline Reservation System</marquee></center></h1></html>"+
					"<body style='background-color:#5dffb8'>");
				res.write("<div><ul><hr>"+
				"</ul></div><center><h2><br><br>Flight List<br><br></h2></center>"+												//table creation																		
				"<style>table { border-collapse: collapse; width: 100%;)"+
				"th, td {text-align: left; padding: 8px;}"+
				"tr:nth-child(even){background-color: #f2f2f2}"+
				"th { background-color: #4CAF50; color: white;}</style>	"+
				"<table  border='10' align='center' background-color: '#ffffff'>"+
					"<tr><b>"+
					"<th background-color: #4CAF50; color: white;>Flight Id</th>"+
					"<th background-color: #4CAF50; color: white;>Flight Name</th>"+
					"<th background-color: #4CAF50; color: white;>boarding</th>"+
					"<th background-color: #4CAF50; color: white;>Destination</th>"+
					"<th background-color: #4CAF50; color: white;>Boarding Time</th>"+
					"<th background-color: #4CAF50; color: white;>Departure Time</th>"+
					"<th background-color: #4CAF50; color: white;>Duration(hrs)</th>"+
					"<th background-color: #4CAF50; color: white;>Departure Date</th>"+
					"<th background-color: #4CAF50; color: white;>Arrival Date</th>"+
					"<th background-color: #4CAF50; color: white;>Arrival Airport Id</th>"+
					"</b></tr>");
					
        for (const index in dbres ){
			 res.write( "<tr>"+																					//printing from databse
						 "<td><center>"+dbres[index].fid+"</td>"+
						 "<td><center>"+dbres[index].fname+"</td>"+
						 "<td><center>"+dbres[index].boarding+"</td>"+
						 "<td><center>"+dbres[index].destination+"</td>"+
						 "<td><center>"+dbres[index].btime+"</td>"+
						 "<td><center>"+dbres[index].deptime+"</td>"+
						 "<td><center>"+dbres[index].jourtime+"</td>"+
						 "<td><center>"+dbres[index].depdate+"</td>"+
						 "<td><center>"+dbres[index].arrdate+"</td>"+
						 "<td><center>"+dbres[index].aid+"</td>"+
						
						 "</tr>");
		}
				res.write("</table><center>"+
						  "<form action='bookflight1.html' method='POST'>"+
				          "<input type='text' name='fcode' placeholder='flight code' required>"+
				          "<input type='submit'>"+
                          "</form></center>");		  

		res.write("");		  
		if(err) throw err;                
	});
	});
	});


app.post('/bookflight1.html',  function(req, res) {																//for getting flight list
		MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
				fcode1=req.body.fcode;
				pcode=sess.pid;
				sess.fcode=fcode1;
				const database = client.db('ams');
				const collection = database.collection("flight");
				const collection1 = database.collection("passenger");
				var result = collection.findOne({fid:fcode1});
				var result1 = collection1.findOne({pid:pcode});
				result.then(function(dbres) {																			//retreaval
						result1.then(function(dbres2) {	
				     		sess.cost=dbres.cost;
							sess.dbres=dbres;
							sess.dbres2=dbres2;
							//res.writeHeader(200, {"Content-Type": "text/html"});  
							res.write("<html><head>");
							res.write("<div><ul><br><br>"+
									"<body style='background-color:#5dffb8'>"+														//table create
										"<tr><b><title> amsdb </title>"+
										
									  "<h1 style='color:Red ;text-shadow: 5px 10px 50px rgba(0,0,0,0.5)'><center><marquee>Airline Reservation System</marquee></center></h1></head>"+
									  "<div><ul>"+
									  "</ul></div><h2><center>Confirm Booking<center> </h2>"+
									  "<div class='container'>"+
									  "<form action='\successtick' method='post'><center><fieldset disabled='disabled'>"+
									  "Flight Code:<input type='text' name='fcode' value="+dbres.fid+"><br>"+
									  "Flight name:<input type='text' name=fname' value="+dbres.fname+ "/><br>"+
									  "Passenger id:<input type='text' name='pid' value="+dbres2.pid+"><br>"+
									  "Passenger name:<input type='text' name='pname' value="+dbres2.pname+"><br>"+
									  "Adhaar no:<input type='text' name='adhaarno' value="+dbres2.adhaarno+"><br>"+
									  "Boarding:<input type='text' name='boar' value="+dbres.boarding+"><br>"+
									  "Destination:<input type='text' name='dest' value="+dbres.destination+"><br>"+
									  "Boarding time:<input type='text' name='btime' value="+dbres.btime+"><br>"+
									  "Departure time:<input type='text' name='dtime' value="+dbres.deptime+"><br>"+
									  "Duration:<input type='text' name='dur' value="+dbres.jourtime+"><br>"+
									  "Deparuture date:<input type='text' name='depdate' value="+dbres.depdate+"><br>"+
									  "Arrival date:<input type='text' name='arrdate' value="+dbres.arrdate+"><br>"+
									  "Airport id:<input type='text' name='aid' value="+dbres.aid+"><br>"+
									  "Cost:<input type='text' name='aid' value="+dbres.cost+"><br><br>"+
									  "</center>"+
									  "<center><input type='submit' name='submit' value='Book'></center></form></div></body></html>");
							});
				res.write("");		  
				if(err) throw err;          
				});		
				});
	   });


app.post('/successtick',  function(req, res) {																	//for ticket booking confirmation
		MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
			fcode1=sess.fcode;
			pcode=sess.pid;
			tid1=Math.floor((Math.random() * 202022) + 020110)
			transid1=Math.floor((Math.random() * 202022) + 020110)
			var today = new Date();
			var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
			const database = client.db('ams');
			const collection = database.collection("ticket");
			const collection1 = database.collection("transaction");
			var result=collection.insertOne({tid:tid1,fid:fcode1,pid:pcode,cost:sess.cost});
			var result1=collection1.insertOne({transid:transid1,tid:tid1,pid:pcode,transdate:date});
				result.then(function(dbres) {
					result1.then(function(dbres1) {
						res.write("<html><head>");
						res.write("<title> amsdb </title>"+
							"<h1 style='color:Red ;text-shadow: 5px 10px 50px rgba(0,0,0,0.5)'><center><marquee>Airline Reservation System</marquee></center></h1>"+
							"<div><ul><br><br>"+
			    "</ul></div><center><h2></h2></center>"+
				"<body style='background-color:#5dffb8'>"+														//table create
					"<tr><b>"+
							"<h2>Ticket confirmed");
							
					});
				});
		});
		});


app.get('/pretrans',  function(req, res) {																		//for viewing previous transaction
		MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
			fcode1=sess.fcode;
			pcode=sess.pid;
			console.log(pcode);
			const database = client.db('ams');
			const collection = database.collection('transaction');
			var result1 = collection.find({pid:pcode}).toArray();
			
			result1.then(function(dbres) {
			res.writeHeader(200, {"Content-Type": "text/html"});  
			res.write("<html><head>");
		res.write("<h1 style='color:Red ;text-shadow: 5px 10px 50px rgba(0,0,0,0.5)'><center><marquee>Airline Reservation System</marquee></center></h1></html>"+
					"<body style='background-color:#5dffb8'>");
				res.write("<div><ul><br><br><hr>"+
			    "</ul></div><center><h2><br><br>Previous Transactions<br><br></h2></center>"+												//table creation																		
				"<style>table { border-collapse: collapse; width: 100%;)"+
				"th, td {text-align: left; padding: 8px;}"+
				"tr:nth-child(even){background-color: #f2f2f2}"+
				"th { background-color: #4CAF50; color: white;}</style>	"+
				"<body style='background-color:#5dffb8'><table  border='10' align='center' background-color: '#ff1aff'>"+														//table create
					"<tr><b><table  border='10' align='center'>"+															//table create
						"<tr><b>"+
						"<th>Transaction Id</th>"+
						"<th>Ticket Id</th>"+
						"<th>Passenger Id</th>"+
						"<th>Transaction date</th>"+
						"</b>"+
						"</tr>");
			for (const index in dbres ){
				 res.write( "<tr>"+																					//printing from databse
							 "<td><center>"+dbres[index].transid+"</td>"+
							 "<td><center>"+dbres[index].tid+"</td>"+
							 "<td><center>"+dbres[index].pid+"</td>"+
							 "<td><center>"+dbres[index].transdate+"</td>"+						
							 "</tr>");
			}
			res.write("/html");		  
			if(err) throw err;                
		});
});
});				


app.get('/gcancel.html', (request, response) => {																//To cancel the ticket
  response.sendFile('gcancel.html', {root: __dirname })
})


app.post('/gtickcan',  (req, res)=> {																			//for ticket cancellation
		MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
		var tid1=req.body.tid;
		console.log(tid1);
		const database = client.db('ams');
		console.log("ticket canceleedddde");
		const collection = database.collection('ticket');
		console.log("ticket canceleedddde");
		var result=collection.removeOne({tid:parseInt(tid1)});
		result.then(function(dbres) {
			console.log(result);
		res.write("ticket canceleedddde");
		});
	});    
});			


app.post('/abcd', (request, res) => {																			//for flight add result
	var pid1=tid1=Math.floor((Math.random() * 202022) + 020110)			
	var pname1=(request.body.pname);
	var page1=(request.body.age);
	var gender1=(request.body.gender);
	var adhaarno1=(request.body.adno);
	var address1=(request.body.add);
	var password1=(request.body.pswd);
	MongoClient.connect("mongodb://localhost:27017/ams", function (err, client) {
		console.log();
		console.log("db connected");
		const database = client.db('ams');
		const collection = database.collection('passenger');
		var result=collection.insertOne({pid:pid1,pname:pname1,age:page1,adhaarno:adhaarno1,address:address1,pswd:password1});
		result.then(function(dbres) {																			//retreaval
		res.sendFile("basepage.html", {root: __dirname });
		});
    });		
});


app.listen(port, (err) => {																						//for server error
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});