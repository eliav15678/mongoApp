import React,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, Text, View,Alert} from 'react-native';
import { Button,TextInput,ActivityIndicator,MD2Colors  } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [token,setToken] = useState(null);

  const login = async() => {

    const login_url = 'http://10.70.1.159:3001/api/account/login';

    try {
      setIsLoading(true);
      const response = await fetch(login_url, {
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
          email : email,
          password : password
        })
      })
  
      const data = await response.json();
      if(data){
  
        if(data.status){
  
          //Alert.alert(data.token);
          AsyncStorage.setItem('token', JSON.stringify({
            token:data.token
          }));
  
        } else {
          setIsLoading(false);
          Alert.alert(data.message);
  
        }
  
      } else {
        setIsLoading(false);
        Alert.alert('no data for you');
      }

    } catch (error) {     
      Alert.alert(error);
    }

  }

  useEffect(() => {
    getProducts();
  },[]);


  const getProducts = async() => {
    const dataFromAsync = await AsyncStorage.getItem('token');
    if(dataFromAsync !== null){
      const value = JSON.parse(dataFromAsync);
      setToken(value.token);
      loadData();
    } else {
      Alert.alert('please login');
    }
  }


  const loadData = async() => {
    const products_url = 'http://10.70.1.159:3001/api/product/getCategories';
    try {
      const response = await fetch(products_url, {
        method:'GET',
        headers:{
          'Content-Type' : 'application/json',
          'authorization' : `bearer ${token}`
        }
      })

      const data = await response.json();

      if(data){
          if(data.status){
            console.log(data.message);
          } else {
            Alert.alert(data.message);
          }
      } else {
        Alert.alert('no data for you');
      }

    } catch (error) {
      Alert.alert(error);
    }
  }

  //console.log(token);

  return (
    <View style={styles.container}>

      <TextInput 
        keyboardType='email-address'
        placeholder='please enter your email'
        autoCapitalize='none'
        style={{width:'100%'}}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput 
        keyboardType='default'
        placeholder='please anter your password'
        secureTextEntry={true}
        style={{width:'100%'}}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      
      {
        isLoading ? (
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        ) : (
          <Button 
          onPress={login}
          icon="account" 
          mode='contained'
           style={{width:'100%' , marginTop:12}}>Login</Button>
        )
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
