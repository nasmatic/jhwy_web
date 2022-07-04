<template>
    <video-player
        class="video-player-box"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        customEventName="customstatechangedeventname"
    ></video-player>
</template>

<script>
// Similarly, you can also introduce the plugin resource pack you want to use within the component
// import 'some-videojs-plugin'
export default {
    data() {
        return {
            playerOptions: {
                // videojs options
                muted: true,
                preload: 'auto',
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [
                    {
                        type: '',
                        src: this.$route.query.video_url
                    }
                ]
                // poster: '/static/images/author.jpg'
            }
        };
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player;
        }
    }
};
</script>
