<template>
  <v-card
    class="mx-auto my-12"
    width="25em"
  >
    <v-card-title>{{ gameInfo.title }}</v-card-title>

    <v-card-text>
      <div class="my-4 text-subtitle-1">
        Late time : {{ formatTime(gameInfo.tardinessTime) }}
      </div>

      <div
        class="white--text"
      >
        축구장 중심으로 반영 300m 이내에서 <br>
        출석체크가 가능 합니다. <br>
        출석체크 버튼을 연타하지 말아주세요.. <br>
        천~천~히 다 비용입니다.
      </div>
    </v-card-text>

    <v-divider class="mx-4"/>

    <v-card-title
      class="white--text h1 text-center justify-center text-h3"
      style="font-weight: bold"
    >
      {{ currentTime }}
    </v-card-title>

    <v-divider class="mx-4"/>

    <v-card-actions
      class="d-flex justify-center"
    >
      <v-btn
        color="purple accent-3"
        class="text-center text-h4"
        width="10em"
        height="4em"
        style="font-weight: bold"
        @click="checkIn(location)"
      >
        출석체크
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CheckIn extends Vue {

  location = {
    latitude: 0,
    longitude: 0
  }

  gameInfo = {
    idx: 0,
    title: '',
    startDate: '',
    startTime: '',
    tardinessTime: ''
  }

  gameIdx: number = 0
  currentTime: string = ''
  map = null

  created (): void {
    this.getCurrentPosition()
    this.getMatchGame()
    this.getStopWatch()
  }

  async getMatchGame () {
    try {
      const res = await this.$axios.get('/games:voting')
      if (res.data.success) {
        this.gameIdx = res.data.data.idx
        this.gameInfo = res.data.data
      } else {
        alert('경기정보를 가져오는데 오류가 발생함')
      }
    } catch (err) {
      alert('문제가 발생 했어!!')
    }
  }

  getCurrentPosition () {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => this.setLocation(position))
  }

  setLocation (position: GeolocationPosition) {
    this.location.latitude = position.coords.latitude
    this.location.longitude = position.coords.longitude
  }

  getStopWatch () {
    const current = this.$moment()
    this.currentTime = this.$moment(current, 'HH:mm').format('HH:mm:ss')

    setInterval(this.getStopWatch, 1000)
  }

  async checkIn (position: any) {
    const result = await this.getDistance(position)
    const distance = result.data
    if (distance < 300) {
      const pos = {
        x: position.latitude,
        y: position.longitude
      }

      const data = {
        point: pos,
        gameId: this.gameIdx,
        memberId: this.$store.getters.auth.id
      }

      const res = await this.$axios.$post('/checkIn', data)
      if (res.success) {
        alert('출석 완료')
      } else {
        alert('출석 실패')
      }
    } else {
      alert('출석가능한 위치가 아닙니다.')
    }
  }

  async getDistance (position: any) {
    const pos = {
      x: position.latitude,
      y: position.longitude
    }

    const data = {
      point: pos,
      gameId: this.gameIdx
    }

    const res = await this.$axios.$get('/games:distance/' + data.gameId,
      {
        params: {
          gameId: data.gameId,
          lon: pos.x,
          lan: pos.y
        }
      }
    )

    return res
  }

  formatDate (value: string) {
    return this.$moment(String(value)).format('YYYY-MM-DD')
  }

  formatTime (value: string) {
    return this.$moment(String(value), 'HH:mm').format('HH:mm')
  }
}
</script>

<style scoped>

</style>
