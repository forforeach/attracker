<template>
  <v-toolbar app>
    <v-toolbar-items>
      <v-btn v-if="loggedIn" flat to="/">Home</v-btn>
      <v-btn v-if="!loggedIn" flat to="/login">Login</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex'
import { AUTH_LOGEDIN } from '@/stores/auth.js'
export default {
  name: 'att-header',
  computed: {
    ...mapState({
      loggedIn: state => state.auth[AUTH_LOGEDIN]
    })
  }
}
</script>
