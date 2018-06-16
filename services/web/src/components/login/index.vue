<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field prepend-icon="person" name="username" label="User name" type="text" v-model="username"></v-text-field>
        <v-text-field prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import auth from '@/services/auth.js'
export default {
  name: 'att-login',
  props: ['redirect'],
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      auth.login(this.username, this.password)
        .then(() => this.$router.push(this.$props.redirect))
    }
  }
}
</script>
