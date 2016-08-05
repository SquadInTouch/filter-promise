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

	it('should turn to rejected promise is error thrown in predicate', done => {
		Promise.resolve('value')
			.then(filter( str => {
				throw new Error('Holly Cow!');
			}))
			.then(
				str => console.err('This should not happen'),
				err => done()
			);
	});

	it('should be able to build error from string', done => {
		Promise.resolve()
			.then(filter( () => false, 'This is error'))
			.catch( err => {
				expect(err.message).to.be.equal('This is error');
				done();
			});
	});

	it('should be able to build error from Error', done => {
		Promise.resolve()
			.then(filter( () => false))
			.catch( err => {
				expect(err instanceof Error).to.be.true;
				expect(err.message).to.be.defined;
				expect(err.message).to.be.a('string');
				done();
			});
	});

	it('should be able to build error from custom error', done => {
		const CustomError = function () {
			this.isCustomError = true;
		};
		CustomError.prototype = new Error();

		Promise.resolve()
			.then(filter( () => false, () => new CustomError))
			.catch( err => {
				expect(err.isCustomError).to.be.true;
				expect(err.message).to.be.defined;
				expect(err.message).to.be.a('string');
				done();
			});
	});
});