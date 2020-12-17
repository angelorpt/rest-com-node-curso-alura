const customExpress = require('./config/custonExpress')
const conexao       = require('./infraestrutura/conexao')
const Tabelas       = require('./infraestrutura/tabelas')

conexao.connect((erro) => {
    if (erro) {
        console.log(erro);
    } else {
        console.log('Conectado com sucesso!');

        // Criar Tabelas
        Tabelas.init(conexao)

        const app = customExpress()
        app.listen(3000, () => {
            console.log('servidor rodando')
        })
    }
})

