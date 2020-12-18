const moment  = require('moment')
const conexao = require('./../infraestrutura/conexao')

class Atendimento {
    save(atendimento) {
        const atendimentoToSave = {
            ...atendimento,
            data_cadastro: moment().format('YYYY-MM-DD HH:MM:SS'),
            data: moment(atendimento.data, 'DD/MM/YYYY HH:MM:SS').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'insert into atendimentos set ?'
        
        conexao.query(sql, atendimentoToSave, (error, result) => {
            if (error) {
                console.log('error', error)
            } else {
                console.log('result', result)
            }
        })
    }
}

module.exports = new Atendimento