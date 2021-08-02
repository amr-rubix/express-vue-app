<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <div class="row">
        <div class="col">
          <q-video class="video" :src="youtubeURL" style="height:300px;"  />
        </div>
        <div class="col">
           <q-card-section>
            <div class="row">
              <div class="col">
                <div class="text-h6">{{ song.title }}</div>
                <div class="text-subtitle2">by {{ song.artist}}</div>
                <div class="text-subtitle2">Album {{ song.album}}</div>
                <q-img
                  :src="song.albumImage"
                  spinner-color="white"
                  style="height: 100px; max-width: 150px"
                  img-class="my-custom-image"
                  class="rounded-borders"
                >
                </q-img>
                
              </div>
            </div>
            <div class="row">
              <q-btn class="edit-btn" @click="navigateTo({ name: 'editSong', params: { id: song.id }})" uenlevated color="light-green-7" size="lg" label="Edit" />
            </div>
           </q-card-section>
        </div>
      </div>
      <div class="row extra">
        <div class="col">
          <q-card-section class="q-pt-none">
            {{ song.lyrics }}
          </q-card-section>
        </div>
      </div>
    </q-card>
  </div>
</template>


<script>

import SongsService from '../services/SongsService'
// import { mapActions, mapGetters} from "vuex";
// import Song from './Song.vue'
export default {
  name: 'Songs',
  data(){
    return{
      song: {}
    }
  },
  computed:{
   youtubeURL(){
     return `https://www.youtube.com/embed/${this.song.youtubeId}?rel=0`
   }
  },
  methods:{
   navigateTo(path){
      this.$router.push(path)
    }
  },
  async mounted(){
    try{
      const songId = this.$route.params.id
      const response = await SongsService.show(songId)
      this.song = response.data
    }catch(error){

    }
  }
}
</script>


<style scoped>
.container{
  margin:2%
}

.edit-btn{
  margin-top: 2%;
}

.content{
  border-top:3px solid #1595de;
  border-bottom: 3px solid #2faa64;
  padding:5%
}

.extra{
  margin:2%
}

</style>