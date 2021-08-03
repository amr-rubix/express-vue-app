<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-video class="youtube-video" :src="youtubeURL" />

      <q-card-section>
        <div class="text-h6">{{ song.title }}</div>
        <div class="text-subtitle2">
          by {{ song.artist }} - Album {{ song.album }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row sub-content">
          <div class="col">
            <h6>Lyrics</h6>
            {{ song.lyrics }}
          </div>
          <div class="col">
            <h6>Tabs</h6>
            {{ song.tab }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col">
            <q-btn
              color="amber"
              label="Edit"
              @click="navigateTo({ name: 'EditSong', params: { id: song.id } })"
              style="margin-right: 1%"
            />
            <q-btn
              color="secondary"
              label="Back"
              @click="navigateTo({ name: 'songs' })"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>




<script>
import SongsService from "../services/SongsService";
// import { mapActions, mapGetters} from "vuex";
// import Song from './Song.vue'
export default {
  name: "Songs",
  data() {
    return {
      song: {},
    };
  },
  computed: {
    youtubeURL() {
      return `https://www.youtube.com/embed/${this.song.youtubeId}?rel=0`;
    },
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
  },
  async mounted() {
    try {
      const songId = this.$route.params.id;
      const response = await SongsService.show(songId);
      this.song = response.data;
    } catch (error) {
      console.log("error", error);
    }
  },
};
</script>


<style scoped>
.sub-content div {
  padding: 1%;
  width: 40%;
  border: 1px solid grey;
  margin-right: 1%;
  border-radius: 5px;
  text-align: justify;
}

.sub-content h6 {
  margin: 0px;
  margin-bottom: 1%;
}

.youtube-video {
  height: 400px;
}
</style>