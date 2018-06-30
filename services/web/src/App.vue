<template>
  <div id="app">
    <v-app>
      <att-header v-if="loggedIn"></att-header>
      <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import AttHeader from '@/components/header/Header.vue'
import { mapState } from 'vuex'
import { AUTH_LOGEDIN } from '@/stores/auth.js'

export default {
  name: 'app',
  components: {
    AttHeader
  },
  computed: {
    ...mapState({
      loggedIn: state => state.auth[AUTH_LOGEDIN]
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
