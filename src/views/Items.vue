<template>
    <main class="container">

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

      <ImageList
        :prop="images"
        :optionImg="optionImg"
        :deleteImg="deleteImg"
      />

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
  import ImageList from '@/components/ImageList';
	import firebase from 'firebase/app';
  import 'firebase/storage';

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
    async created() {
      // Create a reference under which you want to list
      const storageRef = firebase.storage().ref();
      let listRef = storageRef.child("images");
      let res = await listRef.listAll();
      let itemsRef = res.items
      for (let itemRef of itemsRef) {
        let downloadUrl = await itemRef.getDownloadURL()
        let name = itemRef.name.replace(/_.+png/, "")
        let id = itemRef.name.match(/_.+png/)[0].replace(/png/, "")
        this.images.push({
          id: id,
          name: name,
          url: downloadUrl,
          checked: false,
        })
      }
      // ==================================================
      // fetch('http://localhost/photoservice/web/photo', {
      //   method: "get", mode:'cors'
      // })
      //   .then(response => response.json())
      //   .then(result => this.images.push(result[0]));
    },
    methods: {
      selectAll(images) {
        images.forEach(i => i.checked = true)
      },
      optionImg(id) {
        console.log(id)
      },
      deleteImg(id, uid, name) {
        const storageRef = firebase.storage().ref();
        let path = "images/" + name + uid + "png";
        let desertRef = storageRef.child(path);
        desertRef.delete()
        this.images.splice(id, 1)
      }
    }
	}

</script>

<style>
  main {
    /*display: grid;
    grid-template-rows: 15% 80% 5%;*/
  }
</style>