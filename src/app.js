const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Import de funções:
const { getAllStudents, 
        getStudentsName, 
        getStudentsByCourse, 
        getStudentsByStatus,
        filterStudentsByStatus,
        getStudentsByConclusionYear,
        filterStudentsByConclusionYear,
        getSubjects } 
        = require('../module/alunos.js')

const { getCoursesName } = require('../module/cursos.js')

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

// EndPoint para o get de todos os alunos
app.get('/.netlify/functions/api/alunos', cors(), async function(request, response, next) {
    let allStudents = getAllStudents()

    if(allStudents) {
        response.status(200)
        response.json(allStudents)
    } else {
        response.status(404)
    }
})

// EndPoint para buscar aluno com base na matrícula
app.get('/.netlify/functions/api/aluno/:matricula', cors(), async function(request, response, next) {
    let registration = request.params.matricula
    let studentsName = getStudentsName(registration)

    if(studentsName) {
        response.status(200)
        response.json(studentsName)
    } else {
        response.status(404)
    }
})

// EndPoint para buscar alunos cadastrados em certo curso
app.get('/.netlify/functions/api/alunos/curso/?', cors(), async function(request, response, next) {
    let course = request.query.curso
    let status = request.query.status
    let conclusionYear = request.query.conclusao

    let studentsList = getStudentsByCourse(course)

    if(status != undefined) {
        studentsList = await filterStudentsByStatus(studentsList, status)
    }

    if(conclusionYear != undefined) {
        studentsList = await filterStudentsByConclusionYear(studentsList, conclusionYear)
    }

    if(studentsList) {
        response.status(200)
        response.json(studentsList)
    } else {
        response.status(404)
    }
})

app.get('/.netlify/functions/api/alunos/status/:status', cors(), async function(request, response, next) {
    let course = request.params.status

    let studentsList = getStudentsByCourse(course)

    if(studentsList) {
        response.status(200)
        response.json(studentsList)
    } else {
        response.status(404)
    }
})

//EndPoint para buscar alunos com base no status(cursando ou finalizado)
app.get('/.netlify/functions/api/alunos/status/:status', cors(), async function(request, response, next) {
    let studentStatus = request.params.status

    let studentsByStatus = getStudentsByStatus(studentStatus)

    if(studentsByStatus) {
        response.status(200)
        response.json(studentsByStatus)
    } else{
        response.status(404)
    }
})

// EndPoint para buscar alunos com base no ano de conclusão
app.get('/.netlify/functions/api/alunos/anoConclusao/:anoConclusao', cors(), async function(request, response, next) {
    let studentConclusionYear = request.params.anoConclusao

    let studentsByConclusionYear = getStudentsByConclusionYear(studentConclusionYear)

    if(studentsByConclusionYear) {
        response.status(200)
        response.json(studentsByConclusionYear)
    } else {
        response.status(404)
    }
})

app.get('/.netlify/functions/api/conclusao/', cors(), async function(request, response, next) {

})

// EndPoint para buscar todos os cursos
app.get('/.netlify/functions/api/cursos', cors(), async function(request, response, next) {
    let coursesName = getCoursesName()

    if(coursesName) {
        response.status(200)
        response.json(coursesName)
    } else {
        response.status(404)
    }
})

// EndPoint para buscar as disciplinas e as médias do aluno individualmente
app.get('/.netlify/functions/api/disciplinas/aluno/:matricula', cors(), async function(request, response, next) {
    let registration = request.params.matricula

    let subjects = getSubjects(registration)

    if(subjects) {
        response.status(200)
        response.json(subjects)
    } else {
        response.status(404)
    }
})

// app.listen(3030, function() {
//     console.log('Server waiting for requests...')
// })

module.exports = app