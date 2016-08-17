/**
 * Created by wert on 13.06.16.
 */

'use strict';


const FilterBuilder = function(Promise){

	/** True filter function for Promise
	 *  Takes predicate to filter and error to return in case if predicate not satisfied.
	 * @param {Function} predicate checks if object is okay
	 * @param {Error|Function|String} optErrorConstructorOrString optional error constructor to build error if predicate not satisfied
	 * @returns {Function} to pass into .then()
	 */
	const filter = function(predicate, optErrorConstructorOrString){
		if (typeof predicate !== 'function') {	// predicate should be definitely a function
			throw new TypeError('promise-filter: predicate should be a function');
		}

		let errorConstructor;

		switch (true) {
			case typeof optErrorConstructorOrString === 'function':	// it was a function! Will call it later to get error
				errorConstructor = optErrorConstructorOrString;
				break;
			case optErrorConstructorOrString instanceof Error:		// it was error instance! Will return it as is
				errorConstructor = () => optErrorConstructorOrString;
				break;
			case typeof optErrorConstructorOrString === 'string' || optErrorConstructorOrString instanceof String:	// it was string - will return Error with that text
				errorConstructor = () => new Error(optErrorConstructorOrString);
				break;
			default:
				errorConstructor = (msg) => new Error(msg);
		}

		/** function to pass into .then() */
		return function(value) {
			const result = predicate(value);
			if(!!result) {
				return Promise.resolve(value);
			} else {
				return Promise.reject(errorConstructor('Not found object to pass predicate'));
			}
		};
	};


	/** Verifies that given object is not empty: not undefined and not null */
	filter.definedOrError = function(optErrorConstructor){
		return filter(a => typeof a !== 'undefined' && a !== null, optErrorConstructor);
	};

	/** Verifies that given object is exists: not undefined and not null.
	 * If you need to return custom error use filter.definedOrError instead
	 **/
	filter.defined = filter(a => typeof a !== 'undefined' && a !== null);

	return filter;
};




module.exports = FilterBuilder;