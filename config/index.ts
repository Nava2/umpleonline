///<reference path='../typings/tsd.d.ts' />

/**
 * This is included to allow quick `require()` calls
 */

export = require('./' + (process.env.NODE_ENV || 'development') + '.json');
