/* global describe, it */

(function () {
    'use strict';

    var assert = require('assert');
    describe('TDD & BDD is integrated', function () {
        describe('have to come up with some test cases', function () {
            it('it should should show that unit tests are there', function () {
                assert.equal(-1, [1,2,3].indexOf(5));
                assert.equal(-1, [1,2,3].indexOf(0));
            });
        });
    });
})();
