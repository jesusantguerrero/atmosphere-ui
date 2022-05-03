import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/vue"
import AtSideItem from "./AtSideItem.vue"

describe('AtSideItem.vue', () => {
    it('should render the correct markup', async () => {
        render(AtSideItem, {
            props: {
                label: 'Home',
                to: '/',
                icon: ' fa-home',
                as: 'a'
            }
        })
    
        screen.getByText('Home')
        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
    })
})
