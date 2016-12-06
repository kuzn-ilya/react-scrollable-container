import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';

import { omit } from '../../sources/utils/omit';

const expect = chai.expect;
chai.use(chaiSpies);

describe('omit', () => {
    it('should be identity if no properties is provided', () => {
        let obj = {
            x: 1
        };
        let result = omit(obj);
        expect(result).has.property('x', 1);
    });

    it('should remove property', () => {
        let obj = {
            x: 1
        };
        let result = omit(obj, 'x');
        expect(result).has.not.property('x');
    });

    it('should leave property which is not mentioned as a key', () => {
        let obj = {
            x: 1,
            y: 2
        };
        let result = omit(obj, 'x');
        expect(result).has.property('y', 2);
    });
});
