<template>
  <div id="landing-page">

    <div id="circles-container" class="page-center">
      <img id="circle-outer" class="circles" src="./assets/circle-outer.svg">
      <img id="circle-inner" class="circles" src="./assets/circle-inner.svg">
    </div>

    <div class="page-center">
      <h1>CSPlayer</h1>
      <form>
        <label for="partyName">Party Name</label> <br>
        <input name="partyName" type="text" v-model="partyName"> <br>

        <label for="partyPassword">Party Password</label> <br>
        <input name="partyPassword" type="password" v-model="partyPassword">
      </form>
      <button v-on:click="HostParty">Host a party</button>
      <button v-on:click="JoinParty">Join a party</button>
      <div style="color: red;">
        {{ error }}
      </div>
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

        //if the back-end had an issue, display the error
        if (response.data.error) {
          this.error = response.data.error;
        } else {
          //otherwise go to the host page
          this.$router.push('/host/' + response.data.partyName);
        }

      },
      async JoinParty() {
        const response = await AuthenticationService.registerGuest({
          partyName: this.partyName,
          partyPassword: this.partyPassword
        })

        //if the back-end had an issue, display the error
        if (response.data.error) {
          this.error = response.data.error;
        } else {
          //otherwise go to the host page
          this.$router.push('/guest/' + response.data.partyName + '/' + response.data.guestID);
        }
      }
  }
}
</script>

<style scoped>
  #landing-page {
    height: 100%;
    color: #e3e3e3;
  }
 
  h1 {
    font-size: 8em;
  }

  form {
    margin: 20px;
    font-size: 1.2em;
  }

  form input {
    margin: 14px;
    text-align: center;
    background-color: rgba(34, 34, 34, 0.0);
    border-width: 0 0 1px 0;
    border-color: #e3e3e3;
    color: #e3e3e3;
  }

  button {
    border: none;
    border-radius: 10%;
    padding: 10px;
    margin: auto 10px;
  }

  .page-center {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /** 
   * All of this below is just to get goddamn spinning circles
   */
  .circles {
    position: absolute;
    left: -330px;
    top: -330px;
  }

  #circle-inner {
    z-index: 5;
    animation: spin-clockwise 60s linear infinite;
  }

  #circle-outer {
    z-index: 6;
    animation: spin-counterclockwise 70s linear infinite;
  }

  @keyframes spin-clockwise {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-counterclockwise {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }
</style>
