<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app> 
    <video-player @ended="ended()" @emptied="ended()" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"/>
  </v-app>
</template>

<script>
import VideoPlayer from 'nuxt-video-player'

export default {
  components: {
    VideoPlayer,
  },
  data() {
    return {}
  },

  methods: {
    ended() {
        alert("video is end")
    }
  }
}
</script>
