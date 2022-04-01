import { wrapper } from "vue-test-utils"
import Badge from "./AtBadge.vue"

describe('Badge component', () => {
    it('Should render the component', () => {
        const badge = wrapper(Badge, {
            props: {
                label: 'Hola'
            }
        })

        expect(badge.text()).toBe("Hola")
    })
})