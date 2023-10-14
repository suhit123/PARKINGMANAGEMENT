import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Axios from 'axios';
import { retrieveToken, storeToken } from '../utils/token';
import { useFocusEffect } from '@react-navigation/native';
const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  useFocusEffect(
    React.useCallback(()=>{
    const fetchToken=async()=>{
      const token=await retrieveToken()
      if(token){
        props.navigation.navigate('Home')
      }
    }
  fetchToken()
  },[]))
  const handleLogin = async() => {
    try {
      const response = await Axios.post('http://192.168.146.239:8080/login', {
        Email: email,
        Password: password,
      });

      if (response.data.token) {
        storeToken(response.data.token)
        console.log('Received Token:', response.data.token);
        props.navigation.navigate('Home')
      } else {
        console.log('No token received');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
  };

  return (
    <View  style={styles.container}>
    <Text style={styles.Login}>Login</Text>
    <Text style={styles.request}>Please sign in to continue</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showPasswordText}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.accountSignup}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={()=>props.navigation.navigate("Signup")}>
          <Text style={styles.signupButton}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Login:{
    fontSize:30,
    fontWeight:'bold',
    marginTop:10,
    marginBottom:40,
  },
  request:{
    marginBottom:20,
    color:'grey'
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  showPasswordText: {
    fontSize: 14,
    color: 'grey',
    marginLeft: 10,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#0995d6',
    textAlign: 'center',
    margin:10
  },
  button:{
    backgroundColor:'#0995d6',
    padding:10,
    borderRadius:5,
  },
  submitButtonText:{
    color:'white',
    textAlign:'center',
    fontSize:15,
    fontWeight:'bold'
  },
  accountSignup: {
    position:'absolute',
    bottom:20,
    left:'30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    fontSize: 14,
    color: 'grey',
  },
  signupButton: {
    fontSize: 14,
    color: '#0995d6',
    marginLeft: 5,
  },
});

export default Login;
