// fetch.js
import { ref, watchEffect } from 'vue'

export function useFetch(getUrl, type, body) {
    const error = ref(null)
    const isPending = ref(false)
    const data = ref({});

    watchEffect(() => {
        isPending.value = true
        data.value = null
        error.value = null

        let requestOptions;
        
        if (body) {
            requestOptions = {
                method: `${type}`, // POST, etc
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            };
        }
    
        console.log('fetch ', getUrl())
    
        fetch(getUrl(), requestOptions ? requestOptions : null)
          .then((res) => res.json())
          .then((_data) => {
            data.value = _data
            isPending.value = false
          })
          .catch((err) => {
            error.value = err
            isPending.value = false
          })
      })

    return { data, error, isPending }
}
