<template>
  <div id="app" :class="{ app: !isIndex }">
    <!-- Если мы не на главной страничке, то показываем эту шапку -->
    <header v-if="!isIndex">
      <div>
        <router-link to="/upload" class="btn--main">Загрузить фото</router-link>
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
        <router-link to="/login" class="btn--main">
          <span>Войти</span>
          <span class="btn__append">
            <img src="../public/img/icons/Icon - Perm Identity - Outlined.svg" alt="Identity">
          </span>
        </router-link>
      </div>
    </header>
    <!-- Если мы на главной страничке, то показываем эту шапку -->
    <header class="header--index" v-else>
      <div class="logo">
        <img src="../public/img/Logo.svg" alt="logo">
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
        <router-link to="/login" class="btn--main">
          <span>Войти</span>
          <img src="../public/img/icons/Icon - Perm Identity - Outlined.svg" alt="Identity">
        </router-link>
      </div>
    </header>
    <!-- Наш контент -->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
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
        isIndex: true,
        login: false,
        username: "",
      }
    },
    beforeCreate() {

      // ===========Проверка Авторизации===========
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
    beforeMount() {
      let layout = this.$route.meta.layout || 'default-layout';
      
      if (layout != 'index') {
        this.isIndex = false;
      } else {
        this.isIndex = true;
      }
    },
    beforeUpdate() {
      let layout = this.$route.meta.layout || 'default-layout';
      
      if (layout != 'index') {
        this.isIndex = false;
      } else {
        this.isIndex = true;
      }
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
<style>

.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.fade-enter {
  transform: translateX(100px);
  opacity: 0;
}

.fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}

.app {
  display: grid;
  grid-template-rows: 10% 90%;
}

.header--index {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header--index .btn--main {
  /*min-width: 160px;*/
  min-height: 55px;
  align-items: center;
  background-color: transparent;
  border: 2px solid #fff;
}

.header--index .btn--main span {
  margin-right: 10px;
}

.logo img {
  width: 75%;
}

</style>
