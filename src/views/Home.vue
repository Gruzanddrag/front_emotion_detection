<template>
  <div class="main">
    <header>
      <img class="logo" src="../assets/nsmilemin.png" alt="logo" width="70px" />
      <nav>
        <ul class="nav_links">
          <li><a href="#">Services</a></li>
          <li><a href="#">How it works</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </nav>
      <a href="#" class="cta"><Button id="cnt">Contact</Button></a>
    </header>
    <div class="main_parent">
      <div class="main_child">
        <hgroup>
          <h1>
            <span id="ee">E</span><span id="mm">m</span
            ><span id="oo">o</span>Def
          </h1>
        </hgroup>
        <p id="text">
          «A system built on <span id="ai">artificial intelligence</span> that
          detects <br />
          human <span id="fc">faces</span> and determines their
          <span id="em">emotions</span>».
        </p>

        <button id="goCam" @click="isVid = true">
          Let's take a look <img src="../assets/magic-wand.png" width="20px" />
        </button>
      </div>
    </div>
    <vid v-if="isVid" />
  </div>
</template>

<script>
import vid from "../components/Video";

export default {
  name: "home",
  data: function() {
    return {
      isVid: false
    };
  },
  components: {
    vid
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Josefin Sans", sans-serif;
}

*::selection {
  color: #b88b22;
  background: rgba(0, 0, 0, 0.7);
}

button,
button:active,
button:focus {
  outline: none;
}

.main {
  height: 100vh;
  color: #fff;
  font-family: "Josefin Sans", sans-serif;
  background-color: #efb730;
}

hgroup {
  font-family: "Josefin Sans", sans-serif;
  font-size: 60px;
  color: #362a53;
  text-shadow: -5px -9px 0px rgba(0, 0, 0, 0.2);
}

#ee {
  color: #388393;
}
#mm {
  color: #37647d;
}
#oo {
  color: #374969;
}

#em {
  color: #ad441a;
}
#fc {
  color: #26529c;
}
#ai {
  border-bottom: solid 2px #b80808;
}

li,
a,
button {
  font-family: "Josefin Sans", sans-serif;
  font-size: 16px;
  color: #edf0f1;
  text-decoration: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10%;
}

.logo {
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

.logo:hover {
  box-shadow: -5px -4px 0px #362a53;
}

.nav_links {
  list-style: none;
}

.nav_links li {
  display: inline-block;
  padding: 0px 20px;
}

.nav_links li a {
  transition: all 0.5s ease 0s;
}

.nav_links li a:hover {
  color: #37647d;
  transition: all 0.5 ease-in-out;
}

button#cnt {
  padding: 9px 25px;
  background-color: #37647d;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

button#cnt:hover {
  background-color: #edf0f1;
  box-shadow: -5px -4px 0px #37647d;
  color: #374969;
}

.main_parent {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 500px;
  margin: auto;
}

.main_child {
  margin: auto;
  text-align: center;

  & h1 {
    @media screen and (max-width: 430px) {
      font-size: 100px;
    }
    @media screen and (max-width: 330px) {
      font-size: 70px;
    }
  }
}

.main_child p {
  font-size: 19px;
  line-height: 25px;
}

button#goCam {
  border-radius: 50px;
  padding: 19px 35px;
  margin: 50px;
  background-color: #362a53;
  border: none;
  cursor: pointer;
  transition: all 0.9s ease 0s;
  font-size: 20px;
}

button#goCam:hover {
  background-color: #edf0f1;
  box-shadow: -5px -9px 0px #362a53;
  color: #362a53;
}
</style>
