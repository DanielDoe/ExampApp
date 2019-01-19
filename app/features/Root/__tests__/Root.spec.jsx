import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Root from '../Root';

describe('Test: Root Component', () => {
    const component = <Root />;
    const wrapper = shallow(component);

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
