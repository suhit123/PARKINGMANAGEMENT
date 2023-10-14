import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { retrieveToken } from '../utils/token';
import { useFocusEffect } from '@react-navigation/native';
const Signup = (props) => {
  const [licenseId, setLicenseId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
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
  const handleSignup = async() => {
    if (password !== confirmPassword) {
      setPasswordError('⚠ Passwords do not match');
      return;
    }
    // Implement your signup logic here
    const userData = {
        Name:name,
        Email:email,
        License:licenseId,
        Phonenumber:phoneNumber,
        Password:password,
      };
  
     await axios
        .post('http://192.168.146.239:8080/createaccount', userData)
        .then((response) => {
          console.log('Signup successful:', response.data);
        })
        .catch((error) => {
          console.error('Signup Error:', error);
        });
     props.navigation.navigate("Login")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signup}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
       <TextInput
        style={styles.input}
        placeholder="Driving License ID"
        value={licenseId}
        onChangeText={(text) => setLicenseId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={!passwordVisible}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.togglePasswordButton}
        onPress={togglePasswordVisibility}
      >
        <Text style={styles.togglePasswordText}>
          {passwordVisible ? 'Hide Password' : 'Show Password'}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={!passwordVisible}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.accountSignup}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.signupButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signup: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
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
  button: {
    backgroundColor: '#0995d6',
    padding: 10,
    borderRadius: 5,
  },
  signupButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },accountSignup: {
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
  },errorText: {
    color: 'darkred',
    fontSize: 14,
    marginBottom: 10,
  },

  togglePasswordButton: {
    marginTop: 10,
    marginBottom:10,
  },

  togglePasswordText: {
    color: '#0995d6',
    fontSize: 14,
  },
});

export default Signup;
