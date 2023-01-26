<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CommonComponent extends Vue {
  redirect (url: string) {
    alert(url)
    this.$router.push({ name: url })
  }
}
</script>
