import React, {useState, useRef} from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Keyboard} from "react-native";
import api from './src/services/api';

export default function App(){

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setcepUser] = useState(null);

  function limpar(){
    setCep('');
    inputRef.current.focus();
    setcepUser(null);
  }

  async function buscar(){
    if (cep === '') {
      alert('Digite um cep valido');
      setCep('');
      return;
    }
    
    try {
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setcepUser(response.data);
      Keyboard.dismiss();
    } catch (error) {
      console.log('ERROR' + error);
    }

  }

  return(
    <SafeAreaView style={styles.container}>
    <View style={{alignItems: 'center'}}>
      <Text style={styles.text}>Digite o cep desejado</Text>
      <TextInput
      placeholder="Ex: 44700000"
      style={styles.input}
      value={cep}
      onChangeText={(texto) => setCep(texto)}
      keyboardType="numeric"
      ref={inputRef}
      />
    </View>

    <View style={styles.btnArea}>
      <TouchableOpacity style={[styles.btn, {backgroundColor: '#1d75cd'}]} onPress={buscar}>
        <Text style={styles.btnText}>Buscar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, {backgroundColor: '#cd3e1d'}]} onPress={limpar}>
        <Text style={styles.btnText}>Limpar</Text>
      </TouchableOpacity>
    </View>


    {cepUser &&

      <View style={styles.resultado}>
        <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
        <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
        <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
        <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
        <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
      </View>

    }


    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  btnArea: {
     flexDirection: 'row',
     alignItems: 'center',
     marginTop: 15,
     justifyContent: 'space-around',
  },
  btn: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 20,
    color: 'white'
  },
  resultado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 22,
  },
});