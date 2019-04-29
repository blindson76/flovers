
const tf = require('@tensorflow/tfjs')
//require('@tensorflow/tfjs-node')
,Jimp = require('jimp');

const express=require("express"),
formidable = require('formidable')
;
// Load the binding (CPU computation)
var model=null;
var app=express();
app.use(express.static("statics"));

var port= port || 3000;

const labels=["Daisy","Dandelion","Rose","Sunflower","Tulip"];

app.post("/form",(req,res)=>{
	new formidable.IncomingForm().parse(req)
	.on("file",(name,file)=>{
		Jimp.read(file.path, (err, img) => {
		  if (err) throw err;
		  
		  img.resize(96, 96) 
		  

		   let sen=tf.tensor(img.bitmap.data, [1,96,96,4])
		   let s=tf.slice(sen,[0,0,0,1],[1,96,96,3]);
		   let pre=s.div(tf.scalar(255))
		   res.end(labels[model.predict(pre).argMax(1).dataSync()[0]])
		});

	})
	.on("fileBegin",(name,file)=>{
		file.path = __dirname + '/uploads/' + file.name
	})
});
app.get("/",(req,res)=>{
	res.send("OK")
})
app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)

	return;
	tf.loadLayersModel('https://safe-tundra-49540.herokuapp.com/model.json')
	.then(mdl=>{
		model=mdl;
		console.log("model loaded");
		
	})
	.catch(err=>{
		console.error(err)
	})
    
})

/**
var Jimp = require('jimp');


const labels=["Daisy","Dandelion","Rose","Sunflower","Tulip"];

tf.loadLayersModel('file://model/model.json')
.then(model=>{

	Jimp.read('lena-small-bw.jpg', (err, lenna) => {
	  if (err) throw err;
	  lenna
	    .resize(96, 96) // resize
	    .quality(60) // set JPEG quality
	    .greyscale() // set greyscale

	   lenna.getBuffer(Jimp.MIME_BMP,(er,res)=>{
	   	//console.log(res.length)
	   })

	   var sen=tf.tensor(lenna.bitmap.data, [1,96,96,4])
	   let s=tf.slice(sen,[0,0,0,1],[1,96,96,3]);
	   let pre=s.div(tf.scalar(255))
	   console.log(labels[model.predict(pre).argMax(1).dataSync()[0]])
	});
})
.catch(err=>{
	console.error(err)
})




// open a file called "lenna.png"
const express = require('express'),
	 app = express(),
	 port = 3000,
	 formidable = require('formidable'),
	 python=require("python-shell"),
	 child=require('child_process'),
	 path=require("path");

let pyshell = new python.PythonShell('Main_Module.py',{
	pythonPath:'C:/Users/user/Desktop/Kod/venv/Scripts/python.exe',
	scriptPath:'C:/Users/user/Desktop/Kod/',
	pythonOptions: ['-u'],
	cwd:'C:/Users/user/Desktop/Kod/'
});
pyshell.on("message",(msg)=>{
	pyshell.removeAllListeners("message")
	
})
app.get('/', (req, res) => res.send('Hello World!'))
app.post("/form",(req,res)=>{
	new formidable.IncomingForm().parse(req)
	.on("file",(name,file)=>{
		pyshell.send(file.path)
		pyshell.on("message",(msg)=>{
			console.log(msg)
			pyshell.removeAllListeners("message")
			res.end(msg)
		})
	})
	.on("fileBegin",(name,file)=>{
		file.path = __dirname + '/uploads/' + file.name
	})
})
app.use(express.static('static'))

**/