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
                                 .select('*').where({ fk_id_user: id_user,
                                                        isMyAnimal: true
                                                    })
                                       
        return res.json(animals);
    },

    async getMyFoundAnimals (req, res){
        const { id_user } = req.body;

        const animals = await connection('animals')
                                 .select('*').where({ fk_id_user: id_user,
                                                        isMyAnimal: false
                                                    })
        
        
        console.log(animals)

        return res.json(animals);
    },

    async getFoundAnimals (req, res){
        const animals = await connection('animals')
                                 .select('*').where('isMyAnimal', false)
                                       
        return res.json(animals);
    },

    async getFoundAnimal (req, res){
        console.log('getLostAnimal Acessado')
        const {id_user, campoPesquisa} = req.body;
        console.log(id_user)
        console.log(campoPesquisa)
        
        console.log('Procurando por name')
        let animals = await connection('animals')
                                 .select('*').where({   fk_id_user: id_user,
                                                        isMyAnimal: false,
                                                        name: campoPesquisa
                                                    })

        if(animals.length === 0){
            console.log('Procurando por ID')
            animals = await connection('animals')
                                 .select('*').where({   fk_id_user: id_user,
                                                        isMyAnimal: false,
                                                        id_animal: campoPesquisa
                                                    })
        }

        console.log(animals)
        return res.json(animals);
    },

    async getLostAnimals (req, res){
        let animals = await connection('animals')
                                 .select('*').where('isPerdido', true)

        let aIdsUsers = animals.map((oAnimal, sIndice) => {
            return oAnimal.fk_id_user;
        });
        console.log('aIdsUsers: ', aIdsUsers);

        let aUsers = await connection('users').select('*').whereIn('id_user', aIdsUsers);
        
        let animalDTO = animals.map((oAnimal, sIndice) => {
            oAnimal.user = aUsers.find((oUser, sIndice) => {
                return oUser.id_user === oAnimal.fk_id_user;
            });
            console.log(`Animal ${sIndice}: ${oAnimal.user.id_user}`)

            return oAnimal;
        }); 
        
        console.log('res: ',animalDTO)
                                    
        return res.json(animalDTO);
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
            const { name, specie, race, size, picture, description, isMyAnimal, fk_id_user } = req.body;
            console.log({ name, specie, size, picture, description, isMyAnimal, fk_id_user })
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
                isMyAnimal,
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