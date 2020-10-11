require('dotenv').config()
const express = require('express')
const path = require ('path');
const fetch = require("node-fetch");
const fs = require('fs')
const mongoose = require('mongoose');
var Jimp = require('jimp');
const absoluteUrl = require("next-absolute-url");
const Template = require('./model/template')
var bodyParser = require('body-parser')
const{ PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const { json } = require('body-parser');
const AdmZip = require('adm-zip');
var uploadDir = fs.readdirSync(__dirname+"/upload");
const archiver=require('archiver')
const imgToPDF = require('image-to-pdf');
var http = require('http');


const app = express()
const db = process.env.DB_CONNECT

app.use(express.json())
app.use(express.static('public'));
app.set("view engine","ejs");
// accept url encoded
app.use(bodyParser.urlencoded({
  extended: true
}));

var output = fs.createWriteStream('upload.zip');
var archive = archiver('zip');

// accept json 
app.use(bodyParser.json());


//Connnect Mongo
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(()=>console.log("db connected"))
  .catch(err=>console.log(err))



  app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/home.html'));
  })



app.get("/download",(request,response)=>{
  const arr=[]
  for(var i = 0; i < uploadDir.length;i++){
   arr.push(__dirname+"/upload/"+uploadDir[i]);
}
console.log(arr)
   imgToPDF(arr, 'A4')
   .pipe(fs.createWriteStream('output.pdf'));

   var options = {
    method: 'GET',
    host: 'localhost',
    port: port,
    path: '/output'
  };

  var request = http.request(options, function(response) {
    var data = [];

    response.on('data', function(chunk) {
      data.push(chunk);
    });

    response.on('end', function() {
      data = Buffer.concat(data);
      console.log('requested content length: ', response.headers['content-length']);
      console.log('parsed content length: ', data.length);
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=working-test.pdf',
        'Content-Length': data.length
      });
      response.end(data);
    });
  });

  request.end();
})



app.post("/temp1",(req,res)=>{
  //console.log("option is:"+req.headers.option+" and body is:"+req.body[0].Theme)
        (async function () {
            for(i=0;i<req.body.length;i++){
                          // Read the image
            const image = await Jimp.read("./Templates/"+req.headers.option+".png"); // http://www.example.com/path/to/lenna.jpg

              var nameX,nameY,posX,posY,font,font1,font2,cX,cY;
              
              if(req.headers.option==="cert3"){
                nameX=400;
               nameY=1150;
               posX=400;
               posY= 2050;
               cX=1920;
               cY=2050;
               font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK); // bitmap fonts
              font1 = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
              image.print(font, nameX, nameY, req.body[i].Name); // https://github.com/libgdx/libgdx/wiki/Hiero
              image.print(font1, posX,posY, req.body[i].Position); // https://github.com/libgdx/libgdx/wiki/Hiero
              image.print(font1, cX,cY, req.body[i].Comp);
              }
              else{
                
                  nameX=210;
                  nameY=231;
                  posX=240.5;
                  posY= 310;
                  cX=210;
                  cY=337;
                  font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK); // bitmap fonts
                 font1 = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
                 font2 = await Jimp.loadFont(Jimp.FONT_SANS_12_BLACK);
                 image.print(font, nameX, nameY, req.body[i].Name); // https://github.com/libgdx/libgdx/wiki/Hiero
                image.print(font1, posX,posY, req.body[i].Position); // https://github.com/libgdx/libgdx/wiki/Hiero
                image.print(font2, cX,cY, req.body[i].Comp);
              }
            // Add text
             
             
        
            // Save the image
            image.write("./upload/upload"+i+".PNG"); // writeAsync
        
            }

        })();
        //console.log(req.headers.option)
        console.log(req.body)
})

app.get("/temp/:id",function(req,res){
  
    Template.findById(req.params.id,function(err,foundtemp){
      if(err){
          console.log(err);
      }else{	
         
          // (async function () {
        //     for(i=0;i<names.length;i++){
        //                   // Read the image
        //     const image = await Jimp.read("./"+foundtemp.pdfname); // http://www.example.com/path/to/lenna.jpg
        
        //     // Add text
        //      const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK); // bitmap fonts
        //      image.print(font, 500, 800, names[i]); // https://github.com/libgdx/libgdx/wiki/Hiero
        
        //     // Save the image
        //     image.write("./"+i+foundtemp.pdfname); // writeAsync
        
        //     }

        // })();
        res.render("xyz",{temp1:foundtemp});
          
      }
   
      
  });
  


});



app.listen(3000,()=>console.log(`server running on Port 3000`))




