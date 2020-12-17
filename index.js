const customExpress = require('./config/custonExpress')

const app = customExpress()

app.listen(3000, () => {
    console.log('servidor rodando')
})
