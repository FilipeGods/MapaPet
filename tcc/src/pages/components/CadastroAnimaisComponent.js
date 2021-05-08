import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
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
    const [showImageFile, setShowImageFile] = useState(false)

    const [name, setName] = useState('');
    const [specie, setSpecie] = useState('');
    const [specieRadioValue, setSpecieRadioValue] = useState('');
    const [race, setRace] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [isPerido, setIsperido] = useState('');
    //const [hasPermission, setHasPermission] = useState(null);

    const [isPictureTaken, setIsPictureTaken] = useState(false);
    const [picture, setPicture] = useState('');
    const [imageFile, setImageFile] = useState('');

    const navigation = useNavigation();

    React.useEffect(
      () => navigation.addListener('focus', () => {
          console.log('CadastroAnimaisComponent')  
          console.log('pictureContent: ',image)

          image = { uri: pictureContent };
          console.log('entrando...')
          // console.log('image: ',image) 
          if(USUARIO.lastPage === 'Camera'){
            setShowImage(true);
            setShowImageFile(false)
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
          setName('');
          setSpecie("");
          setSpecieRadioValue("");
          setRace("");
          setSize("");
          setDescription("");
          setShowImage(false);
          setShowImageFile(false);
      }),
      []
    );

    async function handleCreateAnimal(e) {
        if(name && specie) {
          if(showImage || showImageFile){
            registrarAnimal();
          } else {
            Alert.alert(
              'Foto', //título
              'Uma foto é essencial para a identificação do seu animal, ' + // mensagem
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
      let finalPicture;
      if(showImage){
        console.log('Enviar foto camera')
        finalPicture = pictureContent;
      } else if (showImageFile) {
        console.log('Enviar foto arquivo')
        finalPicture = imageFile;
      }

      api.post('animals', {
          name,
          specie,
          race,
          size,
          picture: finalPicture,
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

    async function handleUploadFile() {
      const {status} = await Permissions.askAsync(Permissions.CAMERA); // Permissão para o uso da camera
      console.log(status)
      const hasPermission = status === 'granted';

      if(hasPermission){
          let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
  
        if (!result.cancelled) {
          console.log(result.uri)
          setImageFile(result.uri)
          setShowImage(false)
          setShowImageFile(true)
        }
      }


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
    <View >
      <View style={styles.container}>
      { /* =======================NOME========================== */}  
        <View style={styles.containerInput}>
          <TextInput
            onChangeText={(name) => setName(name)}
            placeholder='Nome'
            style={styles.inputNome}
            secureTextEntry={false}
            required={true}
          ></TextInput>
        </View>
      { /* =======================NOME========================== */}  
      </View>

      <View>
      { /* =======================FOTO========================== */}
        <TouchableOpacity onPress={ () => {navigation.navigate('Camera')} }>
          { !showImage && !showImageFile &&
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
          { showImageFile && 
            <View style={{marginTop: 30}}>
              <ImageBackground 
                source={{ uri: imageFile }}
                style={{height: 300}}>
              </ImageBackground>
            </View>
          }
        </TouchableOpacity>
      { /* =======================FOTO========================== */}
      </View>

      <View style={styles.container}>
      { /* =======================ARQUIVO========================== */}
        <View style={{justifyContent:'center', alignItems:'center', marginTop:10}}>
            <MaterialButtonViolet1
              onPress={handleUploadFile}
              caption="Escolher foto Galeria"
              style={[styles.buttonCadastrar, {width: 200}]}
            ></MaterialButtonViolet1>
        </View>
      { /* =======================ARQUIVO========================== */}
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
        <View style={styles.containerInput}>
          <TextInput
            onChangeText={(race) => setRace(race)}
            placeholder='Raça'
            style={styles.inputNome}
            secureTextEntry={false}
            required={true}
          ></TextInput>
        </View>
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
  container: {
    paddingHorizontal:50
  },
  containerInput: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  inputNome: {
    color: "black",
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 16,
    paddingBottom: 8
  },
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
