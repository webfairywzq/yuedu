<template>
    <div class="channel-other">
        <div class="channel-header">
            <h3 class="other">{{gain}}频道其他相关节目</h3>
            <div class="control">
                <span>查看全部</span>
                <i class="next">&gt;</i>
            </div>
        </div>
        <ul class="channel-list">
            <li v-for="(rand,index) in rands" :key="index">
                <router-link to="/">{{rand.title}}</router-link>
                <div>
                    <span>文:{{rand.author}}</span>
                    <span>主播:{{rand.podcast}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import bus from '../bus'
export default {
    data(){
        return {
            str:"",
            arr:[]
        }
    },
    props:{
        rands:Array,
        article:Object
    },
    computed:{
        gain(){
            // bus.$on('gain',(type) => {
            //     this.arr=type;
            // })
            this.arr = JSON.parse(localStorage.getItem('type'))
            for(var i=0;i<this.arr.length;i++){
                if(this.arr[i].id === this.article.type_id){
                    this.str=this.arr[i].type
                }
                // console.log(this.article.type_id)
            }
            // console.log(this.article.type_id);
            return this.str;
        }
    }
}
</script>

<style scoped>
.channel-other{
    width: 100%;
    padding: 30px;
    background: #fff;
    margin-top: 30px;
}
.channel-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
h3{
    margin: 0;
    font-size: 14px;
    border-left: 3px solid #ee5044;
    line-height: 14px;
    padding-left: 5px;
    color: #707070;
}
.control{
    display: flex;
    justify-content: space-between;
}
.control span{
    display: block;
    width: 50px;
    color: #707070;
    font-size: 12px;
}
.control i{
    font-style: normal;
    color: #707070;
    font-size: 12px;
}
.channel-list{
    width: 300px;
    padding-top: 30px;
    margin: 0;
}
.channel-list li{
    padding-bottom: 10px;
    margin-bottom: 10px;
    line-height: 20px;
}
.channel-list li a{
    font-size: 12px;
}
.channel-list li div{
    color: #999;
}
.channel-list li div span{
    margin-right: 20px;
    font-size: 12px;
}
</style>
