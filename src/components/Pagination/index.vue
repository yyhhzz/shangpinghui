<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo',pageNo - 1)">上一页</button>
    <button v-if="startAndEnd.start > 1" @click="$emit('getPageNo',1)" >1</button>
    <button v-if="startAndEnd.start > 2">···</button>
    <!-- 中间 -->
    <button v-for="page in startAndEnd.end " :key="page" v-if="page >= startAndEnd.start" @click="$emit('getPageNo',page)" :class="{active:pageNo == page}">{{page}}</button>

    <!-- 下 -->
    <button v-if="startAndEnd.end < totalPage - 1">···</button>
    <button v-if="startAndEnd.end < totalPage" @click="$emit('getPageNo',totalPage)">{{ totalPage }}</button>
    <button @click="$emit('getPageNo',pageNo + 1)">下一页</button>
    <button>共{{total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
        // 总页数
        totalPage(){
            return Math.ceil(this.total/this.pageSize)
        },
        startAndEnd(){
            let start = 0, end = 0;
            const {pageNo,totalPage,continues} = this;
            if(totalPage < continues){
                start = 1;
                end = totalPage;
            }else{
                start = pageNo - parseInt(continues/2);
                end = pageNo + parseInt(continues/2);
                // 约束头部
                if(start < 1){
                    start = 1;
                    end = continues;
                }
                // 约束尾部
                if(end > totalPage){
                    end = totalPage;
                    start = totalPage - continues + 1;
                }
            }
            return {start , end}
        }
    }
  }
</script>

<style lang="less" scoped>
  .active {

  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
