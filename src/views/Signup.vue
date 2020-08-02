<template>
	<main>
		<div>
			<form action="#">
				<div>
					<label for="">Имя</label>
					<input v-model="first_name" type="text" placeholder="Иван">
				</div>
				<div>
					<label for="">Фамилия</label>
					<input v-model="last_name" type="text" placeholder="Иванов">
				</div>
				<div>
					<label for="">Телефон</label>
					<input v-model="phone" type="tel" placeholder="+7 (900) 000 00-00">
				</div>
				<div>
					<label for="">Пароль</label>
					<input v-model="password" type="password" placeholder="*****">
				</div>
				<div>
					<label for="">Нажимая зарегистрироваться вы принимаете <a href="#">пользовательское соглашение</a></label>
				</div>
				<button @click.prevent="signup">Зарегистрироваться</button>
			</form>
		</div>
	</main>
</template>

<script>
	export default {
        name: 'App',
		data() {
			return {
				first_name: "",
				last_name: "",
				phone: "",
				password: ""
			}
		},
		methods: {
			signup() {
				fetch("http://photoservice/api/signup", { // Если не работает надо в БД поменять password на passhash
				// fetch("http://localhost/photoservice/web/users", { // Если не работает надо в БД поменять passhash на password
					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: `first_name=${this.first_name}&last_name=${this.last_name}&phone=${this.phone}&password=${this.password}`
				})
			}
		}
	}
</script>