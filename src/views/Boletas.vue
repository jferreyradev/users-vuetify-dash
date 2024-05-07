<script setup>
import BoletasLiq from "@/components/BoletasLiq.vue"
import { useStatefulComposable } from '@/composables/stateful.js'

const { globalState } = useStatefulComposable()
</script>

<template>
  <div>
    <h1>Panel de boletas</h1>

    <BoletasLiq :dni="globalState.someObject.dni" />


  </div>
</template>
