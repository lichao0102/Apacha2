const fs=require('fs');
const http=require('http');
const path=require('path');
const mime=require('mime');

let rootPath=path.join(__dirname,'www');
let server=http.createServer((request,response)=>{
    let targetPath=path.join(rootPath,request.url);
    if(fs.existsSync(targetPath)){
        fs.stat(targetPath,(err,stats)=>{
            if(stats.isFile()){
                response.setHeader('content-type',mime.getType(targetPath));
                fs.readFile(targetPath,(err,data)=>{
                   response.end(data);
                });
            }
         if(stats.isDirectory()){
             fs.readdir(targetPath,(err,files)=>{
                 let tem='';
                 for(let i=0;i<files.length;i++){
                     tem+=`
                     <li>
                     <a href="${request.url}${request.url=='/'?'':'/'}${files[i]}">${files[i]}</a>
                     </li>`
                 }
                 response.end(`
                 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
              <html>
              
              <head>
                  <title>Index of/ </title>
              </head>
              
              <body>
                  <h1>Index of ${request.url}</h1>
                  <ul>
                      ${tem}
                  </ul>
              </body>
              
              </html>
                 `)
             });
             
         }

        })
    }else{
        response.statusCode=404;
        response.setHeader('content-type','text/html;charset=utf-8');
        response.end(`
        <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
        <html><head>
        <title>404 Not Found</title>
        </head><body>
        <h1>Not Found</h1>
        <p>你请求的${request.url} 不在服务器上哦,检查一下呗</p>
        </body></html>
        `)
    }
})

server.listen(1234,'192.168.38.52',()=>{
    console.log('啊啊啊啊')
})