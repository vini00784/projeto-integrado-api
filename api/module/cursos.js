var cursos = [
    {
        "nome"  :   "001 - Técnico em Desenvolvimento de Sistemas",
        "sigla" :   "DS",
        "icone" :   "https://cdn-icons-png.flaticon.com/512/59/59118.png",
        "carga" :   "1200",
    },
    {
        "nome"  :   "002 - Técnico em Redes de Computadores",
        "sigla" :   "RDS",
        "icone" :   "https://img.icons8.com/ultraviolet/344/thin-client.png",
        "carga" :   "1200"
    }
];

const getCoursesName = () => {
    let courses = {}
    let coursesName = []
    let error = true

    cursos.forEach(item => {
        coursesName.push({
            name: item.nome,
            abbreviation: item.sigla,
            icon: item.icone
        })
        error = false
    })

    courses.courses = coursesName
    
    if(error) {
        return false
    } else {
        return courses
    }

}

module.exports = {
    getCoursesName
}
