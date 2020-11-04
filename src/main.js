import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase";

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyBhLVMov5G3aQUnbmWJ-gPrQdNpf6XLB3M",
	authDomain: "photoservice-784a3.firebaseapp.com",
	databaseURL: "https://photoservice-784a3.firebaseio.com",
	projectId: "photoservice-784a3",
	storageBucket: "photoservice-784a3.appspot.com",
	messagingSenderId: "485590729522",
	appId: "1:485590729522:web:508c9f4a077186c0b0cd2b",
	measurementId: "G-70B1FG1FPR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
	router: router,
	render: h => h(App),
}).$mount('#app')
