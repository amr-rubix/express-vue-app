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
        {{ song.lyrics }}
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ song.tab }}
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-btn
          class="edit-btn"
          @click="navigateTo({ name: 'EditSong', params: { id: song.id } })"
          uenlevated
          size="lg"
          label="Edit"
        />
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
.container {
  margin: 2%;
}

.edit-btn {
  margin-top: 2%;
}

.youtube-video {
  height: 400px;
}

.content {
  border-top: 3px solid #1595de;
  border-bottom: 3px solid #2faa64;
  padding: 5%;
}

.extra {
  margin: 2%;
}
</style>