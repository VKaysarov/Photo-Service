<template>
  <div id="app">
    <header>
      <div>
        <button><router-link to="/">Загрузить фото</router-link></button>
      </div>
      <input type="search" placeholder="Поиск...">
      <div>
        <button><router-link to="/login">Войти</router-link></button>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: 5% 95%;
  height: 100vh;
}
</style>
