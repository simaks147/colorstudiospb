var gulp           = require('gulp'),
	gutil          = require('gulp-util' ),
	scss           = require('gulp-sass'),
	browserSync    = require('browser-sync'),
	concat         = require('gulp-concat'),
	uglify         = require('gulp-uglify'),
	cleanCSS       = require('gulp-clean-css'),
	rename         = require('gulp-rename'),
	del            = require('del'),
	imagemin       = require('gulp-imagemin'),
	cache          = require('gulp-cache'),
	autoprefixer   = require('gulp-autoprefixer'),
	ftp            = require('vinyl-ftp'),
	notify         = require("gulp-notify"),
	devip 		   = require('dev-ip');


// scripts
gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery.min.js',
		'app/libs/materialize/materialize.js',
		'app/libs/slick/slick.min.js',
		'app/libs/lightgallery/lightgallery.min.js',
		'app/js/main.js' // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}))
	.pipe(notify("Success!"));
});


// styles
gulp.task('scss', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(scss()
	.on("error", notify.onError()))
	.pipe(rename({basename: "style", suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 20 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
	.pipe(notify("Success!"));
});


// images
gulp.task('images', function() {
	return gulp.src('app/img/**/*')
	// .pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img'));
});


// browser
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});


// watcher
gulp.task('watch', ['scss', 'scripts', 'browser-sync'], function() {
	gulp.watch('app/scss/**/*.scss', ['scss']);
	gulp.watch(['app/libs/**/*.js', 'app/js/main.js'], ['scripts']);
	gulp.watch('app/*.html', browserSync.reload);
});


// build
gulp.task('build', ['removedist', 'images', 'scss', 'scripts'], function() {

	var buildFiles = gulp.src(
		'app/*.html'
		).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/style.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		'app/libs/modernizr-custom.js'
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

	var buildFavicon = gulp.src([
		'app/favicon/*',
		]).pipe(gulp.dest('dist/favicon'));

});


// hosting
gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});


// remove the project folder
gulp.task('removedist', function() { return del.sync('dist'); });


// clearing cache
gulp.task('clearcache', function () { return cache.clearAll(); });


// default task
gulp.task('default', ['watch']);
