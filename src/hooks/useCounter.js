// https://mrcrmn.dev/articles/lightweight-components-with-vue3-and-jsx/
import { ref } from '@vue'

export default function useCounter() {
    const count = ref(0)
    const increment = () => count.value++
    return { count, increment }
}