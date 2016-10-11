'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var browserify = require('browserify'); 
var source = require('vinyl-source-stream');
 


gulp.task('js',function(){

	var readableStream = browserify('./app/js/main.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./app/js/'));
	return readableStream;

});


gulp.task('styles', function() {
    gulp.src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css/'));
});


/*
gulp.task('sass',function(){



})
*/

gulp.task('reload',function(){

	browserSync.reload();

});


gulp.task('watch',function(){

	browserSync.init({
		server: {
		  baseDir: 'app'
		},
	});


	gulp.watch(['app/*.html','app/css/*.css','app/js/bundle.js'],['reload']);
	gulp.watch('app/js/main.js',['js']);
	gulp.watch('app/sass/**/*.scss',['styles']);
	//gulp.watch('app/js/bundle.js',['reload']);

});

gulp.task('default',['js','styles','watch']);




