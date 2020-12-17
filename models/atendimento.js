const conexao = require('./../infraestrutura/conexao')

class Atendimento {
    save(atendimento) {
        const sql = 'insert into atendimentos set ?'
        
        conexao.query(sql, atendimento, (error, result) => {
            if (error) {
                console.log('error', error)
            } else {
                console.log('result', result)
            }
        })
    }
}

module.exports = new Atendimento