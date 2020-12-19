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
        Atendimento.save(atendimento, res)
    })
}