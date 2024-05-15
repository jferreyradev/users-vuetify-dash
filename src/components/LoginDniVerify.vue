<script setup>
import { useStatefulComposable } from '@/composables/stateful.js'
import { useFetch } from "@/composables/fetch.js";

const { globalState, updateValues } = useStatefulComposable()

const URL_API = 'https://midliq-api-jr2sc3ef7gnx.deno.dev/api'

function useRegisterCheck(getId) {
  return useFetch(() => `${URL_API}/view/users?DNI=${getId()}`)
}

const { data, error, isPending } = useRegisterCheck(() => globalState.someObject.dni)

</script>

<template>
    <div v-if="!data">
      <h2>Debe registarse</h2>
    </div>
      <span>
        {{ globalState.someObject }}
      </span>
</template>