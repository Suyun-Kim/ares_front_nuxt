<template>
  <v-card
    class="mx-auto"
    width="25em"
    height="45em"
  >
    <v-card-text>
      <div class="mb-6">
        Week's Match
        <v-badge
          color="blue-grey"
          inline
          content="투표완료"
        />
      </div>
      <p class="text-h4 text--primary">
        {{ gameInfo.title }}
      </p>
      <p>
        {{ formatDate(gameInfo.startDate) }} {{ formatTime(gameInfo.startTime) }} / Late time :
        {{ formatTime(gameInfo.tardinessTime) }}
      </p>
      <div class="text--primary">
        {{ gameInfo.team1 }} vs {{ gameInfo.team2 }}
      </div>
    </v-card-text>
    <v-card-actions
      class="mb-6"
    >
      <v-btn
        class="text-dark font-weight-bold"
        color="grey lighten-5 accent-4"
        width="10em"
        @click="addVote(gameInfo.idx, true)"
      >
        참 석
      </v-btn>
      <v-btn
        color="grey darken-2 accent-4"
        @click="addVote(gameInfo.idx, false)"
      >
        불 참
      </v-btn>
    </v-card-actions>

    <v-container
      class="mb-6"
    >
      <v-row
        no-gutters
        class="pa-2 text-center text-no-wrap rounded-lg rounded-b-0 grey lighten-5"
      >
        <v-col>
          <v-card
            class="pa-2 grey lighten-5 black--text"
            outlined
            tile
          >
            전체
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="pa-2 grey lighten-5 black--text"
            outlined
            tile
          >
            참석
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="pa-2 grey lighten-5 black--text"
            outlined
            tile
          >
            불참
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="pa-2 grey lighten-5 black--text"
            outlined
            tile
          >
            미투표
          </v-card>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="pa-2 text-center text-no-wrap rounded-lg rounded-t-0 grey darken-2"
      >
        <v-col>
          <v-card
            class="pa-2 grey darken-2"
            outlined
            tile
          >
            {{ gameInfo.memberCount }}
          </v-card>
        </v-col>

        <v-col>
          <v-card
            class="pa-2 grey darken-2"
            outlined
            tile
          >
            {{ gameInfo.voteCount }}
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="pa-2 grey darken-2"
            outlined
            tile
          >
            {{ gameInfo.notVoteCount }}
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="pa-2 grey darken-2"
            outlined
            tile
          >
            {{ gameInfo.noVoteCount }}
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-card-text>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          scrollable
          max-width="300px"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              color="text--primary deep-purple accent-4"
              dark
              v-bind="attrs"
              height="3em"
              class="font-weight-light"
              v-on="on"
            >
              투표인원 확인하기
            </v-btn>
          </template>
          <v-card>
            <v-card-title>투표목록</v-card-title>
            <v-divider />
            <v-card-text style="height: 30em;">
              <v-container>
                <v-row class="text-center">
                  <v-col>
                    {{ gameInfo.team1 }}
                  </v-col>
                  <v-col>
                    {{ gameInfo.team2 }}
                  </v-col>
                </v-row>
                <v-row class="text-center">
                  <v-col>
                    <p class="deep-purple accent-4 white--text">
                      참석 ({{ team1VoteMembers.length }}명)
                    </p>
                    <v-row
                      v-for="item in team1VoteMembers"
                      :key="item.memberId"
                    >
                      <v-col class="white--text">
                        {{ item.memberName }}
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <p class="deep-purple accent-4 white--text">
                      참석 ({{ team2VoteMembers.length }}명)
                    </p>
                    <v-row
                      v-for="item in team2VoteMembers"
                      :key="item.memberId"
                    >
                      <v-col class="white--text">
                        {{ item.memberName }}
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row class="text-center">
                  <v-col>
                    <p class="white black--text">
                      불참 ({{ team1NotVoteMembers.length }}명)
                    </p>
                    <v-row
                      v-for="item in team1NotVoteMembers"
                      :key="item.memberId"
                    >
                      <v-col class="white--text">
                        {{ item.memberName }}
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <p class="white black--text">
                      불참 ({{ team2NotVoteMembers.length }}명)
                    </p>
                    <v-row
                      v-for="item in team2NotVoteMembers"
                      :key="item.memberId"
                    >
                      <v-col class="white--text">
                        {{ item.memberName }}
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row class="text-center">
                  <v-col>
                    <p class="grey lighten-1 black--text">
                      미투표 ({{ team1NoVoteMembers.length }}명)
                    </p>
                    <v-row
                      v-for="item in team1NoVoteMembers"
                      :key="item.memberId"
                    >
                      <v-col class="white--text">
                        {{ item.memberName }}
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <p class="grey lighten-1 black--text">
                      미투표 ({{ team2NoVoteMembers.length }}명)
                    </p>
                    <v-row
                      v-for="item in team2NoVoteMembers"
                      :key="item.memberId"
                    >
                      <v-col class="white--text">
                        {{ item.memberName }}
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
              <v-btn
                text
                @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Schedule extends Vue {
  created (): void {
    this.asyncData()
  }

  gameInfo = {
    idx: 0,
    team1: '',
    team2: '',
    title: '',
    location: '',
    otherTeam: '',
    startDate: '',
    startTime: '',
    tardinessTime: '',
    memberCount: 0,
    voteCount: 0,
    notVoteCount: 0,
    noVoteCount: 0
  }

  team1VoteMembers = Array
  team2VoteMembers = Array
  team1NotVoteMembers = Array
  team2NotVoteMembers = Array
  team1NoVoteMembers = Array
  team2NoVoteMembers = Array

  dialog: boolean = false

  async asyncData () {
    const res = await this.$axios.$get('/games/' + this.$route.params.gameIdx)

    this.gameInfo = res.data.gameInfo
    this.team1VoteMembers = res.data.team1VoteList
    this.team2VoteMembers = res.data.team2VoteList
    this.team1NotVoteMembers = res.data.team1NotVoteList
    this.team2NotVoteMembers = res.data.team2NotVoteList
    this.team1NoVoteMembers = res.data.team1NoVoteList
    this.team2NoVoteMembers = res.data.team2NoVoteList

    this.gameInfo.voteCount = (Number(this.team1VoteMembers.length) + (Number(this.team2VoteMembers.length)))
    this.gameInfo.notVoteCount = (Number(this.team1NotVoteMembers.length) + (Number(this.team2NotVoteMembers.length)))
    this.gameInfo.noVoteCount = (Number(this.team1NoVoteMembers.length) + (Number(this.team2NoVoteMembers.length)))
    this.gameInfo.memberCount = (Number(this.gameInfo.voteCount) + (Number(this.gameInfo.notVoteCount)) + (Number(this.gameInfo.noVoteCount)))
  }

  async addVote (gameIdx: number, isVote: boolean) {

    const data = {
      gameIdx,
      memberIdx: this.$store.getters.auth.id,
      isVote : isVote

    }

    try {
      const res = await this.$axios.$post('/votes', data)
      if (res.success) {
        this.asyncData()
        alert('투표완료')
      }
    } catch (err) {
      console.error(err)
    }
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

.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 30px;
  border-radius: 12px;
  background-color: white;
  border-color: black;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  color: black;
}

.wrapper > div {
  height: 30px;
  line-height: 30px;
}

.wrapper > div:nth-child(1) {
  border-radius: 12px 0 0 0 / 12px 0 0 0;
}

.wrapper > div:nth-child(4) {
  border-radius: 0 12px 0 0 / 0 12px 0 0;
}

.wrapper > div:nth-child(5) {
  border-radius: 0 0 0 12px / 0 0 0 12px;
}

.wrapper > div:nth-child(8) {
  border-radius: 0 0 12px 0 / 0 0 12px 0;
}

.classification {
  border-color: white;
  background-color: #343a40;
  color: white;

}

.item {
  border-color: white;
}

.personnel {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
}

#vote-table {
  width: 100%;
  height: 35vh;
  max-height: 350px;
}

#vote-table table {
  width: 50%;
}

#vote-table table th {
  width: 50%;
}

#vote-table table tr {
  height: 3vh;

}

</style>
