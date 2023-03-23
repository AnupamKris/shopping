import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCart = defineStore("cart", () => {
  const cart = ref([]);
  const setCart = (newVal) => {
    cart.value = newVal;
  };
  const getCart = () => {
    return cart.value;
  };

  return { cart, getCart, setCart };
});
