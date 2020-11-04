<template>
  <div id="app">
    <header>
      <div>
        <router-link to="/" class="btn--main">Загрузить фото</router-link>
      </div>
      <div class="wrapper-search">
        <input type="search" placeholder="Поиск...">
        <img src="img/icons/Search - Filled.svg" alt="search-icon">
      </div>
      <div v-if="login">
        <button class="btn--main">
          <span>{{username}}</span>
          <span class="btn__append"><img src="img/icons/ios-arrow-down.svg" alt="arrow-down"></span>
        </button>
        <ul class="dropdown">
          <li><router-link to="/items">Изображения</router-link></li>
          <!-- <li><router-link to=""></router-link></li> -->
          <li @click="signout"><a href="#">Выйти</a></li>
        </ul>
      </div>
      <div v-else>
        <router-link to="/login" class="btn--main">Войти</router-link>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import 'firebase/database';

  export default {
    name: 'App',
    data() {
      return {
        login: false,
        username: ""
      }
    },
    beforeCreate() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.login = true
          const {currentUser} = firebase.auth()
          let userUid = currentUser.uid
          // let userId = firebase.auth().currentUser.uid;
          firebase.database().ref('/users/' + userUid).once('value').then((snapshot) => {
            let first_name = (snapshot.val() && snapshot.val().first_name) || 'Anonymous';
            let last_name = (snapshot.val() && snapshot.val().last_name) || 'Anonymous';
            this.username = `${first_name} ${last_name}`
          });
        } else {
          this.login = false
        }
      });
    },
    methods: {
      signout() {
        firebase.auth().signOut().then(function() {
          console.log("Sign-out successful.")
        }).catch(function(error) {
          console.log(error)
        });
      }
    }
  }

</script>