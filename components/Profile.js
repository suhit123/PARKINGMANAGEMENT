import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { deleteToken, retrieveToken } from '../utils/token';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the desired icon library

const Profile = (props) => {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const fetch = async () => {
        const fetchedToken = await retrieveToken();
        if (fetchedToken) {
          setToken(fetchedToken);
          await fetchData(fetchedToken);
        }
      };
      fetch();
    }, [])
  );
    useEffect(()=>{
        if(token!=='')
            fetchData(token)
    },[token])
  const fetchData = async (fetchedToken) => {
    try {
      console.log(fetchedToken);
      const response = await Axios.post('http://192.168.146.239:8080/userdetails', { token: fetchedToken });
      if (response.data) {
        console.log('Received data:', response.data);
        setUserData(response.data);
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error.response);
    }
  };

  const handleSignOut = () => {
    deleteToken();
    props.navigation.navigate('Login');
    console.log('User signed out.');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.images_con}>
          <View style={styles.images_view}/>
          <Image resizeMode="contain" style={styles.images__user} source={require('../assets/userprofile.png')} />
        </View>
        <View style={styles.text_con}>
          <Text style={styles.label}><Icon name="user" size={20} /> Name: {userData.Name}</Text>
          <Text style={styles.label}><Icon name="envelope" size={20} /> Email: {userData.Email}</Text>
          <Text style={styles.label}><Icon name="phone" size={20} /> Phone number: {userData.Phonenumber}</Text>
          <Text style={styles.label}><Icon name="drivers-license" size={20} /> License: {userData.License}</Text>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.signupButtonText}> <Icon name="sign-out" size={20} /> Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
    marginVertical: 10,
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
  },
  images_view: {
    width: 500,
    height:500,
    backgroundColor:'#0995d6',
    borderRadius:250,
    marginLeft: '-30%',
  },
  images_con: {
    marginTop: '-100%',
  },
  text_con: {
    marginTop: '-60%',
  },
  images__user: {
    width: '40%',
    marginLeft: '30%',
    marginTop: '-80%',
  },
});

export default Profile;
