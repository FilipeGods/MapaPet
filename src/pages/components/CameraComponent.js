import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera'


function CameraComponent(props) {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);


    useEffect(() => {
        (async () =>{
            const {status} = await Permissions.askAsync(Permissions.CAMERA); // Permissão para o uso da camera
            setHasPermission(status === 'granted');
            console.log(status)
        })
    }, []);

    // if(hasPermission === null){ // o que mostrar na tela caso não tenha permissão
    //     return <View/>
    // }

    // if(hasPermission === false){ // o que mostrar na tela caso seja negado a permissão
    //     return <Text>Acesso Negado</Text>
    // }

    return (
        <View style={{flex:1}}>
            <Camera
                style={{flex:1}}
                type={type}
            />           
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
        materialUnderlineTextbox: {
            height: 43,
            width: 231,
            marginTop: 51,
            marginLeft: 32
        },
        materialRightIconTextbox1: {
            height: 66,
            width: 231,
            marginTop: 19,
            marginLeft: 30
        },
        materialButtonViolet: {
            height: 36,
            width: 116,
            backgroundColor: "rgba(0,229,255,1)"
        },
        materialButtonWithVioletText1: {
            height: 36,
            width: 100,
            marginLeft: 17
        },
        materialButtonVioletRow: {
            height: 36,
            flexDirection: "row",
            marginTop: 34,
            marginLeft: 30,
            marginRight: 31
        }
    });

export default CameraComponent;
