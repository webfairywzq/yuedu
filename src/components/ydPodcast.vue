<template>
    <div class="items-right">
        <div class="items-user">
            <div class="user-base">
                <img src="http://www.yuedu.fm/static/file/member/70a6d48f7cc70d9e81e11a524067014c" width="80" height="80">
                <div class="user-body">
                    <h3 class="user-name">作者</h3>
                    <div class="user-info">
                        <div>
                            <span>作品: 27</span>
                            <span>粉丝: 117</span>
                        </div>
                        <button class="btn btn-default bt">关注</button>
                    </div>
                </div>
            </div>
            <div class="user-status">
                <div class="control" @click="like">
                    <i class="icon icon1" :class="{liked:liked}">{{liked ? '已赞' : '求赞'}}</i>
                    <span>19</span>
                </div>
                <div class="control">
                    <i class="icon icon2">❤</i>
                    <span>7</span>
                </div>
                <div class="control">
                    <i class="icon icon3">赏</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../axios'
export default {
    data(){
        return {
            isLiked:false
        }
    },
    props:{
        article:Object
    },
    methods:{
        like(){
            axios.post('/article/'+this.$route.params.id+'/like').then(res => {
                if(res.data.res_code === 200){
                    this.$emit('change:liked',true);
                }
            })
        }
    },
    computed:{
        liked(){
            if(this.article.isLiked){
                this.isLiked=true;
            }else{
                this.isLiked=false;
            }
            return this.isLiked;
        }
    }
}
</script>

<style >
.liked{
    background: #ee5044;
    color: #fff;
}
.items-right{
    background: #fff;
    width: 360px;
    align-self: flex-start;
    font-size: 12px;
    margin-top: 30px;
}
.user-base{
    padding: 30px;
    border-bottom: 1px dashed #eee;
    display: flex;
}
.user-body{
    margin-left: 30px;
    flex: 1;
}
.user-name{
    font-size: 16px;
    padding-bottom: 15px;
    font-weight: normal;
    margin: 0;
}
.user-info{
    display: flex;
    justify-content: space-between;
}
.user-info div span{
    display: block;
    padding: 3px 0;
    color: rgb(112, 112, 112);
}
.user-status{
    padding: 20px 0;
    text-align: center;
    display: flex;
    justify-content: space-around;
}
.btn{
    height: 30px;
}
.user-status .control {
    flex-shrink: 0;
    font-size: 18px;
    display: flex;
    align-items: center;
    /* flex: 1; */
    cursor: pointer;
  }
  .control:last-child {
    flex: 0;
  }
  .user-status .control span {
    margin-left: 15px;
  }
  .user-status .control .icon {
    display: inline-block;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 52px;
    font-style: normal;
  }
.user-status .control .icon2{
    color: #ee5044;
    font-size: 26px;
}
</style>
