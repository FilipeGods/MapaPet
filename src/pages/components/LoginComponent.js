import React, { Component, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
let USUARIO = require('../../services/globalUserController.json');

//componentes
import MaterialUnderlineTextbox from "./aux-components/LoginScreen/MaterialUnderlineTextbox"; // email input
import MaterialRightIconTextbox1 from "./aux-components/LoginScreen/MaterialRightIconTextbox1"; //passoword input
import MaterialButtonViolet from "./aux-components/LoginScreen/MaterialButtonViolet"; //logar button
import MaterialButtonWithVioletText1 from "./aux-components/LoginScreen/MaterialButtonWithVioletText1"; // cadastrar button

function LoginComponent(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    function funcaoTeste (){
        console.log(email)
        console.log(password)
    }

    async function handleLogin(e) {        
        console.log('chamei o login');
        console.log(email)
        console.log(password)
        api.post('userLogin', {
            email,
            password
        }).then((res) => {
            console.log('login sendo realizado')
            //res.data[0].id_user
            USUARIO.id_user = res.data[0].id_user;
            navigation.navigate('menuPrincipal');
        }).catch((err) => {
            alert(err);
        });
        };

    return (
        <View style={[styles.container, props.style]}>
        <View style={styles.rect}>
            <MaterialUnderlineTextbox
                onChangeText={(email) => setEmail(email)}
                value={email}
                inputStyle="Placeholder"
                inputStyle="Email"
                style={styles.materialUnderlineTextbox}
            ></MaterialUnderlineTextbox>
            <MaterialRightIconTextbox1
                onChangeText={(password) => setPassword(password)}
                value={password}
                inputStyle="password"
                inputStyle="Senha"
                style={styles.materialRightIconTextbox1}
            ></MaterialRightIconTextbox1>
            <View style={styles.materialButtonVioletRow}>
            <MaterialButtonViolet
                caption="BUTTON"
                caption="Logar"
                onPress={handleLogin}
                style={styles.materialButtonViolet}
            ></MaterialButtonViolet>
            <MaterialButtonWithVioletText1
                caption="BUTTON"
                caption="Cadastrar-se"
                onPress={() => navigation.navigate('cadastro')}
                style={styles.materialButtonWithVioletText1}
            ></MaterialButtonWithVioletText1>
            </View>
        </View>
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

export default LoginComponent;
