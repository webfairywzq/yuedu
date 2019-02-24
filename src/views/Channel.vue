<template>
    <div class="box">
        <ydList :articles="articles"></ydList>
        <ydTop10 :articlesTop10="articlesTop10"></ydTop10>
    </div>
</template>

<script>
import axios from '../axios'
import ydList from '../components/ydList'
import ydTop10 from '../components/ydTop10'
export default {
    data(){
        return {
            articles:[],
            articlesTop10:[]
        }
    },
    components:{
        ydList,
        ydTop10
    },
    watch:{
        '$route':{
            handler(to){
                const id=to.params.id;
                axios.get(`/articles/${id}/page/1`).then((res) => {
                    // console.log(res.data);
                    this.articles=res.data.res.articles;
                })

                axios.get(`/articles/${id}/top10`).then((res) => {
                    // console.log(res.data);
                    this.articlesTop10=res.data.res;
                })
            },
            immediate:true
        }
    }
}
</script>

<style>
    .box{
        width: 1010px;
        padding: 40px 0;
        margin: 0 auto;
        text-align: center;
        display: flex;
        /* flex-direction: column; */
        justify-content: space-between;
    }
</style>
