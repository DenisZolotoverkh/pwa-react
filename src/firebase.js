import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyBfPuyRJ32gtSj5lvHYjt_chwrjadUk1rY",
  projectId: "sinuous-set-407210",
  messagingSenderId: "668467659542",
  appId: "1:668467659542:web:0de7fcb70ac3a8f10c0637"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BLFT7MmM3DfAiCOOhb5lq3rM4ErjlJ9TLTaQKo4wfDvtJbYBRrGfrv5zZY2zo0-etUeRBRNAe-eu2gxEWvI23UY'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      return currentToken
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});