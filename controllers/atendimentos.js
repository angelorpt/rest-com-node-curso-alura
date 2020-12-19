const Atendimento = require('./../models/atendimento')

module.exports = (app) => {
    app.get('/atendimentos', (_, res) => {
        Atendimento.index(res)
    })
    
    app.get('/atendimentos/:id', (req, res) => {
        Atendimento.show(res, parseInt(req.params.id))
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.store(atendimento, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id    = parseInt(req.params.id)
        const dados = req.body
        Atendimento.update(dados, id, res)
    })
}