<template>
  <section>
    <div class="full-height full-width text-center">
      <div class="row">
        <div class="col">
          <h2>Welcome To The Songs Page</h2>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-btn
            @click="navigateTo({ name: 'newSong' })"
            color="primary"
            label="Add New"
          />
        </div>
      </div>
      <div class="row">
        <div class="col my-card-container" v-for="song in songs" :key="song.id">
          <q-card class="my-card" >
            <q-img :src="song.albumImage">
              <div class="absolute-bottom">
                <div class="text-h6">{{ song.title }}</div>
                <div class="text-subtitle2">{{ song.artist }}</div>
              </div>
            </q-img>

            <q-card-actions>
              <q-btn @click="navigateTo({ name: 'Song', params: { id: song.id } })" flat>View</q-btn>
              <q-btn @click="navigateTo({ name: 'EditSong', params: { id: song.id } })" flat>Edit</q-btn>
            </q-card-actions>
          </q-card>
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
.my-card-container{
  max-width: 25%;
  margin: 1%;
}
.my-card{
  min-height: 200px;
}
h2 {
  margin: 1%px;
  margin-bottom: 5px;
}

.content {
  border-top: 3px solid #1595de;
  border-bottom: 3px solid #2faa64;
  padding: 5%;
  width: 70%;
  margin: 0 auto;
  margin-top: 1%;
}
</style>