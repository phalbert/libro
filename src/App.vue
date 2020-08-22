<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <Counter />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Counter from './components/Counter'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Counter
  }
}
</script>
