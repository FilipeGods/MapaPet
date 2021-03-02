import React, { Component, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

//COMPONENTS
import MaterialUnderlineTextbox2 from "./aux-components/CadastroScreen/MaterialUnderlineTextbox2";
import MaterialButtonViolet1 from "./aux-components/CadastroScreen/MaterialButtonViolet1";
import MaterialButtonWithVioletText1 from "./aux-components/CadastroScreen/MaterialButtonWithVioletText1";

function CadastroComponent(props) {

    const [name, setName] = useState('');
    const [cellphone, setcellphone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    
    function funcaoTeste() {
      console.log('funcao chamada')
      console.log(name)
      console.log(cellphone)
      console.log(email)
      console.log(password)
    }

    async function handleCreateUser(e) {
        console.log('chamei o cadastro');
            api.post('users', {
                name,
                email,
                password
            }).then(() => {
                alert('Cadastro realizado com sucesso!');
            }).catch(() => {
                alert('Erro no cadastro');
            });
        }

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect}>
        <MaterialUnderlineTextbox2
          onChangeText={(name) => setName(name)}
          value={name}
          inputStyle="Placeholder"
          inputStyle="Nome"
          style={styles.inputNome}
        ></MaterialUnderlineTextbox2>
        <MaterialUnderlineTextbox2
          onChangeText={(cellphone) => setcellphone(cellphone)}
          value={cellphone}
          inputStyle="Placeholder"
          inputStyle="celular"
          style={styles.inputCelular}
        ></MaterialUnderlineTextbox2>
        <MaterialUnderlineTextbox2
          onChangeText={(email) => setEmail(email)}
          value={email}
          inputStyle="Placeholder"
          inputStyle="Email"
          style={styles.inputEmail}
        ></MaterialUnderlineTextbox2>
        <MaterialUnderlineTextbox2
          onChangeText={(password) => setPassword(password)}
          value={password}
          inputStyle="Placeholder"
          inputStyle="Senha"
          style={styles.inputSenha}
        ></MaterialUnderlineTextbox2>
        <View style={styles.buttonCadastrarRow}>
          <MaterialButtonViolet1
            onPress={funcaoTeste}
            caption="Cadastrar-se"
            style={styles.buttonCadastrar}
          ></MaterialButtonViolet1>
          <View style={styles.buttonCadastrarFiller}></View>
          <MaterialButtonWithVioletText1
            onPress={() => navigation.navigate('login')}
            caption="BUTTON"
            caption="Voltar"
            style={styles.buttonVoltar}
          ></MaterialButtonWithVioletText1>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect: {
    width: 302,
    height: 449,
    backgroundColor: "rgba(230,230, 230,0)"
  },
  inputNome: {
    height: 43,
    width: 248,
    marginTop: 38,
    marginLeft: 21
  },
  inputCelular: {
    height: 43,
    width: 248,
    marginTop: 37,
    marginLeft: 21
  },
  inputEmail: {
    height: 43,
    width: 248,
    marginTop: 37,
    marginLeft: 21
  },
  inputSenha: {
    height: 43,
    width: 248,
    marginTop: 37,
    marginLeft: 21
  },
  buttonCadastrar: {
    height: 36,
    width: 116,
    backgroundColor: "rgba(0,229,255,1)"
  },
  buttonCadastrarFiller: {
    flex: 1,
    flexDirection: "row"
  },
  buttonVoltar: {
    height: 36,
    width: 100,
    marginLeft: 33
  },
  buttonCadastrarRow: {
    height: 36,
    flexDirection: "row",
    marginTop: 37,
    marginLeft: 21,
    marginRight: 32
  }
});

export default CadastroComponent;
