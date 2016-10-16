'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch');

gulp.task('build:scss', function() {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));
});

gulp.task('watch:scss', function() {
	return watch('./src/scss/**/*.scss', {ignoreInitial: false}, function() {
		gulp.start('build:scss');
	});
});

gulp.task('default', ['build:scss', 'watch:scss']);
