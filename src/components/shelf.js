
import { ref, onMounted } from 'vue'

export function useShelf(refShelf) {
    let focused = ref(0)
    let selected = ref(null)

    onMounted(() =>
        refShelf.value.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                let numElements = refShelf.value.children.length
                if (event.key === 'ArrowRight') {
                    focused.value++
                    if (focused.value == numElements) {
                        focused.value = 0
                    }
                } else {
                    focused.value--
                    if (focused.value < 0) {
                        focused.value = numElements - 1
                    }
                }

                refShelf.value.children[focused.value].focus()
            } else if (event.key === 'Enter') {
                selected.value = focused.value
            }
        }))

    const focus = ({ which }) => focused.value = which
    const select = ({ which }) => {
        selected.value = which
    }
    const clear = () => {
        focused.value = 0
        selected.value = null
    }

    return { focused, selected, focus, select, clear }
}
