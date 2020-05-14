<template>
  <div id="app">
    <nav class="navbar-wrapper">
      <div class="navbar-title">塞乃翻譯器</div>
      <a class="navbar-item" target="_blank" href="https://github.com/shawnlin0201/shai3-nai1-translator">
        GitHub
      </a>
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
              正體中文
            </div>
            <textarea class="block-description" wrap="physical" v-model="text">
            </textarea>
          </div>
          <div class="block">
            <div class="block-title">
            經翻譯後的「Shai3-Nai1」體
            </div>
            <div class="block-description" v-html='traslateText'>
            </div>
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

export default {
  name: 'App',
  data () {
    return {
      text: '輸入內容就能即時翻譯，\n快來試試看吧。',
      traslateText: '',
      dictionary: dictionary,
      regex: ''
    }
  },
  mounted () {
    this.culcRegex()
    this.translate()
  },
  watch: {
    text () {
      this.translate()
    }
  },
  methods: {
    translate () {
      const regex = new RegExp(this.regex, 'g')
      let newText = String(this.text)

      newText = newText
        .replace(regex, matched => this.dictionary[matched])
        .replace(/\n/g, '<br>')

      this.traslateText = newText
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
        text-align: center;
        padding-bottom: rem(8px);
        margin-bottom: rem(24px);
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
