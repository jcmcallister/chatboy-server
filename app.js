var express = require('express');
var app = express();


app.get('/', function(req,res){
	//direct hits and unauth'd stuff gets kicked to the homepage
	res.redirect('http://localhost:3000');
});

app.listen(9001, function () {
	console.log('Example app listening on port 9001!')
})