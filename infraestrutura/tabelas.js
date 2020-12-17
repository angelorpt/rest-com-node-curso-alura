// Crie um banco de dados no MYSQL com o nome de "agenda_petshop"

class Tabelas {
    init(conexao) 
    {
        this.conexao = conexao
        this.criarAtendimentos()
    }

    criarAtendimentos() 
    {
        const sql = `create table if not exists atendimentos
        (
            id          int         NOT NULL AUTO_INCREMENT,
            cliente     varchar(50) NOT NULL,
            pet         varchar(20) NOT NULL,
            servico     varchar(20) NOT NULL,
            status      varchar(20) NOT NULL,
            observacoes text,

            primary key (id)
        )`
        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log('erro', erro)
            } else {
                console.log('tabela criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas