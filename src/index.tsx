import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { showAlertOnNewVersion } from './serviceWorkerUpdate';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: 'AIzaSyBRvvxeJn8JVzohROXQYssnCWqktwUOEwU',
  authDomain: 'todolist-qap.firebaseapp.com',
  databaseURL: 'https://todolist-qap.firebaseio.com',
  projectId: 'todolist-qap',
  storageBucket: 'todolist-qap.appspot.com',
  messagingSenderId: '546975996683',
  appId: '1:546975996683:web:6fbc11354103cd0f5a200e',
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: (reg) => showAlertOnNewVersion(reg),
});
