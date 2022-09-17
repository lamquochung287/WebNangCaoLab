const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const student = [
    { mssv: '519h0291', hoten: 'LQH' },
    { mssv: '519h0290', hoten: 'LQQ' }
]

app.use(bodyParser.json())

// get list student
app.get('/student', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })// return sucess: true and data: [{mssv-hoten}]
    res.end(JSON.stringify(student))
})

// add new student
app.post('/add', (req, res) => {
    const newStudent = req.body
    console.log(newStudent.mssv)
    if (student.some(student => student.mssv == newStudent.mssv)) {
        console.log(JSON.stringify({ success: false, message: 'MSSV is existed in data' }))
        return res.end(JSON.stringify({ success: false, message: 'MSSV is existed in data' }))
    }
    if (newStudent.mssv === '' && newStudent.hoten === '') {
        return res.end(JSON.stringify({ success: false, message: 'MSSV and Họ và tên not accept empty in data' }))
    }
    else {
        student.push(newStudent)
        return res.end(JSON.stringify({ success: true, data: student }))
    }
})

// find student by mssv
app.get('/student/find/:mssv', (req, res) => {
    const mssv = req.params

    const result = student.find((i) => i.mssv === mssv.mssv)
    if(result != null)
        return res.end(JSON.stringify({ success: true, data: result }))
    return res.end(JSON.stringify({ success: false, message: `Can not find student with mssv: ${mssv.mssv}`}))
    
})

// edit student by mssv
app.patch('/student/edit/:mssv', (req, res) => {
    const mssv = req.params
    const name = req.body

    const newStudent = student.find((i) => i.mssv === mssv.mssv)
    if(newStudent != null){
        newStudent.hoten = name.hoten
        return res.end(JSON.stringify({ success: true, data: newStudent }))
    }
    return res.end(JSON.stringify({ success: false, message: `Can not find student with mssv: ${mssv.mssv}`}))
    
})

// delete by mssv
app.delete('/student/delete/:mssv', (req, res) => {
    const mssv = req.params

    const result = student.find((i) => i.mssv === mssv.mssv)
    if(result != null){
        const newList = student.filter((i) => i.id !== result.id)
        return res.end(JSON.stringify({ success: true, data: newList }))
        
    }
    return res.end(JSON.stringify({ success: false, message: `Can not find student with mssv: ${mssv.mssv}`}))  
})

app.listen(3000)

