<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" @submit="login">
        <v-text-field prepend-icon="person" name="username" label="User name" type="text" v-model="username" required :rules="usernameRules"></v-text-field>
        <v-text-field prepend-icon="lock" name="password" label="Password" type="password" v-model="password" required :rules="passwordRules"></v-text-field>
        <div v-if="loginFailed" class="login-error-message error--text text-sm-left text-lg-left">Username or password are incorrect</div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="primary">Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { AUTH_LOGIN_ACTION } from '@/stores/auth.js'
export default {
  name: 'att-login',
  props: ['redirect'],
  data () {
    return {
      loginFailed: false,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => v.length >= 3 || 'Name must have more than 3 characters'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  methods: {
    login (event) {
      event.preventDefault()
      if (this.$refs.form.validate()) {
        this.loginFailed = false
        this.$store.dispatch({
          type: AUTH_LOGIN_ACTION,
          payload: { username: this.username, password: this.password }
        })
          .then(() => this.$router.push(this.$props.redirect || '/'))
          .catch(() => {
            this.loginFailed = true
          })
      }
    }
  }
}
</script>
