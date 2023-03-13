
import { ref, onMounted } from 'vue'

/**
 * A shelf is a collection of elements that a user navigates to as a group using
 * tab. Once a user has navigated to the shelf, they use the arrow keys to
 * select one of its elements. The shelf helps keyboard users quikly skip past
 * groups of interactive elements on the page. Shelves use aria-* labels for
 * accessibility.
 * 
 * The shelf maintains two states: the index of the currently focused element,
 * and the index of the currently selected element (or null if no element is
 * selected).
 * 
 * The shelf exposes three functions:
 * 
 * - `focus(which)` will change the focused element (but does not trigger a
 *   focus event).
 * - `select(which)` will change the selected element.
 * - `clear()` will reset the selected and focused state to their initial values.
 * 
 * @param refShelf must be a ref to an element whose immediate children are the
 *                 elements of the shelf.
 */
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
                if (selected.value === focused.value) {
                    selected.value = null;
                } else {
                    selected.value = focused.value
                }
            }
        }))

    const focus = (which) => focused.value = which
    const select = (which) => {
        selected.value = which
    }
    const clear = () => {
        focused.value = 0
        selected.value = null
    }

    return { focused, selected, focus, select, clear }
}
