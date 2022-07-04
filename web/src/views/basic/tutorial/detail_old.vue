<template>
    <div class="bv-example-row main">
            <col cols="8">
                <div id="vue-core-video-player-box" class="example-player">
                    <vue-core-video-player
                        :src="currentMovie.source"
                    ></vue-core-video-player>
                </div>
            <col>
    </div>
</template>

<script>
import DATA from './data';
// let movie = DATA[2];
export default {
    name: 'Main',
    components: {

    },
    data() {
        return {
            title: '',
            movieList: DATA,
            recommendList: [DATA[2], DATA[4], DATA[1], DATA[0]],
            currentMovie: ''
        };
    },
    methods: {
        getParams() {
            this.currentMovie = this.$route.query.video_url
        }
    },
    created() {
        this.getParams();
    },
};
</script>

<style>
.example-player {
    position: relative;
    background-color: #000;
    font-weight: normal;
}
.movie-detail{
    padding-top: 20px;
    color: rgba(0,0,0, .65);
}
.movie-detail h1{
    font-size: 20px;
    color: #000;
}
.movie-detail .date {
    font-size: 14px;
}
.movie-detail .desc {
    font-size: 13px;
    padding: 10px 20px 10px 0;
}
.movie-detail .btn-wrap {
    padding-right: 20px;
    text-align: right;
}
.play-list h2 {
    font-size: 18px;
    color: rgba(0,0,0, .85);
    padding-bottom: 10px;
}
.recommend-list {
    margin-top: 40px;
    padding-top: 40px;
    padding-bottom: 40px;
    border-top: 1px solid #ddd;
}
.thanks {
    padding: 20px 0 40px;
    color: rgba(0, 0, 0, 0.25);
    font-size: 13px;
    text-align: center;
}
.recommend-list:after {
    content: '';
    display: block;
    clear: both;
}
</style>
