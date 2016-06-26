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

});