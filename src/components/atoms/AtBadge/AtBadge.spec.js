/**
 * @jest-environment jsdom
 */

import { mount } from "@vue/test-utils"
import Badge from "./AtBadge.vue"

describe('Badge component', () => {
    it('Should render the component', () => {
        const badge = mount(Badge, {
            props: {
                label: 'Hola'
            }
        })

        expect(badge.text()).toBe("Hola")
    })
})