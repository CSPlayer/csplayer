<template>
  <div id="app">
    <h1>Landing Page</h1>
    <form>
      <label for="partyName">Party Name</label>
      <input name="partyName" type="text" v-model="partyName">
      <label for="partyPassword">Party Password</label>
      <input name="partyPassword" type="password" v-model="partyPassword">
    </form>
    <button v-on:click="HostParty">Host a party</button>
    <button v-on:click="JoinParty">Join a party</button>
    <div style="color: red;">
      {{ error }}
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      partyName: '',
      partyPassword: '',
      error: ''
    }
  },
  methods: {
      async HostParty() {
        const response = await AuthenticationService.registerParty({
          partyName: this.partyName,
          partyPassword: this.partyPassword
        });

        if (response.data.error) {
          this.error = response.data.error;
        } else {
          this.$router.push('/host/' + response.data.partyName);
        }

      },
      async JoinParty() {
        const response = await AuthenticationService.registerGuest({
          partyName: this.partyName,
          partyPassword: this.partyPassword
        })

        if (response.data.error) {
          this.error = response.data.error;
        } else {
          this.$router.push('/guest/' + response.data.partyName + '/' + response.data.guestID);
        }
      }
  }
}
</script>

<style scoped>

</style>
