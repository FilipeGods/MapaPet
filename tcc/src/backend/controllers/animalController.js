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

    async getLostAnimal (req, res){
        console.log('getLostAnimal Acessado')
        const {id_user, campoPesquisa} = req.body;
        console.log(id_user)
        console.log(campoPesquisa)
        
        console.log('Procurando por name')
        let animals = await connection('animals')
                                 .select('*').where({   fk_id_user: id_user,
                                                        isPerdido: true,
                                                        name: campoPesquisa
                                                    })

        if(animals.length === 0){
            console.log('Procurando por ID')
            animals = await connection('animals')
                                 .select('*').where({   fk_id_user: id_user,
                                                        isPerdido: true,
                                                        id_animal: campoPesquisa
                                                    })
        }

        console.log(animals)
        return res.json(animals);
    },

    async setAnimalIsPerdido (req, res){
        const { id_animal, isEnabled } = req.body;

        const response = await connection('animals')
                                .where('id_animal', id_animal)
                                .update('isPerdido', isEnabled);
        
        return res.json(response);                  
    },

    async create (req, res){
        try{
            const { name, specie, race, size, picture, description, fk_id_user } = req.body;
            console.log({ name, specie, size, picture, description, fk_id_user })
            const isPerdido = false;
    
            const id_animal = crypto.randomBytes(4).toString('HEX');
        
            await connection('animals').insert({
                id_animal,
                name,
                specie,
                race,
                size, 
                picture,
                description,
                isPerdido,
                fk_id_user
            })
        
            return res.json({id_animal});
        } catch (err){
            throw(err);
        }
    
    },

    async delete (req, res) {
        const {id_animal} = req.params;
        console.log(id_animal);

        await connection('markers').where('fk_id_animal', id_animal).del();

        await connection('animals').where('id_animal', id_animal).delete();
        
        return res.json(true);
    }

}