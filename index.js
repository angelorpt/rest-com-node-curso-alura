const customExpress = require('./config/custonExpress')
const conexao       = require('./infraestrutura/conexao')

conexao.connect((erro) => {
    if (erro) {
        console.log(erro);
    } else {
        console.log('Conectado com sucesso!');
        const app = customExpress()
        app.listen(3000, () => {
            console.log('servidor rodando')
        })
    }
})

