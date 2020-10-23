const http = require('http');
const fs = require('fs');


const server = http.createServer((req,res) =>{
// console.log('request made');
console.log(req.url, req.method);


// set header content type
res.setHeader('Content-Type', 'text/html');
let path ='./views/';
switch(req.url){
    case'/':
        path +='index.html'
        res.statusCode = 200;
        break;
    case'/restaurant':
        path+='restaurant.html';
        res.statusCode = 200;
        break;
    default:
        path+='404.html';
        res.statusCode = 404;
        break;
}

// send an HTml file
// fs.readFile('./views/index.html', (err, data) =>{
    fs.readFile(path, (err, data) =>{
    if(err){
        console.log(err);
        res.end('<p>Page cannot be found</p>');
    }else{
        // res.write(data);
        // res.end();
        // res.end(data);
        res.end(data);

    }
})
});


// res.write('<head><link rel="stylesheet" href="#"></head>');
// res.write('<p>Hello People</p>');
// res.write('<p>Hello, Hello People</p>');
// res.end();
// });
server.listen(8080, 'localhost',() =>{
    console.log('Listening on port 8080');
});