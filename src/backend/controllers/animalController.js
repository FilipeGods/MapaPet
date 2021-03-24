const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = { 

    async index (req, res){
        const animals = await connection('animals').select('*')
        
        return res.json(animals);
    },

    async getMyAnimals (req, res){
        const { id_user } = req.body;

        const animals = await connection('animals')
                                 .select('*').where('fk_id_user', id_user)
                                       
        return res.json(animals);
    },

    async getLostAnimals (req, res){
        const animals = await connection('animals')
                                 .select('*').where('isPerdido', true)
                                       
        return res.json(animals);
    },

    async setAnimalIsPerdido (req, res){
        console.log('=====Animal Perdido====')
        
        const { id_animal, isEnabled } = req.body;
        // console.log(id_animal)
        // console.log(isEnabled)
        console.log(req.body)

        const response = await connection('animals')
                                .where('id_animal', id_animal)
                                .update('isPerdido', isEnabled);
        
        return res.json(response);                  
    },

    async create (req, res){
        try{
            const { name, specie, size, description, fk_id_user } = req.body;
            console.log({ name, specie, size, description, fk_id_user })
            const isPerdido = false;
    
            const id_animal = crypto.randomBytes(4).toString('HEX');
        
            await connection('animals').insert({ //users aqui no parametro é a tabela do banco
                id_animal,
                name,
                specie,
                size, 
                description,
                isPerdido,
                fk_id_user
            })
        
            return res.json({id_animal});
        } catch (err){
            throw(err);
        }

    }

}