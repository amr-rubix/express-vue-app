<template>
  <section>
      <div class="full-height full-width flex flex-center text-center">
        <div class="container">
          <div class="text-h6">Edit Song</div>
          
          <div class="content">
            <q-card-section>
            <q-form class="q-gutter-lg">
                <div class="row">
                    <div class="col">
                        <q-input :rules="[required]" square filled clearable v-model="song.title" type="text" label="Title" />
                    </div>
                    <div class="col">
                        <q-input :rules="[required]" square filled clearable v-model="song.artist" type="text" label="Artist" />
                    </div>
                    <div class="col">
                        <q-input :rules="[required]" square filled clearable v-model="song.genre" type="text" label="Genre" />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <q-input :rules="[required]" square filled clearable v-model="song.album" type="text" label="Album" />
                    </div>
                    <div class="col">
                         <q-input :rules="[required]" square filled clearable v-model="song.albumImage" type="text" label="AlbumImage" />
                    </div>
                    <div class="col">
                        <q-input :rules="[required]" square filled clearable v-model="song.youtubeId" type="text" label="YoutubeId" />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <q-input :rules="[required]" square filled clearable v-model="song.lyrics" type="text" label="Lyrics" />
                    </div>

                </div>

                <div class="row">
                    <div class="col">
                        <q-input :rules="[required]" square filled clearable v-model="song.tab" type="text" label="Tab" />
                    </div>
                </div>

                <div class="row error" v-if="error">
                    {{ error }}
                </div>
                <div class="row">
                    <div class="col">
                        <q-btn @click="saveSong" color="primary" label="Save" />
                    </div>
                    <div class="col">
                        <q-btn @click="navigateTo({'name': 'songs'})" color="secondary" label="Cancel" />
                    </div>
                </div>
            </q-form>
          </q-card-section>
          </div>
        </div>
      </div>
      </section>
</template>


<script>
import SongsService from '../services/SongsService'
// import { mapActions, mapGetters} from "vuex";
export default {
    data(){
        return{
            song: {
                title: '',
                artist: '',
                genre: '',
                album: '',
                albumImage: '',
                youtubeId: '',
                lyrics: '',
                tab: '',
            },
            required: (value) => !!value || 'Required.',
            error: null
        }
    },
    name: 'EditSong',
    methods:{
        async saveSong(){
            this.error = null
            const areAllFieldsFilledIn = Object
            .keys(this.song)
            .every(key => !!this.song[key])

            if(!areAllFieldsFilledIn){
                this.error = 'Please fill all required fields'
                return
            }

             try{
                 const songId = this.$route.params.id
                await SongsService.put(songId, this.song)
                this.$router.push({
                    name:'Song',
                    params: {
                        id: songId
                    }
                })
            }catch(error){
                this.error = error
            }
        },
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

.col{
    margin:2%;
}

.content{
  border-top:3px solid #1595de;
  border-bottom: 3px solid #2faa64;
  padding:5%
}

.error{
    color:red;
}
</style>