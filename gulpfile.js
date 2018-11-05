var gulp = require('gulp'),
	svgSprite = require('gulp-svg-sprites'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace')


gulp.task('svg', function () {
	return gulp.src('./src/icons/*.svg')
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				$('style').remove('style');
				$('title').remove('title');
				$('[data-name]').removeAttr('data-name');
			},
			// parserOptions: {xmlMode: false}
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
			selector: "%f",
			svg: {
				symbols: "svg-sprite.svg"
			},
			// svgPath: "%f",
			// common: "icon",
			mode: "symbols",
			preview: false,
		}))
		.pipe(gulp.dest('./src/icons/sprite'))
})