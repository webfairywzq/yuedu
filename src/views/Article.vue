<template>
    <div>
        <div class="items">
            <!-- 左侧文章内容 -->
            <div class="items-left" v-if="!noData">
                <div class="items-top">
                    <div class="items-title">
                        {{article.title}}
                    </div>
                    <div class="items-meta">
                        <em>{{article.author}}</em>
                        <em>{{article.podcast}}</em>
                        <em>{{article.duration}}</em>
                        <span>播放<span class="items-meta-num">{{article.play_time}}</span>次</span>
                    </div>
                    <div class="items-pic">
                        <img :src="article.img_url">
                    </div>
                </div>
                <div class="items-content">
                    <div class="items-info">
                        <span :class="{'item-intro':showAll}">{{article.content}}</span>
                    </div>
                    <span class="items-info-show" @click="change">{{all?'收起':'展开全文'}}</span>
                </div>
                <div class="labels">
                    标签: {{article.labels | formatLabels}}
                </div>
                <div class="tab">
                    <router-link :to="'/article/'+(article.id - 1)">上一篇</router-link>
                    <router-link :to="'/article/'+(article.id + 1)">下一篇</router-link>
                </div>
                <!-- 添加评论 -->
                <div class="add-comments">
                    <div class="add-text">
                        <textarea class="comment-text" placeholder="来说点说什么吧！" v-model="content"></textarea>
                    </div>
                    <button class="comment-btn" @click="addComment">评论</button>
                </div>
                <!-- 评论区 -->
                <div class="comments">
                    <ul class="comment-tab">
                        <li class="comment-item">
                            最新评论（{{comments.length}}）
                        </li>
                    </ul>
                    <div class="comment-list" v-if="comments.length">
                        <div class="comment" v-for="(comment,index) in comments" :key="comment.id">
                            <i class="del" v-if="comment.isDel" @click="delComment(comment.id,index)">X</i>
                            <img width="40" height="40" src="http://www.yuedu.fm/static/file/member/defaultuser">
                            <div class="comment-info">
                                <div class="comment-meta">
                                    <h5 class="comment-name">{{comment.nikiname}}</h5>
                                    <span class="comment-time">{{comment.reply_time}}</span>
                                </div>
                                <div class="comment-content">
                                    {{comment.content}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="comment-list" v-else>
                        暂无评论
                    </div>
                </div>
            </div>
            <div v-else>
                未找到页面
            </div>

            <!-- 右侧信息 -->
            <div class="item-right">
                <yd-podcast @change:liked="changeLike" :article="article"></yd-podcast>
                <ydBanner :articles="bannerArticles"></ydBanner>
                <ydOther :rands="rands" :article="article"></ydOther>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../axios'
import ydPodcast from '../components/ydPodcast'
import ydBanner from '../components/ydBanner'
import ydOther from '../components/ydOther'
export default {
    components:{
        ydPodcast,
        ydBanner,
        ydOther
    },
    data(){
        return {
            content:'',
            bannerArticles:[],
            article:{
                content:'',
                labels:''
            },
            all:false,
            noData:false,
            comments:[],

            rands:[]
        }
    },
    watch:{
        '$route':{
            handler(to){
                const id=to.params.id;
                // 左侧文章详情
                axios.get(`/article/${id}`).then((res) => {
                    console.log(res.data);
                    // if(res.data.res_code === 400){
                    //     this.noData = true;
                    // }else{
                    //     this.article=res.data.res;
                    //     this.noData = false;
                    //     return this.article.type_id;
                    // }
                    if(res.data.res_code === 200){
                        this.article = res.data.res;
                        this.noData = false;
                        return this.article.type_id;
                    }else{
                        this.noData = true;
                    }
                    // //FM频道其他节目
                    // axios.get('/articles/'+res.data.res.type_id+'/rand').then(res => {
                    //     // console.log(res.data);
                    //     this.rands=res.data.res;
                    // })
                    
                }).then(id => {
                    return axios.get('/articles/'+id+'/rand')
                    // console.log(id);
                }).then(res => {
                    // console.log(res.data)
                    this.rands=res.data.res;
                    // console.log(this.rands)
                })

                // 评论
                this.comments = [];
                axios.get('/comments/'+to.params.id+'/page/1').then(res => {
                    if(res.data.res_code === 200){
                        this.comments = res.data.res
                    }
                })

                // 其他相关节目
                axios.get('/articles/rand').then(res => {
                    let articles = res.data.res;
                    // console.log(articles)
                    // 将20条数据变成 数组中有五个数组，每个数组有四个对象的形式
                    //  [[{},{},{},{},{}],[],[]...]
                    const arr = [];
                    for(var i=0;i<5;i++){
                        const articlesItem = [];
                        for(var j=0;j<4;j++){
                            const index = j + i * 4;
                            articlesItem.push(articles[index])
                        }
                        arr.push(articlesItem);
                    }
                    // console.log(arr);
                    this.bannerArticles = arr;
                })
                
            },
            immediate:true
        }
    },
    computed:{
        showAll(){
            return this.article.content.length > 300 && !this.all
        }
    },
    filters:{
        formatLabels(value){
            return value.split(',').join(' ');
        }
    },
    methods:{
        change(){
            this.all = !this.all;
        },
        changeLike(state){
            this.article.isLiked = state;
            // console.log(this.article.isLiked)
        },
        addComment(){
            const article_id = this.$route.params.id;
            axios.post('/comment',{
                article_id,content:this.content
            }).then(res => {
                // console.log(res.data);
                this.comments.push(res.data.res);
                this.content="";
            })
        },
        delComment(id,index){
            axios.delete('/comment/'+id).then(res => {
                // console.log(res.data);
                if(res.data.res_code === 200){
                    this.comments.splice(index,1);
                }
            })
        }
    }

}
</script>

<style scoped>
   .item-right{
       width: 360px;
       /* background: #fff; */
   }
   .items{
       width: 1010px;
       margin: 0 auto;
       margin-top: 40px;
       display: flex;
       justify-content: space-between;
   }
   .items-left{
       width: 620px;
   }
   .items-top{
       padding: 30px;
       margin-top: 30px;
       background: #fff;
   }
   .items-title{
       font-size: 24px;
       line-height: 24px;
       margin-bottom: 8px;
       color: #707070;
   }
   .items-meta{
       color: #999;
       line-height: 20px;
       margin-bottom: 25px;
       font-size: 14px;
   }
   .items-meta em{
       font-style: normal;
       margin-right: 20px;
   }
   .items-meta span{
       float:right;
   }
   .items-meta span .items-meta-num{
       margin:0 3px;
       float: none;
       font-size: 16px;
   }
   .items-content{
       padding: 25px 30px;
       background: #fff;
       margin-bottom: 30px;
       margin-top: 40px;
   }
   .items-info{
       line-height: 22px;
       letter-spacing: 1px;
       font-size: 14px;
       color: #333333ba;
   }
   .item-intro {
       display: block;
        height: 200px;
        overflow: hidden;
    }
   .items-info-show{
       font-size: 14px;
       color: #333;
       float: right;
   }
   .labels{
       padding: 5px 30px;
       background: #fff;
       margin-bottom: 30px;
       line-height: 28px;
       font-size: 14px;
       color: #707070;
   }
   .tab{
       display: flex;
       justify-content: space-between;
       align-items: center;
       padding: 20px;
       font-size: 12px;
   }
   /* 添加评论 */
    .add-comments{
        /* padding-left: 10px; */
        display: flex;
        margin-bottom: 30px;
    }
    .add-text{
        width: 530px;
        padding: 10px;
        background: #fff;
    }
    .comment-text{
        background: #fff;
        width: 530px;
        height: 30px;
        line-height: 12px;
        font-size: 12px;
        -webkit-font-smoothing: antialiased;
        outline: none;
        border: none;
        resize: none;
        overflow-y:hidden;
    }
    .comment-btn{
        width: 70px;
        background: #ee5044;
        font-size: 12px;
        color: #fff;
        text-align: center;
        height: 50px;
        line-height: 50px;
        border: none;
        outline: none;
        cursor: pointer;
    }
   /* 评论区 */
    .comment-tab{
        height: 40px;
        margin: 0;
        padding: 0;
    }
    .comment-item{
        color: #ee5044;
        background: #fff;
        padding: 0 15px;
        line-height: 40px;
        cursor: pointer;
        float: left;
        margin: 0;
        border: none;
    }
    .comment-list{
        background: #fff;
        padding: 30px 30px 0;
    }
    .comment-list .comment{
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px dashed #eee;
        position: relative;
        display: flex;
    }
    .comment-list .comment img{
        margin-right: 15px;
    }
    .comment-list .comment .del{
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 14px;
    }
    .comment-info{
        width: 100%;
        margin-bottom: 5px;
        color: #999;
        line-height: 22px;
        display: flex;
        flex-direction: column;
    }
    .comment-meta{
        width: 100%;
        display: flex;
    }
    .comment-info .comment-name{
        font-size: 14px;
        font-weight: bold;
        margin: 0;
    }
    .comment-info .comment-time{
        margin-left: 10px;
        font-size: 12px;
    }
    .comment-content{
        margin-bottom: 15px;
        margin-top: 10px;
    }
</style>
