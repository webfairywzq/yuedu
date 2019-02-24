<template>
    <div class="channel-list">
        <div class="channel" v-for="article in articles" :key="article.id">
            <router-link :to="'/article/'+article.id" class="channel-left">
                <img :src="article.img_url">
            </router-link>
            <div class="channel-body">
                <div class="channel-title">
                    <router-link :to="'/article/'+article.id">{{article.title}}</router-link>
                </div>
                <div class="channel-meta">
                    <span>{{article.author}}</span>
                    <span>{{article.podcast}}</span>
                    <span>{{article.duration}}</span>
                    <span>{{article.play_time}}</span>
                </div>
                <div class="channel-desc">
                    {{article.content | sliceContent}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        articles:Array
    },
    filters:{
        sliceContent(value){
            return value.slice(0,76)+'......'
        }
    }
}
</script>

<style>
.channel-list{
    width: 620px;
}
.channel{
    display: flex;
    margin-bottom: 30px;
    background: #fff;
}
.channel-left{
    width: 210px;
    height: 210px;
    flex-shrink: 0;
    overflow: hidden;
}
.channel-left img{
    height: 100%;
}
.channel-body{
    /* margin-left: 210px; */
    padding: 30px;
    text-align: left;
}
.channel-title{
    font-size: 18px;
    margin-bottom: 10px;
}
.channel-title a{
    color:#707070;
}
.channel-meta{
    margin-bottom: 25px;
    color: #999;
}
.channel-meta span{
    display: inline-block;
    margin-right: 15px;
}
.channel-desc{
    line-height: 22px;
    letter-spacing: 1px;
    font-size: 12px;
    color:#707070;
}
</style>
