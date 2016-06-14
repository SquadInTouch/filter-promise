/**
 * Created by wert on 14.06.16.
 */

'use strict';

const   chai        = require('chai'),
		Promise		= require('bluebird'),
		filter      = require('../../src/index')(Promise);

const expect = chai.expect;

describe('filter-promise', () => {
	it('should pass promise content if filter is all-passing', done => {
		Promise.resolve('value').then(filter( () => true )).then( val => {
			expect(val).to.be.equal('value');
			done();
		});
	});

	it('should turn to rejected promise if filter not passed', done => {
		Promise.resolve('value').then(filter( () => false )).then( () => {
		}, () => {
			done();
		});
	});

	// it('should get value with "get"', () => {
	// 	const obj = {
	// 		one: {
	// 			two: {
	// 				three: {
	// 					name: 'John'
	// 				},
	// 				array1: [1, 2, 3],
	// 				array2: [
	// 					{id: 123},
	// 					{id: 234}
	// 				]
	// 			}
	// 		}
	// 	};
	//
	// 	expect(dotten.get(obj, ['one', 'two', 'three'])).to.be.deep.equal({name: "John"});
	// 	expect(dotten.get(obj, ['one', 'two', 'three', 'name'])).to.be.equal("John");
	// 	expect(dotten.get(obj, ['one', 'two', 'array1', 0])).to.be.equal(1);
	// 	expect(dotten.get(obj, ['one', 'two', 'array2', 0, "id"])).to.be.equal(123);
	// 	expect(dotten.get(obj, ['six', 'two', 'array2', 0, "id"])).to.be.undefined;
	// });
});