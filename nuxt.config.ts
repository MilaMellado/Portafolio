export default defineNuxtConfig({
  modules: ['@nuxtjs/color-mode'],
  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: ''
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Web Developer Portfolio',
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
      ]
    }
  }
})

