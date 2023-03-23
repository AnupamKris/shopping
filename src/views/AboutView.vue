<template>
  <transition>
    <div class="register" v-if="mode == 'register'">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <input
        type="password"
        v-model="repassword"
        placeholder="Retype Password"
      />
      <button @click="register">Register</button>
      <p>Already have an account <a @click="mode = 'login'">Sign In?</a></p>
    </div>
    <div class="login" v-else>
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="login">Login</button>
      <p>Don't have an account <a @click="mode = 'register'">Sign Up?</a></p>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";
import { db, auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import router from "../router";
const mode = ref("login");

const email = ref("");
const password = ref("");
const repassword = ref("");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid);
    router.push("/");
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const login = async () => {
  console.log("login");
  const user = await signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
  )
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const register = async () => {
  console.log("register");
  if (password.value === repassword.value) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Registered Successfully");
        router.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  } else {
    alert("Passwords don't match");
  }
};
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
