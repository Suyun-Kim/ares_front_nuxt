<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <AresLoginLogo/>
      </v-card>

      <v-card align="center" class="grey darken-4">
        <v-card-title class="headline justify-center">
          LOGIN
        </v-card-title>
        <v-text-field
          class="justify-center"
          label="회원이름"
          outlined
          clearable
          style="width: 75%"
        />
        <v-text-field
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          label="비밀번호"
          outlined
          clearable
          hint="휴대폰 비밀번호 4자리"
          value=""
          class="input-group--focused justify-center"
          style="width: 75%"
          @click:append="show = !show"
        />
        <v-btn
          x-large
          elevation="24"
          class="black--text blue-grey lighten-5"
          style="
            margin-top: 2.5em;
            margin-bottom: 2.5em;
            font-size: 1.25rem;
            font-weight: 500;
          "

        >
          로그인
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  show = false
  password = 'Password'
  rules = {
    required: (value: any) => !!value || 'Required.',
    min: (v: string | any[]) => v.length >= 4 || '휴대폰 비밀번호 4자리를 입력하세요.'
  }

  auth = {
    memberId: '',
    memberPwd: ''
  }

  submit () {
    const data = {
      memberId: this.auth.memberId,
      memberPwd: this.auth.memberPwd
    }
    this.$store.dispatch('LOGIN', { data })
      .then(
        this.redirect
      )
      .catch((err) => {
        console.log(err)
      })
  }

  redirect () {
    this.$router.push('/')
  }
}
</script>
