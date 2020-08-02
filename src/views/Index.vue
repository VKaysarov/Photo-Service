<template>
	<main>
		<div>
			<div class="dropzone">
				<label for="select-file">Выбрать файл</label>
				<input type="file" id="select-file" ref="photo" @change.prevent="uploadFile($event)">
				<h1>или</h1>
				<h1>перетащите изображение сюда</h1>
			</div>
		</div>
		<div class="upload">
			<button @click.prevent="submitFile">Загрузить</button>
		</div>
	</main>
</template>

<script>

	export default {
		name: 'App',
		data() {
			return {
				photo: ""
			}
		},
		methods: {
			submitFile() {
				let formData = new FormData();
				formData.append('photo', this.photo);
				console.log(formData.get('photo'))
				// fetch("http://localhost/photoservice/web/photo", {
				// fetch("http://photoservice/api/photo", {
				fetch("http://wsr/api/photo", {
					method: "POST",
					headers: {
						"Authorization": "Bearer czNAKwfM2G_zCrlfYE7AvycAiWyQ1wHK",
						"Content-Type": "multipart/form-data",
					},
					body: formData
				})
			},
			uploadFile(event) {
				this.photo = event.target.files[0];
			}
		}
	}

</script>