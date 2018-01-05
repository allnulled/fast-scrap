# Fast Scrapper

## 1. About

**Fast Scrapper** is a small utility to ease the routine of scrapping data from external websites. It is based on ScrapperJS (which is based on CasperJS, and PhantomJS).

## 2. Why?

Just to reduce the effort of writing a new scrapper each time one has to get some data from other sites.

## 3. Installation

In order to use FastScrap, you only need to import the `fast-scrap.js` in your `*.js` file, like this:

    var FastScrap = require("fast-scrap.js");


## 4. Usage

Use FastScrap calling its method `run`, and passing to it an object with all the required parameters for the scrapping.

In the `example.js` file you can find a real example, that will create a file, `dummyexample.html`, with the title of `http://www.example.com`. 

This is how we can call the `FastScrap.run({...})` method (all the parameters are required):

    FastScrap.run({
	    routes: ["http://www.example.com"],
	    urlPattern: "*",
	    mode: "static",
	    onStart: function() {
            // Here, the initial operations
            // Typically, start an empty file, or so
	    },
	    onLoad: function($) {
	        // Here, retrieve the data from page
	        // jQuery is available already. 
	        // Example:
	    	return $("h1").eq(0).html();
	    },
	    onFail: function(url) {
            // Here, manage the failed scraps
            // Typically, log some error
	    },
	    onStore: function(data, utils) {
	    	// Here, store the scrapped data
	    	// Typically, persisting the data
	    },
	    onFinish: function() {
            // Here, the conclusive operations
            // Typically, to close things
	    }
    });

## 5. Notes

You can scrap multiple URLs effortlessly with FastScrap, passing all the routes you want to scrap the same way.

Take into account that FastScrap will only allow you to run 1 instance at a time. On the other hand, it will also help to you to separate the different scrappings that you want to do, forcing either to put conditionals in the code, or simply separating the different scraps you want to perform in different files.

It was thought for simple small scraps, not for testing, neither for crawling. Who knows, maybe with time it's improved, but currently, this is how it comes.


## 6. License

Scrap them all (for free, of course). 

Feel free to use and abuse it without feedback.