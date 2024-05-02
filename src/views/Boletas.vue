<script setup>
import BoletasLiq from "@/components/BoletasLiq.vue";
import { ref } from "vue";
import { useLiqStore } from "@/stores/liqStore.js";

const dni = ref("");
const store = useLiqStore();

function handleClick() {
  console.log(dni.value);
  //store.setPers(dni.value)
  store.dni = dni.value;
}
</script>

<template>
  <div>
    <h1>Panel de boletas</h1>
    <div>
      <v-text-field v-model="dni" label="DNI" outlined required></v-text-field>
      <v-btn @click="handleClick"></v-btn>
    </div>
    <BoletasLiq v-if="dni" :dni="dni"></BoletasLiq>
</div>
</template>
