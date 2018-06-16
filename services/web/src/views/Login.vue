<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <att-login :redirect="redirect" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import AttLogin from '@/components/login'
export default {
  name: 'Login',
  props: ['redirect'],
  components: {
    AttLogin
  }
}
</script>
