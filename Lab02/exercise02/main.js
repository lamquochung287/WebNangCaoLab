const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url,true)
    if(urlPath.pathname === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'})
        fs.readFile('./exercise02.html',(err,data)=>{
            if(err){
                res.writeHead(500, { 'Content-Type': 'text/html; charset=UTF-8' })
                res.write('500 - Không tìm thấy views')
            }
            else
                res.write(data)
            res.end()
        })
        return
    }
    else if(urlPath.pathname === '/login'){
        if(req.method != 'POST'){
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
            res.write('<h1>Không hỗ trợ phương thức GET</h1>')
            res.end()
            return
        }
        let body = ''
        req.on('data', data => {
            body+= data
        })
        req.on('end', () => {
            let post = url.parse('/?' + body,true).query
            let {email, password} =post
            if(email == 'admin@gmail.com' && password == 'admin'){
                res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
                return res.end('<h1>Login success</h1>')
            }
            else{
                res.writeHead(404,{'Content-Type': 'text/html; charset=UTF-8'})
                return res.end('<h1>Email or password error</h1>')
            }
        })
    }
    else{
        res.writeHead(404,{'Content-Type': 'text/html; charset=UTF-8'})
        return res.end('<h1>Đường dẫn không hợp lệ</h1>')
    }


})

server.listen(3000)