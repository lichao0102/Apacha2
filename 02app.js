   
    //导入模板

   const fs =require('fs');
   const http=require('http');
   const path=require('path');
   const mime=require('mime')
   //记录网址根目录
   let rootPath=path.join(__dirname,'www');
   //创建服务器
   let server=http.createServer((request,response)=>{
       //生成地址
        //   response.end('hello');
    let targetPath=path.join(rootPath,request.url);
    //判断路径是否存在
    //存在
    if(fs.existsSync(targetPath)){
        fs.stat(targetPath,(err,stats)=>{
            //  console.log(stat);
            if(stats.isFile()){
                response.setHeader('content-type',mime.getType(targetPath));
                fs.readdir(targetPath,(err,data)=>{
                    console.log(data);
                })
            }
            if(stats.isDirectory()){
                fs.readdir(targetPath,(err,files)=>{
                    let tem='';
                    for(let i=0;i<files.length;i++){
                        tem+=`<li>
                        <a href="${request.url}${request.url=='/'?'':'/'}${files[i]}">${files[i]}</a>
                        </li>`
                    }response.end(`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
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
        
        </html>`);
                })
            }
         });
        
    }
    //不存在 404
    else{
        //只能设置头 不能设置 状态码
        response.statusCode=404;
        response.setHeader('content-type','text/html;charset=utf-8');
        response.end(` <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
        <html><head>
        <title>404 Not Found</title>
        </head><body>
        <h1>Not Found</h1>
        <p>你请求的${request.url} 不在服务器上哦,检查一下呗</p>
        </body></html>`)
    }



   });

   server.listen(7979,'192.168.38.52',()=>{
       console.log('开启成功')
   });
