const http = require('http');
const fs = require('fs')
const url = require('url')

const server = http.createServer((req, res) => {
    var q = url.parse(req.url, true)
    // url / go to page calculate
    if (q.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        fs.readFile('./exercise01.html', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' })
                res.write('404 - FILE NOT FOUND')
            }
            else
                res.write(data)
            res.end()
        })
        return
    }
    // return result of the calculate
    if (q.pathname === '/result') {
        res.writeHead(200, { 'Content-Type': 'text/html; ;charset=UTF-8' })
        let a = parseFloat(q.query.number1)
        let b = parseFloat(q.query.number2)
        let operator = q.query.operator
        //check a and b is number or not
        if(isNaN(a) || isNaN(b))
        {
            res.end('Vui lòng nhập tham số')
            return
        }
        // check the oper is choose or not
        else if(operator === ''){
            res.end('Bạn chưa chọn phép tính')
            return
        }
        // check the operator for + - * /
        else{
            let result;
            if(operator === '+')
                result = a + b
            if(operator === '-')
                result = a-b
            if(operator === '*')
                result = a*b
            if(operator === '/')
                result = a/b
            res.write(`<p> ${a} ${operator} ${b} = ${result} </p>`);
        }
        res.end();
        return 
    }
    else{
        res.writeHead(404,{'Content-Type': 'text/html;charset=UTF-8'})
        res.write(`<p>Đường dẫn không hợp lệ</p>`)
        res.end() 
        return
    }
})
server.listen(3000)