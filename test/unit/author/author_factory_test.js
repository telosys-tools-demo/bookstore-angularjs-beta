'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('author.module'));
  
  describe('Author', function(){
	var $httpBackend, Author;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Author = $injector.get('Author');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it('getAll', function() {
    	$httpBackend.when('GET', 'http://localhost:8080/bookstore/rest/author').respond("test");
    	Author.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', 'http://localhost:8080/bookstore/rest/author/1').respond("test");
    	Author.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Author.create({id:null,name:'author'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('author.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', 'http://localhost:8080/bookstore/rest/author').respond("test");
    	Author.create({id:'1',name:'author'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Author.update({id:null,name:'author'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('author.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', 'http://localhost:8080/bookstore/rest/author/1').respond("test");
    	Author.update({id:'1',name:'author'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', 'http://localhost:8080/bookstore/rest/author/1').respond("test");
    	Author.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});