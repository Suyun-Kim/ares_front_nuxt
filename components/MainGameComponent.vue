<template>
  <v-card
    class="mx-auto"
    width="25em"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          {{ gameInfo.title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ formatDate(String(gameInfo.startDate)) }} {{ formatTime(String(gameInfo.startTime)) }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col
          class="text-h5"
          cols="6"
        >
          {{ weather.temp }}&deg;C, {{ weather.description }}
        </v-col>
        <v-col cols="6">
          <v-img
            :src="weather.icon"
            alt="weather img"
            width="7em"
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-send</v-icon>
      </v-list-item-icon>

      <v-list-item-subtitle>
        {{ weather.windSpeed }} m/s
      </v-list-item-subtitle>

      <v-list-item-icon>
        <v-icon>mdi-cloud-download</v-icon>
      </v-list-item-icon>

      <v-list-item-subtitle>
        {{ weather.clouds }} %
      </v-list-item-subtitle>
    </v-list-item>

    <v-divider />

    <v-card-actions color="grey">
      <v-btn
        text
        @click="redirect"
      >
        투표하러 가기
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class GameMain extends Vue {
  async asyncData () {
    try {
      const res = await this.$axios.get('/games:voting')
      if (res.data.success) {
        this.gameInfo = res.data.data
      } else {
        alert('경기정보를 가져오는데 오류가 발생함')
      }
    } catch (err) {
      console.log(err)
      alert('문제가 발생 했어!!')
    }
  }

  gameInfo = {
    idx: Number,
    title: String,
    location: String,
    startDate: String,
    startTime: String,
    tardinessTime: String,
    team1: String,
    team2: String
  }

  weather = {
    description: '',
    icon: '',
    temp: 0,
    humidity: 0,
    windSpeed: 0,
    clouds: 0
  }

  created (): void {
    this.asyncData()
    this.getWeather()
  }

  formatDate (value: string) {
    return this.$moment(String(value)).format('YYYY-MM-DD')
  }

  formatTime (value: string) {
    return this.$moment(String(value), 'HH:mm').format('HH:mm')
  }

  redirect () {
    this.$router.push({ name: 'schedule', params: { gameIdx: '1' } })
  }

  async getWeather () {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=seoul&units=&lang=kr&appid=bfaa613564b6762cbea175fd750e8735'
    try {
      const res = await this.$axios.get(url)

      this.weather.description = res.data.weather[0].description
      this.weather.temp = Math.floor((res.data.main.temp - 273.15))
      this.weather.humidity = res.data.main.humidity
      this.weather.icon = 'http://openweathermap.org/img/w/' + res.data.weather[0].icon + '.png'
      this.weather.windSpeed = res.data.wind.speed
      this.weather.clouds = res.data.clouds.all
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>

</style>
