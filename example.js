var FastScrap = require("./fast-scrap.js");
var fs = require("fs");
var FILENAME = "dummyexample.html";

FastScrap.run({
	routes: ["http://www.example.com"],
	urlPattern: "*",
	mode: "static",
	onStart: function() {
		fs.writeFileSync(FILENAME, "<!DOCTYPE html><html><head><meta charset=\"utf-8\"/><title>Scrapped data</title></head><body>", "utf8");
	},
	onLoad: function($) {
		return $("h1").eq(0).html();
	},
	onFail: function(url) {
		console.log("URL " + url + " could not be scrapped.");
	},
	onStore: function(data, utils) {
		fs.appendFileSync(FILENAME, '<div class="data-block"><h4>Scrap: ' + this.currentTarget + '</h4><div>' + data + '</div></div>');
	},
	onFinish: function() {
		fs.appendFileSync(FILENAME, "</body></html>", "utf8");
	}
});