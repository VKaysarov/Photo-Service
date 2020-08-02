<template>
	<main>
		<div>
			<form action="#">
				<div>
					<label for="">Телефон</label>
					<input type="tel" placeholder="+7 (900) 000 00-00" v-model="phone">
				</div>
				<div>
					<label for="">Пароль</label>
					<input type="password" placeholder="*****" v-model="password">
				</div>
				<button @click.prevent="login">Авторизоваться</button>
				<router-link to="/signup">Нет аккаунта?</router-link>
			</form>
		</div>
	</main>
</template>

<script>
	export default {
        name: 'App',
		data() {
			return {
				phone: "",
				password: ""
			}
		},
		methods: {
			login() {
				// fetch("http://localhost/ps/api/signup", {
				fetch("http://photoservice/api/login", {
				// fetch("http://localhost/photoservice/web/users", {
					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: `phone=${this.phone}&password=${this.password}`
				}).then(function(response) {
						return response.text();
					})
			}
		}
	}
</script>