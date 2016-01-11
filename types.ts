///<reference path='node_modules/immutable/dist/immutable.d.ts'/>

import Immutable = require('immutable');

/**
 * The type of a model
 */
export enum Model {

    /**
     * Class models are akin to UML diagrams
     */
    CLASS = 0x01,

    /**
     * A State machine model
     */
    STATE_MACHINE = 0x02,

    /**
     * Used only in the Manual
     */
    MANUAL = 0x04
}

export class Models {

    /**
     * Shortcut for a composite model
     * @return {any}
     */
    static composite(): Immutable.Set<Model> {
        return Immutable.Set.of(Model.CLASS, Model.STATE_MACHINE);
    }

    /**
     * Converts a set of Model values into a single number
     * @param modelSet Model values
     * @return {number}
     */
    static toNumber(modelSet: Immutable.Set<Model>): number {
       return modelSet.reduce((out, value) => (out | value), 0);
    }

    /**
     * Gets all of the Model flags
     * @param value combination value
     * @return {Set<Model>}
     */
    static fromNumber(value: number): Immutable.Set<Model> {
        function check(list: Model[], check: Model) {
            if ((check & value) === check) {
                list.push(check);
            }

            return list;
        }

        var list: Model[] = check([], Model.CLASS);
        list = check(list, Model.STATE_MACHINE);
        list = check(list, Model.MANUAL);

        return Immutable.Set(list);
    }
}

/**
 * Denotes the type of a file, i.e. a user file was created by a user
 */
export enum File {
    EXAMPLE = 1,
    USER = 2
}

