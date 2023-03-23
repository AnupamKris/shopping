<script setup>
import TheWelcome from "../components/TheWelcome.vue";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import router from "../router";
import cards from "./objects.json";
import { ref, computed, watch } from "vue";
import { useCart } from "../stores/cart";

const cart = ref([]);
const cartPreview = ref(false);
const cartTotal = ref(0);
const { getCart, setCart } = useCart();
watch(cart.value, () => {
  let sum = 0;
  console.log("changed", cart.value);
  cart.value.forEach((item) => {
    sum += cards[item.id - 1].price * item.quantity;
  });

  cartTotal.value = sum;
});

const addToCart = (id) => {
  const index = cart.value.findIndex((item) => item.id === id);
  if (index === -1) {
    cart.value.push({ id, quantity: 1 });
  } else {
    cart.value[index].quantity++;
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid);

    // ...
  } else {
    // User is signed out
    // ...
    router.push("/about");
  }
});

const signOutUser = async () => {
  await signOut(auth)
    .then(() => {
      // Sign-out successful.
      router.push("/about");
    })
    .catch((error) => {
      // An error happened.
    });
};

const proceedToCheckout = () => {
  setCart(cart);
  router.push("/checkout");
};
</script>

<template>
  <div class="home">
    <nav>
      <button @click="signOutUser">Signout</button>
      <div class="cart">
        <p @click="cartPreview = !cartPreview">Cart</p>
        <div class="cart-preview" v-if="cartPreview">
          <p>{{ cart.length }} items</p>
          <p>Total : {{ cartTotal }}</p>
          <button @click="proceedToCheckout">Proceed to CheckouT</button>
        </div>
      </div>
    </nav>
    <div class="cards">
      <div class="card" v-for="card in cards" :key="card.id">
        <h3>{{ card.product }}</h3>
        <p>{{ card.price }}</p>
        <p>{{ card.rating }}</p>
        <button @click="addToCart(card.id)">Add To Cart</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  width: 100vw;
}
.cards {
  height: 80%;
  width: 100%;

  display: flex;
  align-items: center;

  flex-wrap: wrap;

  .card {
    height: 150px;
    width: 150px;

    margin: 10px;
    background: #ececec;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
