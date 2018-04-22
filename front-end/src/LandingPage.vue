<template>
  <div id="landing-page" class="center">

    <div>
      <img id="circle-outer" src="./assets/circle-outer.svg">
      <img id="circle-inner" src="./assets/circle-inner.svg">
    </div>

    <div class="form-container">
      <h1>CSPlayer</h1>
      <form>
        <label for="partyName">Party Name</label> <br>
        <input name="partyName" type="text" v-model="partyName"> <br>

        <label for="partyPassword">Party Password</label> <br>
        <input name="partyPassword" type="password" v-model="partyPassword">
        <br>
        <button v-on:click="HostParty">Host a party</button>
        <button v-on:click="JoinParty">Join a party</button>
      </form>
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

  .form-container {
    position: relative;
    z-index: 3;
  }

  h1 {
    font-size: 8em;
  }

  form {
    text-align: center;
    font-size: 1.2em;
  }

  input {
    margin: 15px;
    text-align: center;
    background-color: rgba(22, 22, 22, 0.0);
    border-width: 0 0 1px 0;
    border-color: #e3e3e3;
    color: #e3e3e3;
  }

  button {
    border: none;
    border-radius: 10%;
    padding: 10px;
    margin: 20px;
  }

  /** 
   * All of this below is just to get goddamn spinning circles
   */
  #circle-inner {
    position: fixed;
    left: calc(50% - 330px);
    top: calc(50% - 330px);
    z-index: 2;
    animation: spin-clockwise 60s linear infinite;
  }

  #circle-outer {
    position: fixed;
    left: calc(50% - 330px);
    top: calc(50% - 330px);
    z-index: 1;
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

  /* Remove the spinning circles on mobile devices */
  @media screen and (max-width: 768px) {
    h1 {
      text-align: center;
      font-size: 5em;
      margin: 0 auto 40px;
      /* margin: 50px; */
    }
    
    #circle-inner, #circle-outer {
      display: none !important;
    }
  }
</style>
