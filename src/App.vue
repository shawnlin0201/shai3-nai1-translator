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
          <div>「Shai3-Nai1」是一種態度，</div><br>
          <div>「Shai3-Nai1」是一種哲學。</div><br>
          <div>不知道怎麼跟說著「Shai3-Nai1」體的人溝通嗎？</div><br>
          <div>這是一款能將中文、文言文翻譯成「Shai3-Nai1」體的翻譯器。</div><br>
          <div>想要知道道地的「Shai3-Nai1」體怎麼說嗎？</div><br>
          <div>快來試試塞乃翻譯機吧！</div>
        </div>
      </article>
      <article class="traslate-wrapper">
        <div class="block-wrapper justify-space-around">
          <div class="block">
            <div class="block-title">
              選擇語言：
              <span class="lang" :class="{'active': lang === 'zh-tw'}" @click="lang = 'zh-tw'">正體中文</span>
              <span class="lang" :class="{'active': lang === 'wyw'}"  @click="lang = 'wyw'">文言文</span>
            </div>
            <div class="block-title">＊使用文言文翻譯功能前請先點此<a class="button button-small" href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank">開通權限</a></div>
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
        <div class="block-wrapper justify-center">
          <div class="button" @click="speakLang = 'Japan';getSpeechVoice();lang === 'zh-tw' ? translate() : wywTranslate()">
            翻譯，並用日文發音
          </div>
          <div class="button" @click="speakLang = 'Chinese';getSpeechVoice();lang === 'zh-tw' ? translate() : wywTranslate()">
            翻譯，並用中文發音
          </div>
        </div>
      </article>
      <article class="main-wrapper">
        <div class="description">
          <div>＊好消息！目前「Shai3-Nai1」翻譯機已提供詞彙提交功能囉！快來試試看吧！＊</div><br><br>

          <a class="button" href="https://forms.gle/yrQ2psN4u99iFEiD9" target="_blank">我要提交詞彙</a>
        </div>
      </article>
    </section>
    <footer class="footer-wrapper">
      Copyright © 2020 ShawnL. All rights reserved
    </footer>
  </div>
</template>

<script>
// import dictionary from './../src/assets/dictionary/zh-tw.json'
import axios from 'axios'
import { getData } from './google-sheet'

export default {
  name: 'App',
  data () {
    return {
      speakLang: 'Chinese',
      text: '',
      traslateText: '',
      dictionary: {},
      regex: '',
      lang: 'zh-tw',
      voice: ''
    }
  },
  mounted () {
    this.loadDictionary(
      this.getTranslateRegex
    )
    window.speechSynthesis.addEventListener('voiceschanged', this.getSpeechVoice)
  },
  destroyed () {
    window.speechSynthesis.removeEventListener('voiceschanged', this.getSpeechVoice)
  },
  methods: {
    loadDictionary (callback) {
      const that = this
      const docID = '1iyHOIQN_6YVHyeG_exWA6sUZJsF2yQV5WI9KDIJsuRU'
      const sheetID = '1552709129'
      getData(docID, sheetID, function (res) {
        res.forEach(raw => {
          const chineseText = raw[1]
          const shanaiText = raw[2]

          that.dictionary[chineseText] = shanaiText
        })

        if ((typeof callback) === 'function') {
          callback()
        }
      })
    },
    speakText () {
      const utterance = new SpeechSynthesisUtterance()
      const text = this.traslateText.replace(/[～|！|♥|？]/g, '')
      utterance.voice = this.voice
      utterance.text = text || ''
      utterance.lang = 'zh-TW'
      utterance.pitch = 1
      utterance.rate = 1
      utterance.volume = 1
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    },
    getSpeechVoice (e) {
      let voices
      if (e) {
        voices = e.target.getVoices()
      } else {
        voices = window.speechSynthesis.getVoices()
      }

      switch (this.speakLang) {
        case 'Japan':
          this.voice = voices.find(voice => voice.voiceURI === 'Google 日本語')
          break
        case 'Chinese':
          this.voice = voices.find(voice => voice.voiceURI === 'Google 國語（臺灣）')
          break
        default:
          this.voice = voices.find(voice => voice.voiceURI === 'Google 國語（臺灣）')
          break
      }
    },
    translate () {
      const regex = new RegExp(this.regex, 'g')
      let newText = String(this.text)
      newText = newText
        .replace(regex, matched => this.dictionary[matched] || '')
        .replace(/\n/g, '<br>')
      this.traslateText = newText
      this.speakText()
    },
    wywTranslate () {
      this.traslateText = '文言文翻譯中...'
      const cors = 'https://cors-anywhere.herokuapp.com/'
      const url = 'https://app.gumble.pw/wenyan/'

      const params = new URLSearchParams()
      params.append('input', this.text)
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
            .replace(regex, matched => this.dictionary[matched] || '')
            .replace(/\n/g, '<br>')

          this.traslateText = newText
          this.speakText()
        })
        .catch(err => {
          this.traslateText = '文言文伺服器繁忙中～請稍後再試試！♥'
          console.error(err)
        })
    },
    getTranslateRegex () {
      let newRegex = this.regex
      for (const i in this.dictionary) {
        newRegex += i + '|'
      }

      this.regex = newRegex
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
    font-size: rem(20px);
    padding: rem(8px) rem(16px);
    letter-spacing: rem(8px);
    line-height: rem(16px);
    white-space: nowrap;
  }
  .navbar-item-list {
    display:flex;
    align-items: center;
  }
  .navbar-item {
    padding: rem(8px) rem(8px);
    font-size: rem(16px);
    transition: 0.5s;
    line-height: rem(16px);
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
  font-size: rem(16px);
  padding:rem(8px) rem(8px);
  height: rem(200px);
  text-align: center;
  color: $main-font-color;
  .description {
    margin: rem(10px) 0;
  }
}

.traslate-wrapper {
  color: $main-font-color;
  padding:rem(24px) rem(16px);
  .block-wrapper {
    display:flex;
    flex-wrap: wrap;
    &.justify-space-around {
      justify-content: space-around;
    }
    &.justify-center {
      justify-content: center;
    }
    .block {
      min-width: rem(200px);
      max-width: rem(600px);
      width:100%;
      padding: rem(12px);
      overflow: hidden;
      .block-title {
        text-align: left;
        padding-bottom: rem(12px);
        .lang {
          cursor: pointer;
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
        background: transparent;
        background:$second-lightcolor;
        padding: rem(12px);
        color: $main-font-color;
        font-weight: bold;
        font-size: rem(16px);
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
.button {
  padding: rem(8px) rem(16px);
  border: rem(2px) solid $main-font-color;
  border-radius: rem(4px);
  margin-right: rem(4px);
  transition: 0.5s;
  font-weight: normal;
  color: white;
  background: $main-font-color;
  cursor: pointer;
  &-small {
    padding: rem(2px) rem(1px);
    margin: rem(4px) rem(8px);
  }
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
