<template>
  <div id="Search">
   <div style="float:left; margin-bottom:10px"  >
      <div style="display: inline-block"> 搜索：</div>
      <el-input v-model="search" size="mini" style="display: inline-block;width: 250px" 
        placeholder="请输入搜索内容">
      </el-input>
    </div>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus';
export default {
    name: 'Search',
    props: ['tableData'],
    data(){
        return{
            search: '',
        }
    },
     created:function(){
        eventBus.$on('tableData',res=>{
            this.tableData=res.data.data
        })
    },

    computed: {
        tables () {
        const search = this.search
            if (search) {
            // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
            // 注意： filter() 不会对空数组进行检测。
            // 注意： filter() 不会改变原始数组。
                return this.tableData.filter(data => {
                // some() 方法用于检测数组中的元素是否满足指定条件;
                // some() 方法会依次执行数组的每个元素：
                // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
                // 如果没有满足条件的元素，则返回false。
                // 注意： some() 不会对空数组进行检测。
                // 注意： some() 不会改变原始数组。
                return Object.keys(data).some(key => {
                // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                return String(data[key]).toLowerCase().indexOf(search) > -1

                })
            })
            }
            return this.tableData
        },
    },
    watch:{
        tables(){
            eventBus.$emit('Ta',this.tables);
        }
    }
}
</script>

<style >

</style>
