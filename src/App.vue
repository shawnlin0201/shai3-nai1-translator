<template>
  <div id="app">
    <nav class="navbar-wrapper">
      <div class="navbar-title">塞乃翻譯器</div>
      <li class="navbar-item-list">
        <div class="navbar-item">
          <div class="line-it-button" data-lang="zh_Hant" data-type="share-a" data-ver="3" data-url="https://shawnlin0201.github.io/shai3-nai1-translator/" data-color="default" data-size="small" data-count="false" style="display: none;"></div>
        </div>
        <div class="navbar-item fb-share-button" data-href="https://shawnlin0201.github.io/shai3-nai1-translator/" data-layout="button" data-size="small">
          <a target="_blank" href="https://shawnlin0201.github.io/shai3-nai1-translator/" class="fb-xfbml-parse-ignore">分享</a>
        </div>
        <a class="navbar-item" target="_blank" href="https://github.com/shawnlin0201/shai3-nai1-translator">
          GitHub
        </a>
      </li>
    </nav>
    <section class="page-wrapper">
      <article class="main-wrapper">
        <div class="description">
          <div>這是一款能將中文翻譯成「Shai3-Nai1」體的翻譯器。</div><br>
          <div>「Shai3-Nai1」是一種態度，</div><br>
          <div>「Shai3-Nai1」是一種哲學。</div><br>
          <div>不知道怎麼跟說著「Shai3-Nai1」體的人溝通嗎？</div><br>
          <div>想要知道道地的「Shai3-Nai1」體怎麼說嗎？</div><br>
          <div>快來試試塞乃翻譯機吧！</div>
        </div>
      </article>
      <article class="traslate-wrapper">
        <div class="block-wrapper">
          <div class="block">
            <div class="block-title">
              選擇語言：
              <span class="lang" :class="{'active': lang === 'zh-tw'}" @click="lang = 'zh-tw'">正體中文</span>
              <span class="lang" :class="{'active': lang === 'wyw'}"  @click="lang = 'wyw'">文言文</span>
            </div>
            <textarea class="block-description" wrap="physical" v-model="text" placeholder="輸入內容，點選翻譯，立刻學習「Shai3-Nai1」體！">
            </textarea>
          </div>
          <div class="block">
            <div class="block-title">
            「Shai3-Nai1」體：
            </div>
            <div class="block-description" v-html='traslateText ? traslateText : "輸入內容～點選翻譯～立刻鞋習「Shai3-Nai1」體！♥"'>
            </div>
          </div>
        </div>
        <div class="block-wrapper">
          <div class="button-translate" @click="lang === 'zh-tw' ? translate() : wywTranslate()">
            翻譯
          </div>
        </div>
      </article>
    </section>
    <footer class="footer-wrapper">
      Copyright © 2020 ShawnL. All rights reserved
    </footer>
  </div>
</template>

<script>
import dictionary from './../src/assets/dictionary/zh-tw.json'
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      text: '',
      traslateText: '',
      dictionary: dictionary,
      regex: '',
      lang: 'zh-tw'
    }
  },
  mounted () {
    this.culcRegex()
  },
  methods: {
    translate () {
      console.log('enter')
      const regex = new RegExp(this.regex, 'g')
      let newText = String(this.text)

      newText = newText
        .replace(regex, matched => this.dictionary[matched])
        .replace(/\n/g, '<br>')

      this.traslateText = newText
    },
    wywTranslate () {
      this.traslateText = '文言文翻譯中...'
      const cors = 'https://cors-anywhere.herokuapp.com/'
      const url = 'https://app.gumble.pw/wenyan/'

      const params = new URLSearchParams()
      params.append('input', '涸轍遺鮒，旦暮成枯；人而無志，與彼何殊。')
      params.append('lang', 'c2m')

      axios.post(`${cors}${url}`, params)
        .then(res => {
          const result = res.data
            .replace(/\r?\n|\r/g, '')
            .match(/<\s*article[^>]*>(.*?)<\s*\/\s*article>/)[1]
            .replace('<p>', '')
            .replace('</p>', '')
            .replace(/<span>/g, '')
            .replace(/<\/span>/g, '')

          const regex = new RegExp(this.regex, 'g')
          let newText = String(result)

          newText = newText
            .replace(regex, matched => this.dictionary[matched])
            .replace(/\n/g, '<br>')

          this.traslateText = newText
        })
        .catch(err => {
          this.traslateText = '文言文伺服器繁忙中～請稍後再試試！♥'
          console.error(err)
        })
    },
    culcRegex () {
      let newRegex = this.regex
      for (const i in this.dictionary) {
        newRegex += i + '|'
      }
      this.regex = newRegex + ''
    }

  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
// common
.btn {
  display:inline-block;
  margin: rem(16px);
  padding: rem(8px) rem(16px);
  background: $main-dark-color;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 2px;
  &:hover {
    background: $main-darker-color;
    color: $main-font-dark-color;
  }
}

// wrapper
.navbar-wrapper {
  position:fixed;
  top:0;
  width:100%;
  box-sizing: border-box;
  font-family: 'Noto_Sans_TC';
  font-weight: bolder;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $main-dark-color;
  color:$main-font-color;
  .navbar-title {
    font-size: rem(24px);
    padding: rem(18px) rem(24px);
    letter-spacing: rem(8px);
    line-height: rem(18px);
  }
  .navbar-item-list {
    display:flex;
    align-items: center;
  }
  .navbar-item {
    padding: rem(18px) rem(24px);
    font-size: rem(18px);
    transition: 0.5s;
    line-height: rem(18px);
    cursor: pointer;
    &:hover {
      background: $main-darker-color;
      color: $main-font-dark-color;
    }
  }
}
.page-wrapper {
  font-family: 'Noto_Sans_TC';
  font-weight: bolder;
  background: $main-light-color;
  padding-top: rem(56px);
  min-height: 100%;
  box-sizing: border-box;
}

.main-wrapper {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  font-size: rem(18px);
  padding:rem(24px) rem(16px);
  height: rem(200px);
  text-align: center;
  color: $main-font-color;
  .description {
    margin: rem(24px) 0;
  }
}

.traslate-wrapper {
  color: $main-font-color;
  padding:rem(24px) rem(16px);
  .block-wrapper {
    display:flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .block {
      min-width: rem(200px);
      max-width: rem(600px);
      width:100%;
      padding: rem(12px);
      overflow: hidden;
      .block-title {
        text-align: left;
        padding-bottom: rem(8px);
        margin-bottom: rem(24px);
        .lang {
          padding: rem(4px) rem(8px);
          border: rem(2px) solid $main-font-color;
          border-radius: rem(4px);
          margin-right: rem(4px);
          transition: 0.5s;
          font-weight: normal;
          &.active {
            color: white;
            background: $main-font-color;
          }
        }
      }
      .block-description {
        width:100%;
        box-sizing: border-box;
        min-height: rem(200px);
        background:$second-lightcolor;
        padding: rem(12px);
        color: $main-font-color;
        font-weight: bold;
        font-size: rem(18px);
        line-height: rem(24px);
      }
      textarea {
        width:100%;
        min-height: rem(200px);
        box-sizing: border-box;
        font-family: 'Noto_Sans_TC';
      }
    }
  }
}
.button-translate {
  padding: rem(8px) rem(16px);
  border: rem(2px) solid $main-font-color;
  border-radius: rem(4px);
  margin-right: rem(4px);
  transition: 0.5s;
  font-weight: normal;
  color: white;
  background: $main-font-color;
  cursor: pointer;
}
.footer-wrapper {
  position:fixed;
  bottom:0;
  width:100%;
  font-family: Helvetica;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  padding: rem(8px);
  background: $main-darker-color;
  font-size: rem(16px);
  color:$main-font-dark-color;
}
</style>
