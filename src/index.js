/**
 * Created by wert on 13.06.16.
 */

'use strict';


const FilterBuilder = function(Promise){

	/** True filter function for Promise
	 *  Takes predicate to filter and error to return in case if predicate not satisfied.
	 * @param predicate checks if object is okay
	 * @param optErrorConstructor optional error constructor to build error if predicate not satisfied
	 * @returns {Function} to pass into .then()
	 */
	const filter = function(predicate, optErrorConstructor){
		const errorConstructor = optErrorConstructor || Error;	// using provided error constructor or Error's as default

		/** function to pass into .then() */
		return function(value) {
			const result = predicate(value);
			if(!!result) {
				return Promise.resolve(value);
			} else {
				return Promise.reject(new errorConstructor('Not found suitable object'));
			}
		};
	};


	/** Verifies that given object is not empty: not undefined and not null */
	filter.definedOrError = function(optErrorConstructor){
		return filter(a => typeof a !== 'undefined' && a !== null, optErrorConstructor);
	};

	/** Verifies that given object is not empty: not undefined and not null.
	 * If you need to return custom error use filter.definedOrError instead
	 **/
	filter.defined = filter(a => typeof a !== 'undefined' && a !== null);

	return filter;
};




module.exports = FilterBuilder;