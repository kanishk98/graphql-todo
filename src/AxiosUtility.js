import axiosBase from 'axios';
import * as firebase from 'firebase';
import Constants from './Constants';

const getIdToken = async () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        resolve(firebase.auth().currentUser.getIdToken());
      } else {
        reject(Error('user logged out'));
      }
    });
  });
};

export const postAxios = async queryString => {
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

  return await axios({
    data: {
      query: queryString
    }
  }).catch(({ response: r }) => console.log(r));
};
