<script setup>
const props = defineProps(['title', 'subtitle'])
</script>
<template>
  <v-row>
    <h3>{{ props.title }}</h3>
  </v-row>
  <v-row>
    <span>{{ props.subtitle }}</span>
    <v-spacer></v-spacer>
  </v-row>
  <v-row>
    <slot></slot>
  </v-row>
</template>
