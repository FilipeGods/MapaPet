import React, { Component, useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera'
let USUARIO = require('../../services/globalUserController.json');


function CameraComponent() {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const camRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [picture, setPicture] = useState();
    const [loadingIndicator, setLoadingIndicator] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);


    useEffect(() => {
      console.log('teste');
      async function getPermission() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA); // Permissão para o uso da camera
        setHasPermission(status === 'granted');
        console.log(status)
      }
      getPermission();
    }, []);

    async function takePicture () {
        if(camRef){
          setLoadingIndicator(true);
          setOpenModal(true);
          const data = await camRef.current.takePictureAsync();
          setLoadingIndicator(false);
          setPicture(data.uri);
        }
    } 

    function onConfirmPicture () {
      setLoadingIndicator(false);
      setOpenModal(false);
      USUARIO.lastPage = "Camera"
      navigation.navigate('CadastrarAnimal', {picture})
    }

    if(hasPermission === null){ // o que mostrar na tela caso não tenha permissão
        return <View/>
    }

    if(hasPermission === false){ // o que mostrar na tela caso seja negado a permissão
        return <Text>Acesso Negado</Text>
    }

    return (
        <View style={{flex:1}}>
            { isFocused &&
            <Camera
                style={{flex:1}}
                type={type}
                ref={camRef}>
            </Camera>
            }
            <TouchableOpacity 
              style={styles.takePictureButton}
              onPress={takePicture}
              disabled={loadingIndicator}>
              { !loadingIndicator &&
                <MaterialIcons   
                    name="camera-alt"
                    size={32}/>
              }
              { loadingIndicator &&
                <MaterialIcons   
                    name="hourglass-empty"
                    size={32}/>
              }
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={false}
              visible={openModal}
              onRequestClose={() => setOpenModal(false)}>

              <View style={{width:'100%', height:400, justifyContent:'center', alignItems:'center'}}>
                { !loadingIndicator &&
                  <View style={{}}>
                    <Image
                      style={{flex: 1, borderRadius:20}}
                      source={{ uri: picture }}/>
                    <View style={styles.viewModalButtons}>
                      <TouchableOpacity 
                        style={styles.modalConfirmButton}
                        onPress={onConfirmPicture}>
                        <MaterialIcons   
                          name="check"
                          size={32}/>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.modalCancelButton}
                        onPress={() => setOpenModal(false)}>
                        <MaterialIcons   
                          name="close"
                          size={32}/> 
                      </TouchableOpacity>
                    </View>  
                  </View> 
                }
                { loadingIndicator &&
                  <MaterialIcons   
                    name="hourglass-empty"
                    size={32}/>
                }
              </View> 
            </Modal>
        </View>
    );
    }

    const styles = StyleSheet.create({
        container: {},
        rect: {
            width: 294,
            height: 266,
            backgroundColor: "rgba(230,230, 230,0)"
        },
        takePictureButton: {
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'grey',
        },
        viewModalButtons:{
          paddingTop:50,
          width:'100%',
          justifyContent:'space-evenly',
          alignItems: 'center',
          flexDirection: 'row'
        },
        modalConfirmButton: {
          width:90,
          height:50,
          borderRadius: 10,
          backgroundColor: 'green',
          alignItems:'center',
          justifyContent:'center'
        },
        modalCancelButton: {
          width:90,
          height:50,
          borderRadius: 10,
          backgroundColor: 'red',
          alignItems:'center',
          justifyContent:'center'
        },
    });

export default CameraComponent;
