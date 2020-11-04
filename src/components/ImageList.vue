<template>
	<div class="cards">
		<div 
			v-for="(p, index) in prop"
			:key="p.id" 
			:class="{checked: p.checked}"
			class="card"
		>
			<div class="card-header">
				<img :src="p.url" alt="img">
				<div class="card-select" v-if="p.checked">
					<input 
						type="checkbox"
						@change="p.checked = !p.checked"
						:id="p.id"
						checked 
					>
					<label :for="p.id">
						<img src="img/icons/Icon - Check Circle - Filled.svg" alt="select">
					</label>
				</div>
				<div class="card-select" v-else>
					<input 
						type="checkbox"
						@change="p.checked = !p.checked"
						:id="p.id"
					>
					<label :for="p.id">
						<img src="img/icons/Icon - Check Circle - Filled.svg" alt="select">
					</label>
				</div>
			</div>
			<div class="card-footer">
				<h2 class="card__title">{{p.name}}</h2>
				<div class="action-icons">
					<img src="img/icons/Icon - Tune - Sharp.svg" @click="optionImg(index, p.name)" alt="option">
					<!-- <img src="img/icons/delete.svg" alt="delete"> -->
					<img src="img/icons/delete2.svg" @click="deleteImg(index, p.id, p.name)" alt="delete">
					<img src="img/icons/Icon - Share - Filled.svg" @click="shareImg(index)" alt="share">
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		props: ["prop", "optionImg", "deleteImg", "shareImg"],
	}

</script>