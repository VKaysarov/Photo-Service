<template>
	<main class="container">
		<div class="content">
			<h1>Freemage</h1>
			<p>Загружайте и делитесь своими <br> изображениями – совершенно бесплатно.</p>
			<button>
				<router-link to="/upload" class="btn--main">Загрузить фото</router-link>
			</button>
		</div>
	</main>
</template>

<script>
	export default {
		name: 'Index',
	}
</script>

<style scoped>

	main {
		width: 100%;
		color: #fff;
		text-align: center;
		display: grid;
		place-items: center;
		background-image: url(../../public/img/bg-main.png);
		background-position: bottom center;
	}

	h1 {
		font-size: 50px;
		margin-bottom: 20px;
	}

	p {
		font-size: 26px;
		margin-bottom: 40px;
	}

	main button {
		background: none;
	}

	main button .btn--main {
		font-size: 20px;
		width: 222px;
		height: 55px;
		margin: 0 auto;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
		color: #5d16c9;
	}
</style>