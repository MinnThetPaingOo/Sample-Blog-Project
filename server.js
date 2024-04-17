const http = require('http');
const fs= require('fs');
const _=require('lodash');
console.log(_.random(100));


const server = http.createServer((req,res)=>{
    let filename;
    switch (req.url) {
        case '/':
            filename="home.html";
            break;
            case '/about':
            filename="about.html"
            break;
    
        default:
            filename="404.html"
            break;
    }
    res.setHeader('Content-Type','text/html')
    fs.readFile('./viewa/'+filename,(err,data)=>{
        if(err){
            console.log(err)
            res.end();
        }
        else{
            res.write(data);
            res.end();
        }
    })
})

server.listen(5000,'localhost',()=>{
    console.log('Server is listening');
})