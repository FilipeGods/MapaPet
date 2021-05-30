import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, ImageBackground, Text, TextInput, Alert, TouchableOpacity, Button } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from '../styles';
import MapView, { Callout } from 'react-native-maps';
import Modal from 'react-native-modal';
import * as Permissions from 'expo-permissions';
import Geocoder from 'react-native-geocoding';
import api from '../../services/api';
import getDistance from 'geolib/es/getDistance';
import DropDownPicker from 'react-native-dropdown-picker';
import {images} from '../../assets/index';
let USUARIO = require('../../services/globalUserController.json');

import {Audio} from 'expo-av';
let markersQuantidadeAtual,
    streetName,
    sound = new Audio.Sound(),
    id_user;
    
export default class Mapa extends React.Component {
    constructor(props) {
        super(props);
        this.audioPlayer = new Audio.Sound();

        //Propriedades:        
        this.state = {
            animalSelecionado: 'string',
            playing: true,
            modal: false,
            modalInfo: false,
            //isDialogVisible: false,
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
                
            latitudeLongitudeTemp: {
                latitude: null,
                longitude: null,
            },
            places:{
                key: this.props.id,
            },
            markers: [
                {
                    id: null,
                    latlng: {
                        latitude: 0,
                        longitude: 0,
                    },
                    title: null,
                    user: {
                        id_user: null,
                        name: null,
                        email: null,
                        cellphone: null
                    },
                    animal: {
                        id_animal: null,
                        name: null,
                        specie: null,
                        race: null,
                        size: null,
                        description: null,
                        picture: null
                    }
                }
            ],
            myAnimals: [],
            myAnimalsDropDown: []
        };
        this.carregarMarkers = this.carregarMarkers.bind(this);
        this.carregarAnimais = this.carregarAnimais.bind(this);
        this.findAnimal = this.findAnimal.bind(this);
        this.saveMarker = this.saveMarker.bind(this);
        this.deletarMarker = this.deletarMarker.bind(this); 
        this.refreshMap = this.refreshMap.bind(this);
        this.hasUserLocationChanged = this.hasUserLocationChanged.bind(this);
        this.prepareAlertSound = this.prepareAlertSound.bind(this);
        this.playAlertSound = this.playAlertSound.bind(this);

    }; //final do construtor

    async getLocalizationData () {

        Geocoder.init("AIzaSyDMhkRJt5tdp2zX9NszzQ6-YT2Ss-DCO08"); 
        
        Geocoder.from(this.state.latitudeLongitudeTemp.latitude, this.state.latitudeLongitudeTemp.longitude)
            .then(json => {
                var addressComponent = json.results[1].address_components[1];
                streetName = addressComponent.short_name;
            })
            .catch(error => console.warn(error));
    }

    async componentDidMount(){
        
        const { status } = await Permissions.getAsync(Permissions.LOCATION);
        if (status != 'granted'){
            const response = await Permissions.askAsync(Permissions.LOCATION);
        }

        this.watchID = navigator.geolocation.watchPosition( position => {
            console.log("chamando o watchPosition");
            const { latitude, longitude } = position.coords;
            this.setState({
                latitude: latitude,
                longitude: longitude
            });
            this.hasUserLocationChanged();
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });

        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: true
        });

        await this.carregarMarkers();
        await this.carregarAnimais();
        /*
        navigator.geolocation.getCurrentPosition(
            ( { coords: {latitude, longitude} } )  => this.setState({latitude: latitude, longitude: longitude}),
            (error) => console.log('Error:', error)
        )
        */
    }

    async hasUserLocationChanged () {
        const { markers, latitude, longitude } = this.state;
        let distances = [],
            distance,
            indiceMarcadorProximo;

        //Pegar distancias
        markers.forEach(function(marker, i) {
            distances[i] = getDistance( {latitude, longitude}, marker.latlng, 1)
        });
        //Achar menor distancia
        distance = Math.min(...distances);

        //Pegar indice onde o valor é o menor
        indiceMarcadorProximo = distances.findIndex((element) => element === distance)
        console.log('distancia mais proxima ' + distance);

        //mostrar marcardor desse indice
        // if (distance < 30)
        //     await this.prepareAlertSound(markers[indiceMarcadorProximo]);
    };

    async prepareAlertSound (marker){
        // const { playing } = this.state;
        
        // let trackName = marker.description.toString();

        // const statusSound = {
        //     shouldPlay: false
        // };
        // console.log('preparealertsound')
        // //sound.setVolumeAsync(1.0);
        // await sound.unloadAsync();

        // switch (trackName) {
        //     case 'alagamento':
        //         await sound.loadAsync(require('./../../tracks/alagamento.mp3'), statusSound, false);
        //     break;
        //     case 'buraco':
        //         await sound.loadAsync(require('./../../tracks/buraco.mp3'), statusSound, false);
        //     break;
        //     case 'calcadaBuracos':
        //         await sound.loadAsync(require('./../../tracks/calcadaBuracos.mp3'), statusSound, false);
        //     break;
        //     case 'obra':
        //         await sound.loadAsync(require('./../../tracks/obra.mp3'), statusSound, false);
        //     break;
        //     case 'obstaculoCalcada':
        //         await sound.loadAsync(require('./../../tracks/obstaculoCalcada.mp3'), statusSound, false);
        //     break;
        //     default:
        //     break;
        // };

        // this.setState({ playing: false });

        // this.playAlertSound();
        /*
        setTimeout(() => {
            sound.unloadAsync();   
        }, 7000);
        */
    };

    async playAlertSound (){
        const { playing } = this.state;
        console.log('playalertasound');
        try {
            if (playing) {
                await sound.pauseAsync();
                this.setState({ playing: false });
            } 
            else {
                await sound.playAsync();
            }
        } catch (error) {
            console.log(error);
        }
    };

    async saveMarker() { //fazer stringify de cada marker separadamente ao passar no for
        let {markers} = this.state;

        if(markersQuantidadeAtual === undefined) //necessario quando excluem todos os markers
            markersQuantidadeAtual = 0


        console.log('salvar: ', markers[markers.length - 1]) // ultimo marker

        let markerToSave = markers[markers.length - 1];

        let latitude = markerToSave.latlng.latitude,
            longitude = markerToSave.latlng.longitude,
            street = markerToSave.title,
            fk_id_animal = markerToSave.animal.key,
            fk_id_user = USUARIO.id_user;

            api.post('marker', {
                latitude,
                longitude, 
                street, 
                fk_id_animal,
                fk_id_user 
            }).then((res) => {
                this.carregarMarkers();
                // markerToSave.id = res.data.id_marker
                // markers[markers.length - 1] = markerToSave;
                // this.setState()
                // console.log(markers[markers.length - 1])
                // markers[markers.length - 1] = markerToSave;
                // this.setState({ markers: markers })
                alert('Salvou o marker');
            }).catch(() => {
                alert('Erro ao salvar marker');
            });
        
        //this.saveMarker(JSON.stringify(markers[markers.length - 1]));
    };  

    refreshMap (idMarkerExcluido) {
        const markersAntes = this.state.markers;
        console.log('refresh ', idMarkerExcluido)
        console.log('ANTES')
        console.log('-=-=-=-=-=-=-=-')
        markersAntes.map((oMarker) => {
            console.log(oMarker.id);
        });
        console.log('-=-=-=-=-=-=-=-')

        const markers = this.state.markers.filter(marker => marker.id !== idMarkerExcluido);
        
        console.log('DEPOIS')
        console.log('-=-=-=-=-=-=-=-')
        markers.map((oMarker) => {
            console.log(oMarker.id);
        });
        console.log('-=-=-=-=-=-=-=-')
        this.setState({ markers: markers });
    };

    async carregarMarkers () {
        const response = await api.get('marker');
        let objMarker = response.data;
        console.log(objMarker)

        this.setState({markers: [
                {
                    id: null,
                    latlng: {
                        latitude: 0,
                        longitude: 0,
                    },
                    title: null,
                    user: {
                        id_user: null,
                        name: null,
                        email: null,
                        cellphone: null
                    },
                    animal: {
                        id_animal: null,
                        name: null,
                        specie: null,
                        race: null,
                        size: null,
                        description: null,
                        picture: null
                    }
                }
            ]
        })

        for (let i=0; i<response.data.length; i++) {
            objMarker = response.data[i];
            console.log(objMarker);
            this.setState({ 
                    markers: [...this.state.markers, 
                        { 
                            id: objMarker.id_marker,
                            id_user: objMarker.fk_id_user,
                            latlng: {
                                latitude: parseFloat(objMarker.latitude),
                                longitude: parseFloat(objMarker.longitude)
                            }, 
                            title: objMarker.street,
                            user: {
                                id_user: objMarker.user.id_user,
                                name: objMarker.user.name,
                                email: objMarker.user.email,
                                cellphone: objMarker.user.cellphone
                            },
                            animal: {
                                id_animal: objMarker.animal.id_animal,
                                name: objMarker.animal.name,
                                specie: objMarker.animal.specie,
                                race: objMarker.animal.race,
                                size: objMarker.animal.size,
                                description: objMarker.animal.description,
                                picture: objMarker.animal.picture
                            }
                        }
                    ] 
                })
            markersQuantidadeAtual = this.state.markers.length;
            //mostra quantidade de marcadores ao iniciar a aplicação 
        }
    };

    async carregarAnimais() {
        id_user = USUARIO.id_user;
        const response = await api.post('getMyAnimals', { id_user })
        const myAnimalOutDated = this.state.myAnimals;

        this.state.myAnimals = [];
        this.state.myAnimalsDropDown = [];
        for (let i=0; i<response.data.length; i++) {
            let oAnimal = response.data[i];
            
            this.setState({ 
                myAnimals: [...this.state.myAnimals, 
                    {
                        key: oAnimal.id_animal,
                        id_animal: oAnimal.id_animal,
                        specie: oAnimal.specie,
                        name: oAnimal.name,
                        race:  oAnimal.race,
                        size: oAnimal.size,
                        picture: oAnimal.picture,
                        description: oAnimal.description,
                        isPerdido: oAnimal.isPerdido,
                        fk_id_user: oAnimal.fk_id_user,
                        fk_id_marker: oAnimal.fk_id_marker,
                        created_at: oAnimal.created_at,
                        updated_at: oAnimal.updated_at
                    }
                ],
                myAnimalsDropDown: [...this.state.myAnimalsDropDown,
                    {
                        label: `${oAnimal.name} (${oAnimal.specie})`,
                        value: oAnimal.id_animal,
                        id: oAnimal.id_animal,
                    }
                ]
            })
        }
    }

    findAnimal (animalId) {
        const myAnimals = this.state.myAnimals;
        return myAnimals.find( animal => animal.key === animalId);
    }

    async deletarMarker (idMarker) {
        let id = idMarker;

        api.delete('deleteMarker/' + idMarker)
            .then(this.refreshMap(id))
            .catch((err) => {
                alert('Erro ao deletar marker:' + err);
            });
        
        this.setState({modalInfo: false})
    };

    setMarkerSelecionado(oMarker){
        this.setState({ markerSelecionado: oMarker });
    }

    renderModalNewMarker(){
        const animalSelecionado = this.state.animalSelecionado;

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modal}>
                <View>
                    <DropDownPicker
                        items={this.state.myAnimalsDropDown}
                        placeholder={'  Selecionar Animal'}
                        containerStyle={{height: 40}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{justifyContent: 'flex-start'}}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={animalSelecionado => this.setState({
                            animalSelecionado: this.findAnimal(animalSelecionado.id)
                        })} />
                    { !animalSelecionado.picture &&
                     <View style={{marginTop: 30}}>
                        <ImageBackground 
                            source={images.pata}
                            style={{height: 300}}>
                        </ImageBackground>
                    </View>    
                    }
                    { animalSelecionado.picture && 
                    <View style={{marginTop: 30}}>
                        <ImageBackground 
                            source={{uri: animalSelecionado.picture}}
                            style={{height: 300, borderRadius: 20, overflow: 'hidden'}}>
                        </ImageBackground>
                    </View>
                    }
                    <View style={stylesIn.buttonsContainer}>   
                        <TouchableOpacity 
                            style={[stylesIn.buttonContainer]}
                            onPress={() => this.setState({modal: false})} >
                            <Text>Fechar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[stylesIn.buttonContainer]}
                            onPress={() => this.setState({
                                modal: false,
                                markers: [...this.state.markers, 
                                    { 
                                        latlng: this.state.latitudeLongitudeTemp, 
                                        title: streetName,
                                        animal: this.state.animalSelecionado,
                                    }
                                ] 
                            }, this.saveMarker)} >
                            <Text>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    renderModalInfo(){
        const markerSelecionado = this.state.markerSelecionado;

        console.log(markerSelecionado)
        if(!markerSelecionado)
            return 
        
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalInfo}>
                <ScrollView>
                    { !markerSelecionado.animal.picture &&
                    <ImageBackground 
                        source={images.pata}
                        style={{height: 300}}>
                    </ImageBackground>
                    }
                    { markerSelecionado.animal.picture && 
                    <View style={{marginTop: 30}}>
                        <ImageBackground 
                            source={{uri: markerSelecionado.animal.picture}}
                            style={{height: 300, borderRadius: 20, overflow: 'hidden'}}>
                        </ImageBackground>
                    </View>
                    }
                    
                    <View style={[stylesIn.outterContainer, {backgroundColor: "#4caf50"}]}>
                        <Text style={stylesIn.title}>Animal</Text>
                    
                        <View>
                            <View style={[stylesIn.innerContainer, {backgroundColor: "#80e27e"}]}>
                                <Text style={stylesIn.text}>Nome: {markerSelecionado.animal.name}</Text>
                                <Text style={stylesIn.text}>Espécie: {markerSelecionado.animal.specie}</Text>
                                <Text style={stylesIn.text}>Raça: {markerSelecionado.animal.race}</Text>
                                <Text style={stylesIn.text}>Tamanho: {markerSelecionado.animal.size}</Text>
                                <Text style={stylesIn.text}>Descrição:</Text>
                                <Text style={{marginHorizontal: 20, fontSize: 15}}>{markerSelecionado.animal.description}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[stylesIn.outterContainer, {backgroundColor: '#00b0ff'}]}>
                        <Text style={stylesIn.title}>Contato dono</Text>
                    
                        <View style={[stylesIn.innerContainer, {backgroundColor: "#0081cb"}]}>
                            <Text style={stylesIn.text}>Nome: {markerSelecionado.user.name}</Text>
                            <Text style={stylesIn.text}>Celular: {markerSelecionado.user.cellphone}</Text>
                            <Text style={stylesIn.text}>E-mail: {markerSelecionado.user.email}</Text>
                            {/* <Text>{markerSelecionado.user.id_user === USUARIO.id_user ? 'true' : 'false'}</Text> */}
                        </View>
                    </View>
                    <View style={stylesIn.buttonsContainer}>   
                        <TouchableOpacity 
                            style={[stylesIn.buttonContainer]}
                            onPress={() => this.setState({modalInfo: false})}>
                            <Text>Fechar</Text>
                        </TouchableOpacity>

                        { (markerSelecionado.user.id_user === USUARIO.id_user ? true : false) &&
                        <TouchableOpacity
                            onPress= {() => {
                                Alert.alert(
                                //title
                                'Remover marker',
                                //body
                                'Tem certeza que deseja excluir este marker?',
                                [
                                    {text: 'Sim', onPress: () => this.deletarMarker(markerSelecionado.id)},
                                    {text: 'Não', onPress: () => console.log('No Pressed')}
                                ],
                                { cancelable: true }
                                )
                            }}>
                            <Ionicons
                                name='trash'
                                size={32}
                                color='red'>
                            </Ionicons>
                        </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
            </Modal> 
        )
    }

    getPinColor(marker){
        if(marker.user)
            return marker.user.id_user === USUARIO.id_user ? 'red' : '#673ab7'

        return 'red';
    }

    isUsuarioDono(marker){
        if(marker.user)
            return marker.user.id_user === USUARIO.id_user ? true : false;
    }

    render () {
        const {latitude, longitude, latitudeDelta, longitudeDelta} = this.state; //localização do usuário
        if (latitude) {
            return(
                <View style={styles.container}>  
                    <MapView
                        showsUserLocation={true}
                        initialRegion={{
                            latitude,
                            longitude,
                            latitudeDelta,
                            longitudeDelta
                        }}
                        showsBuildings={true}
                        showsTraffic={true}
                        style={{flex:1, height:'100%', width:'100%'}}
                        onLongPress={
                            (e, i=1) => this.setState(
                                { 
                                    modal: true,
                                    latitudeLongitudeTemp: e.nativeEvent.coordinate,
                                    
                                }, ()=>{this.getLocalizationData(); this.carregarAnimais()}
                            )
                        }>               
                    {
                        this.state.markers.map((marker, i) => (
                            <MapView.Marker 
                                key={i} 
                                coordinate={marker.latlng} 
                                pinColor={this.getPinColor(marker)}>
                                <Callout
                                    onPress={() => this.setState({ modalInfo: true, markerSelecionado: marker })} >
                                    <View>
                                        <Text>{marker.animal.name}</Text>
                                        <Text>{marker.animal.specie}</Text>
                                        { !this.isUsuarioDono(marker) &&
                                            <Text style={{fontSize:10, color:'grey'}}>Mais Informações...</Text>
                                        }
                                        { this.isUsuarioDono(marker) &&
                                            <Text style={{fontSize:10, color:'grey'}}>Editar...</Text>
                                        }
                                    </View>
                                    
                                </Callout>
                            </MapView.Marker>
                            )
                        )
                    }
                        {/* <View>
                            <Ionicons name="refresh-circle-sharp" size={32}/>
                        </View> */}
                        
                    </MapView>

                    {this.renderModalNewMarker()}
                    {this.renderModalInfo()}
                                    
                </View>
            );
        }
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <MaterialIcons   
                    name="hourglass-empty"
                    size={32}/>
            </View>
        )
    }
}

const stylesIn = StyleSheet.create({
    outterContainer:{
        marginTop:10,
        marginBottom:5,
        borderRadius: 15,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
    },
    innerContainer:{
        marginTop:3,
        marginBottom:3,
        borderRadius: 5,
        padding: 16,
    },
    buttonsContainer: {
        flexDirection:'row', 
        justifyContent:'space-between',
        padding: 16,
    },
    buttonContainer: {
        backgroundColor: "rgba(0,229,255,1)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
        minWidth: 88,
        paddingLeft: 16,
        paddingRight: 16,
        height: 36,
        width: 100,
    },
    title:{
        // marginTop: 10,
        // borderBottomWidth:1, 
        // borderColor:"rgba(94,53,177,1)",
        fontSize: 40,
    },
    addButton:{
        marginTop:10
    },
    text: {
        fontSize: 20,
    }
});