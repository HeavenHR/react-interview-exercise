import React from 'react';
import Gender from './Gender';
import * as genders from '../constants/GenderTypes';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import * as sinon from 'sinon';

enzyme.configure({ adapter: new Adapter() });

describe('<Gender />', () => {
    test('should render gender with correct selected value', () => {
        const props = {
            gender: genders.GENDER_TYPE.MALE
        };

        const gender = enzyme.shallow(<Gender {...props} />);
        expect(gender.find('select').prop('value')).toBe(props.gender);

    });

    test('should trigger callback properly when the value is changed', () => {
        const onChange = sinon.spy();
        const props = {
            gender: genders.GENDER_TYPE.FEMALE,
            genderChanged: onChange,
        };

        const gender = enzyme.shallow(<Gender {...props} />);
        const event = {target: {name: "selectChange", value: genders.GENDER_TYPE.MALE}};
        gender.find('select').simulate('change', event);
        expect(onChange.called).toBeTruthy();
    });
});