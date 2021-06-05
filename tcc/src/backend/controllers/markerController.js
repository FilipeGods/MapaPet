const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    /*
    async index (req, res) {
        const users = await connection('users').select('*');
        //estou trazendo todos os usuarios, devo trazer só 1
        return res.json(users);
    },
*/

    async index (req, res) {
        let aMarkers = await connection('markers').select('*');

        let aIdsAnimals = aMarkers.map((oMarker) => {
            return oMarker.fk_id_animal;
        });

        let aIdsUsers = aMarkers.map((oMarker) => {
            return oMarker.fk_id_user;
        });

        let aUsers = await connection('users').select('*').whereIn('id_user', aIdsUsers);

        let aAnimals = await connection('animals').select('*').whereIn('id_animal', aIdsAnimals);

        let aMarkerDTO = aMarkers.map((oMarker, sIndice) => {
            oMarker.user = aUsers.find((oUser, sIndice) => {
                return oUser.id_user === oMarker.fk_id_user;
            });

            oMarker.animal = aAnimals.find((oAnimal, sIndice) => {
                return oAnimal.id_animal === oMarker.fk_id_animal;
            });

            return oMarker;
        });

        return res.json(aMarkers);
    },

    async create (req, res) {
        console.log(req.body);
        const { latitude, longitude, street, fk_id_user, fk_id_animal } = req.body;
        console.log('fk_id_animal: ' + fk_id_animal);
        
        // const fk_ id_user = Usuário LOGADO
        const id_marker = crypto.randomBytes(4).toString('HEX');
        await connection('markers').insert({ //users aqui no parametro é a tabela do banco
            id_marker,
            latitude,
            longitude, 
            street,
            fk_id_animal,
            fk_id_user
        })
        .then(async () => {
            const response = await connection('animals')
                                .where('id_animal', fk_id_animal)
                                .update('isPerdido', true);
        })
    
        return res.json({id_marker});
    },

    async delete (req, res) {
        const {id_marker} = req.params;
        console.log(id_marker);
        await connection('markers').where('id_marker', id_marker).delete();
        
        return res.json(true);
    }
/*
    async deleteAll (req, res) {

        await connection('markers').del();
        
        return 'deleted';
    }
*/
}

/*
        table.string('id_marker', 255).primary();
        table.string('latitude', 255).notNullable();
        table.string('longitude', 255).notNullable();
        table.string('description', 255).notNullable();
        table.string('fk_id_user').unsigned();
        table.foreign('fk_id_user').references('id_user').inTable('users');
*/