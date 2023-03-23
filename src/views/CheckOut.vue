<template>
  <div class="checkout">
    <div class="items">
      <div class="item" v-for="item in cart" :key="item.id">
        <h3>{{ items[item.id - 1].product }}</h3>
        <p>Quantity : {{ item.quantity }}</p>
        <p>Cost : {{ items[item.id - 1].price }}</p>
        <p>Total Price : {{ items[item.id - 1].price * item.quantity }}</p>
      </div>
    </div>
    <div class="total">
      Total:
      <p>{{ cartTotal }}</p>
    </div>
    <button>Checkout</button>
  </div>
</template>

<script setup>
import items from "./objects.json";
import { useCart } from "../stores/cart";
import { onMounted, ref } from "vue";
const { getCart } = useCart();

const cart = getCart().value;
const cartTotal = ref(0);
onMounted(() => {
  let sum = 0;
  console.log("changed", cart);
  cart.forEach((item) => {
    sum += items[item.id - 1].price * item.quantity;
  });

  cartTotal.value = sum;
});
</script>

<style lang="scss" scoped>
.checkout {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .items {
    width: 90%;
    height: 80%;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    .item {
      width: 100%;
      height: 100px;
    }
  }
}
</style>
