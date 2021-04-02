<template>
	<main class="container">
		<div class="dropzone-wrapper">
			<div
				class="dropzone"
				@drop="drop($event)"
				@dragover.prevent="dragover"
				@dragenter="dragenter"
				@dragleave="dragleave"
			>
				<transition name="animation-upload" mode="out-in">
					<div v-if="show" class="dropzone_content">
						<img src="img/icons/metro-upload.svg" alt="upload-icon">
						<label for="select-file">Выберете файл</label>
						<input 
							id="select-file"
							type="file"
							ref="photo"
							multiple
							@change.prevent="uploadFile($event)"
						>
						<p>или перетащите изображение сюда</p>
					</div>
				</transition>
				<div class="preview">
					<div class="preview_item" v-for="(img, index) in images" :key="img.id">
						<span
							class="preview_item__delete"
							@click="deleteFile(index)"
						>✖</span>
						<img :src="img.url" alt="preview">
						<input
							type="text"
							class="preview_item__title"
							v-model="img.name"
						>
					</div>
				</div>
			</div>
			<div>
				<ul class="regulation">
					<li>Максимум файлов: 10</li>
					<li>Разрешенные форматы: .jpg, .jpeg, .png</li>
				</ul>
			</div>
		</div>
		<div class="upload">
			<button class="btn--upload" @click.prevent="submitFile">Загрузить</button>
		</div>
	</main>
</template>

<script>
	// const axios = require('axios');
	import firebase from "firebase";
	import { v4 as uuidv4 } from 'uuid';

	export default {
		name: 'App',
		data() {
			return {
				images: [],
				photo: "",
				show: true
			}
		},
		methods: {
			submitFile() {
				if (login == false) {
					return 'Необходимо авторизироваться для загрузки изображений'
				}
				const metaData = {
					contentType: "image/png"
				}

				const storageRef = firebase.storage().ref();
				for (let img of this.images) {
					const imageRef = storageRef.child(`images/${img.name}_${img.id}.png`);
					imageRef.put(img.photo, metaData);
				}

				this.images = []

			},
			deleteFile(id) {
				let images = this.images;
				images.splice(id, 1);
				this.images = images;
			},
			uploadFile(event) {
				let files = event.target.files || event.dataTransfer.files
				for (let file of files) {
					let url = URL.createObjectURL(file);
					this.images.push({
						id: uuidv4(),
						name: "Untitle",
						url: url,
						photo: file,
					})
				}
			},
			drop(event) {
				event.preventDefault();
				event.stopPropagation();

				document.querySelector(".dropzone").classList.remove("is-dragenter");
				
				this.uploadFile(event);	
			},
			dragenter() {
				document.querySelector(".dropzone").classList.add("is-dragenter");
			},
			dragover() {
				document.querySelector(".dropzone").classList.add("is-dragenter");
			},
			dragleave() {
				document.querySelector(".dropzone").classList.remove("is-dragenter");
			},

		},
		updated() {
			let itemsPreview = document.querySelectorAll(".preview_item")
			for (let item of itemsPreview) {
				item.classList.add("is-upload");
			}
			if (this.images.length == 0) {
				document.querySelector(".btn--upload").classList.remove("is-active");
				this.show = true;
			} else {
				document.querySelector(".btn--upload").classList.add("is-active");
				this.show = false;
				let formData = new FormData();
				formData.append('photo', this.photo);
			}
		}
	}

</script>

<style>

	.animation-upload-enter-active, .animation-upload-leave-active {
		transition: opacity .5s;
	}
	.animation-upload-enter, .animation-upload-leave-to {
		opacity: 0;
	}

	h1 {
		text-align: center;
	}

	.preview {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.preview_item {
		width: 250px;
		margin: 20px;
		position: relative;
		opacity: 0;
		transition-duration: 7s;
		max-height: 0px;
		transform: rotateX(90deg);
	}

	.preview_item.is-upload {
		opacity: 1;
		max-height: 200px;
		transform: rotateX(0deg);
	}

	.preview img {
		width: 250px;
		height: 200px;
		object-fit: cover;
	}

	.preview_item__delete {
		width: 30px;
		height: 30px;
		display: grid;
		place-items: center;
		position: absolute;
		top: -14px;
		right: -14px;
		border: 2px solid #000;
		border-radius: 50%;
		background-color: #fff;
		cursor: pointer;
	}

	.preview_item__title {
		font-size: 20px;
		text-align: center;
		position: absolute;
		left: calc(50% - 100px);
		bottom: -10px;
		width: 80%;
		border: none;
		border-radius: inherit;
		box-shadow: 0 0 10px 0 #00000057;
		outline: none;
		z-index: 2;
	}

	.btn--upload {
		font-size: 20px;
		margin-top: 40px;
		padding: .8em 1.8em;
		opacity: 0;
		transition-duration: .4s;
	}

	.btn--upload.is-active {
		opacity: 1;
	}

	.regulation {
		margin-top: 1em;
		text-align: center;
	}
</style>
