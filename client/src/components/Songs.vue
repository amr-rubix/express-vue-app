<template>
  <section>
    <div class="full-height full-width flex flex-center text-center">
      <div class="container">
        <div class="text-h6">WELCOME TO THE SONGS PAGE</div>
        <q-btn
          @click="navigateTo({ name: 'newSong' })"
          color="primary"
          label="Add New"
        />
        <div class="text-h2 q-py-sm q-my-md content">
          <div class="songs" v-for="song in songs" :key="song.id">
            <div class="song row">
              <div class="col">
                <p class="title">{{ song.title }}</p>
                <p class="artist">{{ song.artist }}</p>
                <p class="album">{{ song.album }}</p>
                <q-btn
                  @click="navigateTo({ name: 'Song', params: { id: song.id } })"
                  uenlevated
                  color="light-green-7"
                  size="lg"
                  class="full-width"
                  label="View"
                />
              </div>
              <div class="col">
                <img :src="song.albumImage" class="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import SongsService from "../services/SongsService";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Songs",
  computed: {
    ...mapGetters(["songs"]),
  },
  methods: {
    ...mapActions(["setSongs"]),
    navigateTo(path) {
      this.$router.push(path);
    },
  },
  async mounted() {
    try {
      const response = await SongsService.index();
      this.setSongs(response.data);
    } catch (error) {
      console.log("an error has occured", error);
    }
  },
};
</script>


<style scoped>
.container {
  margin: 2%;
}

.content {
  border-top: 3px solid #1595de;
  border-bottom: 3px solid #2faa64;
  padding: 5%;
}

.song {
  padding: 2%;
  border: 1px solid;
}

.title {
  font-size: 30px;
}

.artist {
  font-size: 24px;
}

.album {
  font-size: 20px;
}

.image {
  width: 70%;
}
</style>