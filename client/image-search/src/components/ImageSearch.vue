<template>
  <div>
    <p>GoogDu</p>
    <div id="search-image">
      <input
        type="text"
        id="search-image"
        v-model="keyword"
        placeholder="Type your image search key words......"
      />
      <button v-on:click="getImageUrls">Search</button>

      <div
        class="div"
        id="images-container"
        v-infinite-scroll="load"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      >
        <img
          class="image col-sm-3"
          v-for="(imageUrl,index) in loadedImageUrls"
          v-bind:index="index"
          v-bind:key="index"
          v-bind:src="imageUrl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ImageService from "../ImageService";

export default {
  name: "ImageSearch",
  data() {
    return {
      keyword: "",
      loadedImageUrls: [],
      receivedImageUrls: [],
      currentIndex: 0,
      busy: false
    };
  },
  methods: {
    async getImageUrls() {
      this.receivedImageUrls = [];
      this.loadedImageUrls = [];
      this.currentIndex = 0;
      var tempUrls = await ImageService.getImagesUrls(this.keyword);
      for (var i = 0; i < tempUrls.length; i++) {
        var url = tempUrls[i];
        this.receivedImageUrls.push(
          `http://farm${url.farm}.static.flickr.com/${url.server}/${url.id}_${url.secret}.jpg`
        );
      }
      this.load();
    },
    load() {
      if (this.currentIndex <= this.receivedImageUrls.length) {
        this.busy = true;
        this.loadedImageUrls.push.apply(
          this.loadedImageUrls,
          this.receivedImageUrls.slice(
            this.currentIndex,
            this.currentIndex + 20
          )
        );//TODO: might need load time...
        this.busy = false;
        this.currentIndex += 20;
      }
    }
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
