<template>
	<main>
		<div class="wrapper-form">
			<form action="#">
				<h1>Авторизация</h1>
				<div :class="{'has-error': email.error.status}">
					<label for="" class="label">Email</label>
					<div>
						<input type="email" placeholder="email@email.com" v-model="email.value">
						<!-- <img src="img/icons/email.svg"> -->
					</div>
					<div class="message">{{email.error.message}}</div>
				</div>
				<div :class="{'has-error': password.error.status}">
					<label for="" class="label">Пароль</label>
					<div>
						<input type="password" placeholder="••••••••" v-model="password.value">
						<img src="img/icons/Visibility - Filled.svg" class="input-icon">
					</div>
					<div class="message">{{password.error.message}}</div>
				</div>
				<div class="center">
					Нет аккаунта?<router-link to="/signup">Зарегистрироваться</router-link>
				</div>
				<div>
					<button @click.prevent="login">Авторизоваться</button>
				</div>
			</form>
		</div>
	</main>
</template>

<script>
	import firebase from "firebase/app"
	import "firebase/auth"

	export default {
        name: 'App',
		data() {
			return {
				email: {
					value: "",
					error: {
						status: false,
						message: "",
					}
				},
				password: {
					value: "",
					error: {
						status: false,
						message: "",
					}
				}
			}
		},
		methods: {
			login() {
				firebase.auth().signInWithEmailAndPassword(this.email.value, this.password.value)
				.catch((error) => {
					switch(error.code) {
						case "auth/user-not-found":
							this.email.error.status = true;
							this.email.error.message = "Такого пользователя не существует";
							break;
						case "auth/invalid-email":
							this.email.error.status = true;
							this.email.error.message = "Неверный формат почты";
							break;
						case "auth/wrong-password":
							this.password.error.status = true;
							this.password.error.message = "Неверный пароль";
							break;
					}
					console.log(error)
				});
				
				firebase.auth().onAuthStateChanged((user) => {
					if (user) {
						this.$router.push("/").catch(() => console.log("Dublicate redirect"))
					} else {
						console.log("Видимо ошибка")
					}
				});
				// ============================================
				// fetch("http://localhost/ps/api/signup", {
				// fetch("http://photoservice/api/login", {
				// // fetch("http://localhost/photoservice/web/users", {
				// 	method: "POST",
				// 	headers: {
				// 		"Accept": "application/json",
				// 		"Content-Type": "application/x-www-form-urlencoded",
				// 	},
				// 	body: `phone=${this.phone}&password=${this.password}`
				// }).then(function(response) {
				// 		return response.text();
				// 	})
			}
		}
	}
</script>