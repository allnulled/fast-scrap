var FastScrap = {};
var scraperjs = require("scraperjs");
var router = new scraperjs.Router();
FastScrap.run = function(optionsParam) {
	var options = {};
	options.routesFile = optionsParam.routesFile;
	options.routes = optionsParam.routes || JSON.parse(require("fs").readFileSync(options.routesFile, "utf8"));
	options.urlPattern = optionsParam.urlPattern;
	options.mode = optionsParam.mode;
	options.onStart = optionsParam.onStart;
	options.onLoad = optionsParam.onLoad;
	options.onStore = optionsParam.onStore;
	options.onFinish = optionsParam.onFinish;
	options.onFail = optionsParam.onFail;
	var scope = {};
	scope.options = options;
	router.otherwise(options.onFail.bind(scope))
		.on(options.urlPattern)[options.mode === "static" ? "createStatic" : "createDynamic"]()
		.scrape(options.onLoad.bind(scope))
		.then(options.onStore.bind(scope));
	var counter = 0;
	scope.getNext = function() {
		scope.currentTarget = options.routes[counter++];
		return scope.currentTarget;
	};
	function scrapNext() {
		var url = scope.getNext();
		if(typeof url === "undefined") {
			options.onFinish.call(scope);
		} else {
			router.route(url, function() {
				console.log("Scrap done for: " + scope.currentTarget);
				scrapNext();
			});
		}
	};
	options.onStart.call(scope);
	scrapNext();
};
module.exports = FastScrap;
