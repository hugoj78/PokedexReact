import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {incrementToken} from '../../actions/token';
import {incrementUser} from '../../actions/user';
import {useTheme} from '@react-navigation/native';

const Login = ({navigation}) => {
  const [formState, setFormState] = useState({username: '', password: ''});
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {colors} = useTheme();

  const dispatch = useDispatch();

  const onPress = () => {
    if (formState.username.length === 0) {
      setErrorMessage('the field username must be not empty');
      return;
    }
    if (formState.password.length < 5) {
      setErrorMessage('the field password must be more than 5 characters');
      return;
    }

    setIsLoading(true);

    axios({
      method: 'post',
      url: 'https://easy-login-api.herokuapp.com/users/login',
      data: {
        username: formState.username,
        password: formState.password,
      },
    })
      .then((res) => {
        dispatch(incrementToken(res.headers['x-access-token']));
        dispatch(incrementUser(formState.username));
        setIsLoading(false);
        navigation.push('Home');
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorMessage('Issues during login');
        return;
      });
  };

  return (
    <>
      {!isLoading ? (
        <>
          <View style={styles.container}>
            <ImageBackground
              accessibilityRole={'image'}
              source={require('./logo.png')}
              style={styles.background}
              imageStyle={styles.logo}
            />
            <Text style={{color: colors.text}}>Username :</Text>
            <TextInput
              style={[styles.input, {color: colors.text}]}
              onChangeText={(username) =>
                setFormState({...formState, username: username})
              }
              defaultValue={formState.username}
              placeholder="Username"
            />
            <Text style={{color: colors.text}}>Password :</Text>
            <TextInput
              style={[styles.input, {color: colors.text}]}
              autoCompleteType="password"
              secureTextEntry={true}
              onChangeText={(password) =>
                setFormState({...formState, password: password})
              }
              defaultValue={formState.password}
              placeholder="Password"
            />
            <Text>{errorMessage}</Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text>Log in</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#53B7D2" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
  },
  logo: {
    // opacity: 0.4,
    overflow: 'visible',
    resizeMode: 'cover',
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
  },
});

export default Login;
