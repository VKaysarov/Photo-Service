<template>
	<main>
		<div class="wrapper-form">
			<form action="#">
				<h1>Регистрация</h1>
				<div :class="{'has-error': first_name.error.status}">
					<label for="" class="label">Имя</label>
					<input
						v-model="first_name.value"
						type="text"
						placeholder="Иван"
					>
				</div>
				<div :class="{'has-error': last_name.error.status}">
					<label for="" class="label">Фамилия</label>
					<input
						v-model="last_name.value"
						type="text"
						placeholder="Иванов">
				</div>
				<div :class="{'has-error': email.error.status}">
					<label for="" class="label">Email</label>
					<input
						v-model="email.value"
						type="email"
						placeholder="email@email.com">
					<div class="message">{{email.error.message}}</div>
				</div>
				<div :class="{'has-error': password.error.status}">
					<label class="label" for="password">Пароль</label>
					<div>
						<input
							id="password"
							v-model="password.value"
							type="password"
							placeholder="••••••••">
						<img src="img/icons/Visibility - Filled.svg" class="input-icon">
					</div>
					<div class="message">{{password.error.message}}</div>
				</div>
				<div>
					<input type="checkbox">
					<label>Нажимая зарегистрироваться вы принимаете <a href="#">пользовательское соглашение</a></label>
				</div>
				<div>
					<button @click.prevent="signup">Зарегистрироваться</button>
				</div>
			</form>
		</div>
	</main>
</template>

<script>
	import firebase from "firebase/app";
	import "firebase/database";

	export default {
        name: 'App',
		data() {
			return {
				first_name: {
					value: "",
					error: {
						status: false,
						message: "",
					}
				},
				last_name: {
					value: "",
					error: {
						status: false,
						message: "",
					}
				},
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
				},
			}
		},
		methods: {
			async signup() {
				try {
					// Регистрация
					await firebase.auth().createUserWithEmailAndPassword(this.email.value, this.password.value)
					this.email.error = {
						status: false,
						message: "",
					}
					this.password.error = {
						status: false,
						message: "",
					}
					// Добавление доп. данных в БД
					const UID = await this.getUid()
					await firebase.database().ref(`users/${UID}`).set({
						email: this.email.value,
						first_name: this.first_name.value,
						last_name: this.last_name.value,
					})
				} 
				catch(e) {
					// Обработка ошибок
					console.error(e);
					switch(e.code) {
						case "auth/invalid-email":
							this.email.error.message = "Неверный формат почты"
							this.email.error.status = true
							break;
						case "auth/email-already-in-use":
							this.email.error.message = "Эта почта уже используется"
							this.email.error.status = true
							break;
						case "auth/weak-password":
							this.password.error.message = "Пароль должен быть не менее 6 символов"
							this.password.error.status = true
							break;
					}
				}

			},
			getUid() {
				const USER = firebase.auth().currentUser;
				console.log(USER)
				return USER ? USER.uid : null;
			}
		},
	}
</script>
