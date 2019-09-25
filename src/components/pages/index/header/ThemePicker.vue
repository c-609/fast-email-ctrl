<template>
<div class="picker-container">
   <el-tooltip class="item" effect="dark" content="主题色" placement="bottom">
    <el-color-picker
      class="theme-picker"
      popper-class="theme-picker-dropdown"
      v-model="theme"
      :size="size">
      
    </el-color-picker>
   </el-tooltip>
  </div>
</template>

<script>

const version = require('element-ui/package.json').version // element-ui version from node_modules
var ORIGINAL_THEME = '#409EFF' // default color
export default {
  name: 'ThemePicker',
  props: {
    default: { // 初始化主题，可由外部传入
      type: String,
     // default: ORIGINAL_THEME
      //  default: ""+localStorage.getItem("tremePackers")+""
    },
    size: { // 初始化主题，可由外部传入
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
      default:'',
      chalk: '', // content of theme-chalk css
      theme: ORIGINAL_THEME,
      //theme:""+localStorage.getItem("tremePackers")+"",
      showSuccess: true, // 是否弹出换肤成功消息
    }
  },
  created(){
    if(localStorage.getItem("tremePackers") == null){
      this.default = '#409EFF';
    }else{
      this.default= ""+localStorage.getItem("tremePackers")+""
    }

  },
     

  mounted() {
    if(this.default != null) {
      this.theme = this.default;
     // this.ORIGINAL_THEME = this.default;
      this.$emit('onThemeChange', this.theme);
      // alert("fff")
      console.log(this.default);
      this.showSuccess = false;
    }
  },
  watch: {
    theme(val, oldVal) {
      if (typeof val !== 'string') return
      const themeCluster = this.getThemeCluster(val.replace('#', ''))
      const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
          const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)

          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
      }

      const chalkHandler = getHandler('chalk', 'chalk-style')

      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        this.getCSSString(url, chalkHandler, 'chalk')
      } else {
        chalkHandler()
      }

      const styles = [].slice.call(document.querySelectorAll('style'))
        .filter(style => {
          const text = style.innerText
          return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        })
      styles.forEach(style => {
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
      })

      // 响应外部操作
      this.$emit('onThemeChange', val)
      //存入localStorage
     
      // localStorage.setItem('tremePackers',val);
      
      if(this.showSuccess) {
        // location.reload()
        localStorage.setItem('tremePackers',val);
        // this.theme = this.default,
        this.$message({
          
          message: '换肤成功',
          type: 'success'
        })
        this.reload();
      } else {
        this.showSuccess = true
      }
    }
  },
  methods: {
    handleLocal(){
      console.log(this.theme+"-------------------")
    },
    
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },

    getCSSString(url, callback, variable) {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
          callback()
        }
      }
      xhr.open('GET', url)
      xhr.send()
    },

    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) { // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }
  }
}
</script>

<style scoped>
</style>