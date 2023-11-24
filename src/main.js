import { createApp } from 'vue';
import App from './App.vue';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// import 'vuetify/styles';
// import { createVuetify } from 'vuetify';
// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';

// Library Bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const firebaseConfig = {
    apiKey: "AIzaSyCHsuv_lGc-5wPeLF-NHR1euZZpXn8MxFM",
    authDomain: "testing-ac82a.firebaseapp.com",
    projectId: "testing-ac82a",
    storageBucket: "testing-ac82a.appspot.com",
    messagingSenderId: "840275921246",
    appId: "1:840275921246:web:af22c77f0b4d388feba7cf",
    measurementId: "G-NKQT259BJH"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

// const vuetify = createVuetify({
//     components,
//     directives,
// })

// createApp(App).use(vuetify).mount('#app');
createApp(App).mount('#app');