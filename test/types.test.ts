///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
///<reference path="../typings/tsd.d.ts" />

import {Model, Models} from '../types'

import Immutable = require('immutable');
import chai = require('chai');
const assert = chai.assert;

describe('types#Models', function () {

    describe('#toNumber()', function () {
        const toNumber = Models.toNumber;

        it('return 0 from an empty set', function () {
            assert(0 == toNumber(Immutable.Set<Model>()), 'Empty set was not zero');
        });

        it('single entry set should hold single value with set', function () {
            assert(Model.CLASS === toNumber(Immutable.Set.of(Model.CLASS)),
                'Single entry set did not return entry');
        });

        it('properly merge set to "or" set', function () {
            const testSet = Immutable.Set.of(Model.CLASS, Model.STATE_MACHINE);
            assert((Model.CLASS | Model.STATE_MACHINE) === toNumber(testSet),
                'Single entry set did not return entry');
        });
    });

    describe('#fromNumber()', function () {
        const fromNumber = Models.fromNumber;

        it('return an empty set from 0', function () {
            assert(fromNumber(0) == Immutable.Set<Model>(), 'Zero did not return empty set');
        });

        it('single entry set should hold single value with set', function () {
            assert(Immutable.is(fromNumber(Model.CLASS), Immutable.Set.of(Model.CLASS)), 'Single entry set did not return entry');
        });

        it('properly merge set to "or" set', function () {
            const testSet = Immutable.Set.of(Model.CLASS, Model.STATE_MACHINE);
            assert(Immutable.is(fromNumber(Model.CLASS | Model.STATE_MACHINE), testSet), 'Merging set to OR did not work');
        });
    });

    describe('#composite()', function () {
        it('creates a set with CLASS and STATE_MACHINE', function () {
            assert(Immutable.is(Models.composite(), Immutable.Set.of(Model.CLASS, Model.STATE_MACHINE)), 'Zero did not return empty set');
        });
    });
});
