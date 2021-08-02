<template>
  <section>
    <div class="full-height full-width text-center">
      <div class="container">
        <div class="row">
          <h2>Create New Song</h2>
        </div>

        <div class="row">
          <div class="col">
            <q-input
              :rules="[required]"
              square
              filled
              clearable
              v-model="song.title"
              type="text"
              label="Title"
            />
          </div>
          <div class="col">
            <q-input
              :rules="[required]"
              square
              filled
              clearable
              v-model="song.artist"
              type="text"
              label="Artist"
            />
          </div>
          <div class="col">
            <q-input
              :rules="[required]"
              square
              filled
              clearable
              v-model="song.genre"
              type="text"
              label="Genre"
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-input
              :rules="[required]"
              square
              filled
              clearable
              v-model="song.album"
              type="text"
              label="Album"
            />
          </div>
          <div class="col">
            <q-input
              :rules="[required]"
              square
              filled
              clearable
              v-model="song.albumImage"
              type="text"
              label="AlbumImage"
            />
          </div>
          <div class="col">
            <q-input
              :rules="[required]"
              square
              filled
              clearable
              v-model="song.youtubeId"
              type="text"
              label="YoutubeId"
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-input
              :rules="[required]"
              square
              filled
              clearable
              v-model="song.lyrics"
              label="Lyrics"
              type="textarea"
            />
          </div>
          <div class="col">
            <q-input
              :rules="[required]"
              square
              filled
              clearable
              v-model="song.tab"
              label="Tab"
              type="textarea"
            />
          </div>
        </div>

        <div class="row" v-if="error">
          <div class="col error">
            {{ error }}
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-btn @click="createSong" color="primary" label="Create" />
          </div>
          <div class="col">
            <q-btn
              @click="navigateTo({ name: 'songs' })"
              color="secondary"
              label="Cancel"
              flat
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import SongsService from "../services/SongsService";
// import { mapActions, mapGetters} from "vuex";
export default {
  data() {
    return {
      song: {
        title: "",
        artist: "",
        genre: "",
        album: "",
        albumImage: "",
        youtubeId: "",
        lyrics: "",
        tab: "",
      },
      required: (value) => !!value || "Required.",
      error: null,
    };
  },
  name: "CreateSong",
  methods: {
    async createSong() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.song).every(
        (key) => !!this.song[key]
      );

      if (!areAllFieldsFilledIn) {
        this.error = "Please fill all required fields";
        return;
      }

      try {
        await SongsService.post(this.song);
        this.$router.push({
          name: "songs",
        });
      } catch (error) {
        this.error = error;
      }
    },
    navigateTo(path) {
      this.$router.push(path);
    },
  },
};
</script>


<style scoped>
.container {
  /* margin: 2%; */
  width: 70%;
  margin: 0 auto;
}

.col {
  margin: 2%;
}

.error {
  color: red;
}
</style>