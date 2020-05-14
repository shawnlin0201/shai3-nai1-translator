<template>
  <div id="app">
    <nav class="navbar-wrapper">
      <div class="navbar-title">SHAI3-NAI1</div>
    </nav>
    <section class="page-wrapper">
      <article class="main-wrapper">
        <div class="description">
          這肆一款能江正體中文轉成「Shai3-Nai1」體的翻譯機。
          <br><br>
          娃娃音應該肆一種森活的態度
        </div>
      </article>
      <article class="traslate-wrapper">
        <div class="block-wrapper">
          <div class="block">
            <div class="block-title">
              正體中文
            </div>
            <textarea class="block-description" v-model="text">
            </textarea>
          </div>
          <div class="block">
            <div class="block-title">
            「Shai3-Nai1」體
            </div>
            <div class="block-description" v-html='traslateText'>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import dictionary from './../src/assets/dictionary/zh-tw.json'

export default {
  name: 'App',
  data () {
    return {
      text: '快來試試。',
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
        newRegex += i
      }
      newRegex = newRegex.split('').join('|')
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
  font-family: 'Noto_Sans_TC';
  font-weight: bold;
  display: flex;
  justify-content: center;
  padding: rem(16px);
  background: $main-dark-color;
  font-size: rem(24px);
  letter-spacing: rem(4px);
  color:$main-font-color;
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
  padding:rem(24px) rem(16px);
  height: rem(200px);
  text-align: center;
  color: $main-font-color;
  .description {
    margin-bottom: rem(24px);
  }
}

.traslate-wrapper {
  color: $main-font-color;
  padding:rem(24px) rem(16px);
  .block-wrapper {
    display:flex;
    justify-content: space-around;
    .block {
      width: rem(360px);
      padding: rem(12px);
      .block-title {
        text-align: center;
        padding-bottom: rem(8px);
      }
      .block-description {
        width:100%;
        min-height: rem(100px);
        background:$second-lightcolor;
        padding: rem(12px);
        color: $main-font-color;
        font-weight: bold;
        font-size: rem(16px);
      }
    }
  }
}
</style>
