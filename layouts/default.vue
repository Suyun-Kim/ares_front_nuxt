<template>
  <v-app class="grey darken-4">
    <v-container v-if="$route.path !== '/login'">
      <v-navigation-drawer
        v-model="drawer"
        :clipped="clipped"
        fixed
        app
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        :clipped-left="clipped"
        fixed
        app
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer />
      </v-app-bar>
    </v-container>
    <v-main>
      <v-container fill-height fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} ARES FootBall Club</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: '홈',
          to: '/main'
        },
        {
          icon: 'mdi-clock',
          title: '출석체크',
          to: '/checkIn'
        },
        {
          icon: 'mdi-pencil',
          title: '공지사항',
          to: '/'

        },
        {
          icon: 'mdi-calendar',
          title: '경기관리',
          to: '/match'
        },
        {
          icon: 'mdi-account',
          title: '마이페이지',
          to: '/'
        }
      ],
      title: 'ARES'
    }
  }
}
</script>
