<script>
const dniInput = ref('')
const URL_API = 'https://midliq-api-jr2sc3ef7gnx.deno.dev/api'

function useBoletasLiq(getId) {

  return useFetch(() => `${URL_API}/view/personaLista?Documento=${getId()}`)

}
const dniInput = ref('')

const { globalState, updateValues } = useStatefulComposable()

function handleSubmit() {
  form.value.dni = dniInput.value
  form.value.isVerify = true
  console.log("submitting", form.value);
  updateValues(form, true)
  console.log(globalState.someObject.dni)
  console.log(globalState.someObject.password)
  console.log(globalState.someObject.isVerify)

}
</script>

<template>
  <v-container>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="auto">
        <v-text-field v-model="dniInput" color="primary" block label="Ingrese su DNI" />
        <v-btn color="primary" block class="mb-10" @click="handleSubmit">Verificar DNI</v-btn>

      </v-col>


    </v-row>

    <button ref="submitBtn" type="submit" class="d-none">Submit</button>
  </v-container>

</template>