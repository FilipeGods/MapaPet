import React, { Component, useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera'


function CameraComponent(props) {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const camRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [picture, setPicture] = useState();
    const [wasPictureTaken, setWasPictureTaken] = useState(false);
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
          setWasPictureTaken(true);
          const data = await camRef.current.takePictureAsync();
          setPicture(data.uri);
          console.log(picture);
        }
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
              onPress={takePicture}>
              { !wasPictureTaken &&
                <MaterialIcons   
                    name="camera-alt"
                    size={32}/>
              }
              { wasPictureTaken &&
                <MaterialIcons   
                    name="hourglass-empty"
                    size={32}/>
              }
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={false}
              visible={wasPictureTaken}
              onRequestClose={() => setWasPictureTaken(false)}>

              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Image
                    style={{width:'100%', height:300, borderRadius:20}}
                    source={{ uri: picture }}
                />     
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
        }
    });

export default CameraComponent;
