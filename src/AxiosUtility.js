import axiosBase from 'axios';
import * as firebase from 'firebase';
import Constants from './Constants';

export const generateUUID = () => {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

const getIdToken = async () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        resolve(firebase.auth().currentUser.getIdToken());
      } else {
        console.log('User logged out');
      }
    });
  });
};

export const postAxios = async (queryString, variables) => {
  const idToken = await getIdToken();

  const axios = axiosBase.create({
    baseURL: Constants.hasuraUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + idToken
    },
    responseType: 'json',
    method: 'post'
  });
  console.log(variables);
  return await axios({
    data: {
      query: queryString,
      variables: variables
    }
  }).catch(({ response: r }) => console.log(r));
};
