const http = require('http');
const fs = require('fs')
const url = require('url')

const server = http.createServer((req, res) => {
    var q = url.parse(req.url, true)
    console.log(q)
    if (q.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        fs.readFile('./exercise01.html', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Conent-Type': 'text/html' })
                res.write('404 - FILE NOT FOUND')
            }
            else
                res.write(data)
            res.end()
        })
        return
    }
    if (q.pathname === '/result') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        let a = parseInt(q.query.number1)
        let b = parseInt(q.query.number2)
        let operator = q.query.operator
        if (!operator)
            return res.end('Bạn chưa chọn phép toán')
        else{
            let result;
            switch(operator){
                case '+':
                    result = a+b;
                    //console.log(a+b)        
                case '-':
                    result = a-b;
                    //console.log(a-b)
                case '*':
                    result = a*b;
                    //console.log(a*b)
                    
                case '/':
                    result = a/b;
                    //console.log(a/b)                
            }
            res.write(`<p> ${a} ${operator} ${b} = ${result} </p>`);
        }
        res.end();
        return 
    }
    /*
    else{
        res.writeHead(404,{'Content-Type': 'text/html;charset=UTF-8'})
        res.write(`<p>Đường dẫn không hợp lệ</p>`)
        res.end() 
        return
    }*/
    /*
    switch (q.pathname) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' })
            fs.readFile('./exercise01.html', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Conent-Type': 'text/html' })
                    res.write('404 - FILE NOT FOUND')
                }
                else
                    res.write(data)
                res.end()
            })
            return
        case '/result':
            let a = parseInt(q.query.number1)
            let b = parseInt(q.query.number2)
            let operator = q.query.operator
            if(!operator)
                return res.end('Bạn chưa chọn phép toán')
            res.end()
    }*/
})
server.listen(3000)