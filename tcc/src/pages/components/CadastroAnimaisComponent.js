import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
let USUARIO = require('../../services/globalUserController.json'); 
import api from '../../services/api';

//COMPONENTS
import MaterialUnderlineTextbox2 from "./aux-components/CadastroScreen/MaterialUnderlineTextbox2";
import MaterialButtonViolet1 from "./aux-components/CadastroScreen/MaterialButtonViolet1";
import MaterialButtonWithVioletText1 from "./aux-components/CadastroScreen/MaterialButtonWithVioletText1";
import MaterialRightIconTextbox1 from "./aux-components/CadastroScreen/MaterialRightIconTextbox1"; 

let image;
let showImage;

function CadastroAnimaisComponent({ pictureContent, previusPage }, props) {
    
    
    image = pictureContent;
  
    const [showImage, setShowImage] = useState(false)

    React.useEffect(
      () => navigation.addListener('focus', () => {
          console.log('CadastroAnimaisComponent')  
          console.log('pictureContent: ',image)


          image = { uri: pictureContent };
          console.log('entrando...')
          // console.log('image: ',image) 
          if(USUARIO.lastPage === 'Camera'){
            setShowImage(true);
            console.log('showImage: ', showImage)
            console.log('registro anterior')  
          } else {
            image.uri = null;
            setShowImage(false);
            console.log('showImage: ', showImage)
            console.log('novo registro')
          }
            
      }),
      []
    );

    React.useEffect(
      () => navigation.addListener('blur', () => {
          console.log('saindo...')
          USUARIO.lastPage = "CadastrarAnimal"
          setName("");
          setSpecie("");
          setSpecieRadioValue("");
          setRace("");
          setSize("");
          setDescription("");
      }),
      []
    );

    const [name, setName] = useState('');
    const [specie, setSpecie] = useState('');
    const [specieRadioValue, setSpecieRadioValue] = useState('');
    const [race, setRace] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [isPerido, setIsperido] = useState('');

    const [isPictureTaken, setIsPictureTaken] = useState(false);
    const [picture, setPicture] = useState('');

    const navigation = useNavigation();
    
    function funcaoTeste() {
      console.log('funcao chamada')
      console.log(name)
      console.log(cellphone)
      console.log(email)
      console.log(password)
    }

    async function handleCreateAnimal(e) {
        if(name && specie) {
          if(showImage){
            registrarAnimal();
          } else {
            Alert.alert(
              'Foto', //título
              'Uma foto é essencial para a identificação do seu animal, ' + // mesnagem
              'se possível nos forneça uma.',
              [
                {
                  text: 'voltar'
                },
                {
                  text: 'Não é possível fornecer uma foto',
                  onPress: registrarAnimal
                }
              ]
            )
          }
        } else {
            alert('Preenchimento obrigatório: \n Nome e Espécie')
        }
     }
    function registrarAnimal(){
      let fk_id_user = USUARIO.id_user;
      api.post('animals', {
          name,
          specie,
          race,
          size,
          picture: pictureContent,
          description,
          fk_id_user
      })
      .then(() => {
        navigation.navigate('listaAnimais');
        alert('Cadastro realizado com sucesso!');
      }).catch(() => {
          alert('Erro no cadastro');
      });
    }


    function SpecieChange(value) {
        switch(value){
            case 'Cachorro': //caso cachorro especie será cachorro
                setSpecieRadioValue(value)
                setSpecie(value)
                break;
            case 'Gato': //caso gato especie será gato
                setSpecieRadioValue(value)
                setSpecie(value)
                break;
            case 'Outros': //caso outros especie será a informada no input mostrado
                setSpecieRadioValue(value)
                setSpecie('Outros')
                break;
        }
    }
    

  return (
    <View style={[styles.container, props.style]}>
      <View >
      { /* =======================NOME========================== */}  
        <MaterialUnderlineTextbox2
          onChangeText={(name) => setName(name)}
          value={name}
          inputStyle="Placeholder"
          inputStyle="Nome"
          style={styles.inputNome}
        ></MaterialUnderlineTextbox2>
      { /* =======================NOME========================== */}  
      { /* =======================FOTO========================== */}
      <TouchableOpacity onPress={ () => {navigation.navigate('Camera')} }>
        { !showImage &&
          <View style={{marginTop: 30, height: 300, backgroundColor:'grey', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{}}>
              <MaterialIcons   
                  name="camera-alt"
                  size={32}/>
            </View>
          </View>
        }
        { showImage && 
          <View style={{marginTop: 30}}>
            <ImageBackground 
              source={{ uri: pictureContent }}
              style={{height: 300}}>
            </ImageBackground>
          </View>
        }
      </TouchableOpacity>
      { /* =======================FOTO========================== */}
      { /* =======================ESPECIE========================== */}  
        <View style={styles.containerRadioButton}>
            <Text style={{fontSize: 18, }}>Espécie:</Text>
            <RadioButton.Group onValueChange={value => SpecieChange(value)} value={specieRadioValue}>
                <RadioButton.Item 
                    label="Cachorro" 
                    labelStyle= {{fontSize:16}}
                    value="Cachorro" 
                />
                <RadioButton.Item 
                    label="Gato" 
                    labelStyle= {{}}
                    value="Gato" 
                />
                <RadioButton.Item 
                    label="Outros" 
                    labelStyle= {{}}
                    value="Outros"
                />
            </RadioButton.Group>
          </View>
        { specieRadioValue === 'Outros' &&
            <MaterialUnderlineTextbox2
                onChangeText={(specie) => setSpecie(specie)}
                value={specie}
                inputStyle="Placeholder"
                inputStyle="Outros"
                style={styles.inputOutros}
            ></MaterialUnderlineTextbox2>
        }
        { /* =======================ESPECIE========================== */}
        { /* =======================RACA========================== */}
        <MaterialUnderlineTextbox2
          onChangeText={(race) => setRace(race)}
          value={race}
          inputStyle="Placeholder"
          inputStyle="Raça"
          style={styles.inputNome}
        ></MaterialUnderlineTextbox2>
        { /* =======================RACA========================== */}
        { /* =======================SIZE========================== */}
        <View style={styles.containerRadioButton}>
            <Text style={{fontSize: 18, }}>Tamanho:</Text>
            <RadioButton.Group onValueChange={value => setSize(value)} value={size}>
                <RadioButton.Item 
                    label="Grande" 
                    labelStyle= {{fontSize:16}}
                    value="Grande" 
                />
                <RadioButton.Item 
                    label="Médio" 
                    labelStyle= {{}}
                    value="Medio" 
                />
                <RadioButton.Item 
                    label="Pequeno" 
                    labelStyle= {{}}
                    value="Pequeno"
                />
            </RadioButton.Group>
        </View>
        { /* =======================SIZE========================== */}
        { /* =======================DESCRICAO========================== */}
        <View style={styles.viewDescription}>
          <TextInput
              onChangeText={(description) => setDescription(description)}
              value={description}
              multiline={true}
              numberOfLines={6}
              maxLength={255}
              placeholder="Descrição"
              style={styles.inputDescription}
          ></TextInput>
        </View>
        { /* =======================DESCRICAO========================== */}
        <View style={styles.buttonCadastrarRow}>
          <MaterialButtonViolet1
            onPress={handleCreateAnimal}
            caption="Cadastrar"
            style={styles.buttonCadastrar}
          ></MaterialButtonViolet1>
          <View style={styles.buttonCadastrarFiller}></View>
          <MaterialButtonWithVioletText1
            onPress={() => navigation.navigate('listaAnimais')}
            caption="BUTTON"
            caption="Voltar"
            style={styles.buttonVoltar}
          ></MaterialButtonWithVioletText1>
        </View>
        <View style={{marginBottom: 90}}></View>
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
  inputOutros: {
    height: 43,
    width: 248,
    marginTop: -10,
  },
  containerRadioButton:{
      marginTop: 30
  },
  viewDescription:{
    borderColor: '#D9D5DC',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  inputDescription:{
    textAlignVertical: "top",
    color: "black",
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 10,
    paddingLeft: 10,
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

export default CadastroAnimaisComponent;
