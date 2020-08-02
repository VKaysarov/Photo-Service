<template>
    <main>

      <div class="subtitle">
        <h1>Ваши фото</h1>
        <div class="select-all">
          <a 
            href="#"
            @click="selectAll(images)"
          >
            Выбрать все
          </a>
        </div>
      </div>

      <ImageList :prop="images" />

      <div class="pagination">
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
      </div>

      <div class="action-bar" :class="{active: images.some(i => i.checked)}">
        <div>
          <img src="img/icons/Icon - Share - Filled.svg" alt="share">
        </div>
        <div>
          <img src="img/icons/Icon - Delete.svg" alt="delete">
        </div>
      </div>

    </main>
</template>

<script>
	import ImageList from '@/components/ImageList'

	export default {
    name: 'App',
    data() {
      return {

        images: [],
        selectedAll: false
      }
    },
		components: {
			ImageList
		},
    created() {
      fetch('http://localhost/photoservice/web/photo', {
        method: "get", mode:'cors'
      })
        .then(response => response.json())
        // .then(result => console.log(result[0].url));
        .then(result => this.images.push(result[0]));
    },
    methods: {
      selectAll(images) {
        images.forEach(i => i.checked = true)
      }
    }
	}

</script>