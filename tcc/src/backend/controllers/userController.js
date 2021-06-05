const crypto = require('crypto');
const connection = require('../database/connection');
//CRIAR TRATAMENTO PARA USUARIO NAO EXISTENTE
module.exports = {

    async index (req, res) {
    
        const users = await connection('users').select('*')
        
        
        return res.json(users);
    },
    
    async getUser (req, res) {
        const {id_user} = req.body;

        const user = await connection('users')
                                    .select('*')
                                    .where('id_user', id_user)        
        
        console.log(user)
        return res.json(user);
    },

    async login (req, res) {
        console.log('==========================login============================');
        //console.log(req);
        const { email, password } = req.body;
        let isLoginRight = false;

        const user = await connection('users').select('*').where({email: email,
                                                                  password: password
                                                                });
                
        return res.status(200).json(user);
    },

    async create (req, res) {
        console.log('==========================create============================');
        console.log(req.body);
        const { name, cellphone, email, password } = req.body;

        const id_user = crypto.randomBytes(4).toString('HEX');
    
        await connection('users').insert({ //users aqui no parametro é a tabela do banco
            id_user,
            name,
            cellphone,
            email, 
            password
        })
    
        return res.json({id_user});
    }

}