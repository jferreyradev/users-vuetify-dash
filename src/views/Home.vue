<script setup>
import { ref } from 'vue';
import { useFetch } from "@/composables/fetch.js";
import { useStatefulComposable } from '@/composables/stateful.js'
import { useRouter } from 'vue-router';
import LoginDniVerify from '@/components/LoginDniVerify.vue'

const form = ref({
  dni: '',
  password: '',
  isVerify: false
})

const URL_API = 'https://midliq-api-jr2sc3ef7gnx.deno.dev/api'

function useBoletasLiq(getId) {

  return useFetch(() => `${URL_API}/view/personaLista?Documento=${getId()}`)

}

const { data, error, isPending } = useBoletasLiq(() => form.value.dni)

const dniInput = ref('')
const passInput = ref('')

const { globalState, updateValues } = useStatefulComposable()
const router = useRouter()

function handleSubmit() {
  form.value.dni = dniInput.value
  form.value.isVerify = true
  if (data.value) {
    const obj = {
      dni: data[0].DOCUMENTO,
      nombre: data[0].NOMBRE,
      apellido: data[0].APELLIDO,
      mail: '',
      password: ''
    }
    console.log("submitting", obj.value);

    updateValues(obj, true)
  }

  console.log(globalState.someObject.dni)
  console.log(globalState.someObject.password)
  console.log(globalState.someObject.isVerify)

}

function handleLogin() {
  console.log('Login')
  console.log(globalState.someObject.dni)
  router.push('/boletas')
}

function reset() {
  form.value.dni = ''
  form.value.isVerify = false
  dniInput.value = ''
}
const submitBtn = ref();
const submit = () => submitBtn.value.click();
</script>

<template>
  <v-container>
    <v-row class="d-flex align-center justify-center mb-5">
      <h2>Ingreso a su boleta</h2>
    </v-row>
    <v-row v-if="!form.isVerify" class="d-flex align-center justify-center mb-5">
      <span>
        Debe ingresar su DNI para corroborar que se encuentra en el sistema.
      </span>
    </v-row>
    <v-form @submit.prevent="handleSubmit" ref="formEl">
      <v-row v-if="!form.isVerify" class="d-flex align-center justify-center mb-5">
        <v-col cols="3">
          <div>
            <v-text-field v-model="dniInput" color="primary" block label="Ingrese su DNI" />
            <v-btn color="primary" block class="mb-10" @click="handleSubmit">Verificar DNI</v-btn>
          </div>
          <button ref="submitBtn" type="submit" class="d-none">Submit</button>
        </v-col>
      </v-row>
      <v-row v-else class="d-flex align-center justify-center">
        <div v-if="isPending">
          <span>Verificando...</span>
        </div>
        <div v-else-if="data">
          <h2>Bienvenido</h2>
          <h3>{{ data[0].APELLIDO }} {{ data[0].NOMBRE }}</h3>
          <h4>DNI {{ data[0].DOCUMENTO }}</h4>
          <div>
            <v-text-field v-model="passInput" label="Contraseña" type="password" outlined required
              class="mt-5"></v-text-field>
            <div class="">
              <v-btn color="primary" block @click="handleLogin">Iniciar sesión</v-btn>
              <v-btn color="secondary" block @click="reset">Cancelar</v-btn>
            </div>
          </div>
        </div>

        <div v-if="form.isVerify && error">
          <span>El DNI ingresado no esta regitrado en el sistema.</span>
          <div class="mt-10">
            <v-btn color="primary" block @click="reset">Volver</v-btn>
          </div>
        </div>
      </v-row>
      <v-row>
        <LoginDniVerify />
      </v-row>
    </v-form>
  </v-container>

</template>