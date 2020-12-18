const Atendimento = require('./../models/atendimento')

module.exports = (app) => {
    app.get('/atendimentos', (req, res) => {
        res.send('Rota de atendimentos!!!')
    })
    
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.save(atendimento, res)
    })
}