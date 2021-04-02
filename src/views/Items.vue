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
          <svg id="delete" data-name="delete" xmlns="http://www.w3.org/2000/svg" width="26.952" height="32.4" viewBox="0 0 26.952 32.4">
            <path id="Subtraction_4" data-name="Subtraction 4" d="M16,26H5a5.006,5.006,0,0,1-5-5V0H21V21A5.006,5.006,0,0,1,16,26Zm.407-22.911a.657.657,0,0,0-.656.656V22.512a.656.656,0,1,0,1.312,0V3.745A.657.657,0,0,0,16.406,3.089Zm-3.937,0a.657.657,0,0,0-.656.656V22.512a.656.656,0,1,0,1.312,0V3.745A.657.657,0,0,0,12.469,3.089Zm-3.937,0a.657.657,0,0,0-.656.656V22.512a.656.656,0,1,0,1.312,0V3.745A.657.657,0,0,0,8.531,3.089Zm-3.938,0a.657.657,0,0,0-.656.656V22.512a.656.656,0,1,0,1.312,0V3.745A.657.657,0,0,0,4.594,3.089Z" transform="translate(3.401 6.4)" fill="#7E7E7E"/>
            <path id="Union_10" data-name="Union 10" d="M0,5.7V5.287A1.659,1.659,0,0,1,1.659,3.628H7.775A3.632,3.632,0,0,1,11.4,0H15.55a3.633,3.633,0,0,1,3.628,3.627h5.7A2.073,2.073,0,0,1,26.952,5.7ZM17.862,3.628A3.1,3.1,0,0,0,14.773.864H12.181A3.1,3.1,0,0,0,9.09,3.628Z" transform="translate(0 0)" fill="#7E7E7E"/>
          </svg>
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
