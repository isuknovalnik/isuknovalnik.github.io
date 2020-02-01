var gulp = require("gulp");
var stylus = require("gulp-stylus");
var rupture = require("rupture");
var gcmq = require("gulp-group-css-media-queries");
var autoprefixer = require("autoprefixer-stylus");
var server = require("browser-sync");
var jsmin = require('gulp-jsmin');
var rename = require("gulp-rename");


gulp.task("stylus", function() {
	gulp.src("stylus/style.styl")
		.pipe(stylus({
			use: [
				rupture(),
				autoprefixer({ browsers: [
					"last 1 version",
					"last 2 Chrome versions",
					"last 2 Firefox versions",
					"last 2 Opera versions",
					"last 2 Edge versions"
				]})
			]
		}))
	.pipe(gcmq())
	.pipe(gulp.dest("css"));
	gulp.src("stylus/portfolio.styl")
		.pipe(stylus({
			use: [
				rupture(),
				autoprefixer({ browsers: [
					"last 1 version",
					"last 2 Chrome versions",
					"last 2 Firefox versions",
					"last 2 Opera versions",
					"last 2 Edge versions"
				]})
			]
		}))
	.pipe(gcmq())
	.pipe(gulp.dest("css"));
	gulp.src("stylus/toad.styl")
		.pipe(stylus({
			use: [
				rupture(),
				autoprefixer({ browsers: [
					"last 1 version",
					"last 2 Chrome versions",
					"last 2 Firefox versions",
					"last 2 Opera versions",
					"last 2 Edge versions"
				]})
			]
		}))
	.pipe(gcmq())
	.pipe(gulp.dest("css"));
});

gulp.task("serve", function() {
	server.init({
		server: ".",
		open: false
	});
});

gulp.task("jscript", function () {
	gulp.src("js/**/*.js")
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest("js"));
});
