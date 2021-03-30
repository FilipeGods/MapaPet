const express = require('express');
const routes = express.Router();
const userController = require('./controllers/userController');
const markerController = require('./controllers/markerController');
const animalController = require('./controllers/animalController');

//USUARIO

//Rota -> Listar usuarios *irá mudar pra trazer um só*
routes.get('/users', userController.index);

//Rota -> Recuperar Usuario por ID
routes.post('/user', userController.getUser);

//Rota -> Login de usuários
routes.post('/userLogin', userController.login);

//Rota -> criação de usuários
routes.post('/users', userController.create);

//ANIMAIS 

//Rota -> Recuperar todos os animais registrados
routes.get('/animals', animalController.index);

//Rota -> Recupera animais do dono
routes.post('/getMyAnimals', animalController.getMyAnimals);

//Rota -> Recupera animais perdidos (isPerdido === true)
routes.get('/getLostAnimals', animalController.getLostAnimals);

//Rota -> Recupera animais perdidos (isPerdido === true)
routes.post('/getLostAnimal', animalController.getLostAnimal);

//Rota -> Atualiza um animal
routes.post('/setAnimalIsPerdido', animalController.setAnimalIsPerdido);

//Rota -> Registra novo animal
routes.post('/animals', animalController.create);


//MARKERS

//Rota -> Salvar markers
routes.post('/marker', markerController.create);

//Rota -> Listar markers
routes.get('/marker', markerController.index);

//Rota -> Deletar markers
routes.delete('/deleteMarker/:id_marker', markerController.delete);
/*
//Rota -> Deletar todos os markers
routes.post('/deleteAllMarkers', markerController.deleteAll);
*/
module.exports = routes;