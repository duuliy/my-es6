const assert = require("assert")

const {
    cleanObj,
    shallowClone
} = require("../lib/object")

describe('Object', function(){

    describe('#cleanObj()', () => {
        it('需要清除 age,返回{name:"duuliy"}', () => {
            assert.deepEqual(
                cleanObj({name:"duuliy",age:18},["age"],"age"),
                {
                    name:"duuliy"
                }
            );
        })
    });
    describe('#shallowClone()', () => {
        it('浅克隆 {name:"duuliy"}', () => {
            assert.deepEqual(
                shallowClone({name:"duuliy"}),
                {
                    name:"duuliy"
                }
            );
        })
    });
})