<template>
  <ul class="c-list">
    <li v-for="item in lists" :key="item.id" class="prd-item ui-fl-l">
      <img :src="item.img" :alt="item.title">
      <h2>{{item.title}}</h2>
      <p>存<span>￥{{item.prize}}</span>起</p>
      <a @click="baina(item)" class="btn" href="javascript:;">立即白拿</a>
    </li>
  </ul>
</template>
<script>
import Boxes from '@jyb/boxes';
import tips from '@jyb/lib-tips';
import * as indexService from '@/services/index';

export default {
  data() {
    return {
      lists: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      indexService.fetchList().then((json) => {
        if (json.code !== 0) return tips.showError(json.msg);
        this.lists = json.data.lists;
      });
    },
    baina(row) {
      Boxes.emit('CompList:baina', { prdId: row.id });
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/sass/function";
.c-list {
  box-sizing: border-box;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0 0 0 .4rem;
  overflow: hidden;
  .prd-item {
    float: left;
    position: relative;
    background: #fff;
    border-radius: .06rem;
    margin: 0 0 .18rem;
    width: 3.26rem;
    height: 4.45rem;
    img {
      display: block;
      width: 2rem;
      height: 2rem;
      margin: .32rem 0 0 .64rem;
    }
    h2 {
      font-size: .24rem;
      padding: .24rem .24rem 0 .2rem;
      width: 2.86rem;
      line-height: 1.25;
      color: #262626;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 400;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    p {
      position: absolute;
      left: .2rem;
      bottom: .95rem;
      font-size: .24rem;
      color: #999;
    }
    span {
      color: #f60;
    }
    .btn {
      position: absolute;
      bottom: -.01rem;
      display: block;
      width: 100%;
      height: .8rem;
      line-height: .8rem;
      font-size: .3rem;
      text-align: center;
      text-decoration: none;
      background-color: #ff7713;
      color: #ffdd4b;
      border-bottom-right-radius: .06rem;
      border-bottom-left-radius: .06rem;
    }
  }
  li {
    &:nth-child(2n+1) {
      margin-right: .18rem;
    }
  }
}
</style>