const moment  = require('moment')
const conexao = require('./../infraestrutura/conexao')

class Atendimento {
    index(res) {
        const sql = 'select * from atendimentos'

        conexao.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    show(res, id) {
        const sql = `select * from atendimentos where id = ${id}`

        conexao.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    store(atendimento, res) {
        const dataNow = moment().format('YYYY-MM-DD HH:MM:SS')
        const dataValida = moment(atendimento.data, 'DD/MM/YYYY HH:MM:SS').isValid()

        let dataAgendamentoMoment = null
        let dataAgdValida = false
        let dataAgendamento = null
        if (dataValida) {
            dataAgendamentoMoment = moment(atendimento.data, 'DD/MM/YYYY HH:MM:SS')
            dataAgendamento = dataAgendamentoMoment.format('YYYY-MM-DD HH:MM:SS')
            dataAgdValida = dataAgendamentoMoment.isSameOrAfter(moment())
        }

        const clienteValido = atendimento.cliente.trim().length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data de Agendamento inválida'
            },
            {
                nome: 'data',
                valido: dataAgdValida,
                mensagem: 'Data de Agendamento deve ser maior que Data Atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente deve ter no mínimo 5 caracteres'
            }
        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json({ erros: erros })
        } else {
            const atendimentoToSave = {
                ...atendimento,
                data_cadastro: dataNow,
                data: dataAgendamento
            }
            const sql = 'insert into atendimentos set ?'

            conexao.query(sql, atendimentoToSave, (error, result) => {
                if (error) {
                    res.status(400).json(error)
                } else {
                    res.status(201).json(result)
                }
            })
        }
    }  
    
    
    update(dados, id, res) {
        const sql = `update atendimentos set ? where id = ?`

        if (dados.data) {
            if (!moment(dados.data, 'DD/MM/YYYY').isValid()) {
                res.status(422).json({ message: 'Data Inválida' })
            }
            dados.data = moment(dados.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        conexao.query(sql, [dados, id], (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }  
    
    
    destroy(res, id) {
        
        const sql = `delete from atendimentos where id = ${id}`

        conexao.query(sql, (error, result) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }    
}

module.exports = new Atendimento