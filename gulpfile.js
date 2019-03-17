'use strict';
// gulp 4

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	minify = require('gulp-minify'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	cssmin = require('gulp-csso'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

var path = {
	build: {
			html: 'public_html/',
			js: 'public_html/js/',
			css: 'public_html/css/',
			img: 'public_html/img/',
			fonts: 'public_html/fonts/'
	},
	src: {
			html: 'app/*.html',
			js: 'app/js/*.js',
			style: 'app/sass/*.sass',
			img: 'app/img/**/*.*',
			fonts: 'app/fonts/**/*.*'
	},
	watch: {
			html: 'app/**/*.html',
			js: 'app/js/**/*.js',
			style: 'app/sass/**/*.sass',
			img: 'app/img/**/*.*',
			fonts: 'app/fonts/**/*.*'
	},
	clean: './public_html'
};

var config = {
	server: {
			baseDir: './public_html'
	},
	host: 'localhost',
	port: 9000,
	browser: ['chrome']
};

// html
gulp.task('html:build', function () {
	return gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

// js
gulp.task('js:build', function () {
	return gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(minify({
			noSource: true,
			ext: {
				min: '.min.js'
			}
		}))
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

// styles
gulp.task('style:build', function () {
	return gulp.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(prefixer())
		.pipe(cssmin())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

// images
gulp.task('image:build', function () {
	return gulp.src(path.src.img)
		.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()],
				interlaced: true
		}))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true}));
});

// fonts
gulp.task('fonts:build', function() {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});

// build
// gulp.task('build', gulp.parallel('html:build', 'js:build', 'style:build', 'image:build', 'fonts:build'));
gulp.task('build', gulp.parallel('js:build'));

// watch
gulp.task('watch', function(){
	// watch([path.watch.html], gulp.series('html:build'));
	// watch([path.watch.style], gulp.series('style:build'));
	watch([path.watch.js], gulp.series('js:build'));
	// watch([path.watch.img], gulp.series('image:build'));
	// watch([path.watch.fonts], gulp.series('fonts:build'));
});

// server
gulp.task('webserver', function () {
	browserSync(config);
});

// clean
gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

// default task
// gulp.task('default', gulp.series('clean', 'build', gulp.parallel('webserver', 'watch')));
gulp.task('default', gulp.series('build', 'watch'));

//////////////////////////////////////////////////////////////////////
// final build project
// public
gulp.task('public:css', function () {
	return gulp.src('public_html/css/**/*.*').pipe(gulp.dest('public/public_html/css/'))
});
gulp.task('public:js', function () {
	return gulp.src('public_html/js/**/*.*').pipe(gulp.dest('public/public_html/js/'))
});
gulp.task('public:fonts', function () {
	return gulp.src('public_html/fonts/**/*.*').pipe(gulp.dest('public/public_html/fonts/'))
});
gulp.task('public:img', function () {
	return gulp.src('public_html/img/**/*.*').pipe(gulp.dest('public/public_html/img/'))
});
gulp.task('public:index', function () {
	return gulp.src('index.php').pipe(gulp.dest('public/public_html/'))
});

gulp.task('public:php', function () {
	return gulp.src('php/**/*.*').pipe(gulp.dest('public/php/'))
});
gulp.task('public:vendor', function () {
	return gulp.src('vendor/**/*.*').pipe(gulp.dest('public/vendor/'))
});
gulp.task('public:views', function () {
	return gulp.src('views/**/*.*').pipe(gulp.dest('public/views/'))
});
gulp.task('public:database', function () {
	return gulp.src('database/**/*.*').pipe(gulp.dest('public/database/'))
});
gulp.task('public:config', function () {
	return gulp.src('config/**/*.*').pipe(gulp.dest('public/config/'))
});
gulp.task('public:htaccess', function () {
	return gulp.src('ht.access').pipe(gulp.dest('public/'))
});
gulp.task('public:readme', function () {
	return gulp.src('readme.md').pipe(gulp.dest('public/'))
});

gulp.task('public', gulp.series(
	'public:css',
	'public:js',
	'public:fonts',
	'public:img',
	'public:php',
	'public:vendor',
	'public:views',
	'public:database',
	'public:config',
	'public:index',
	'public:htaccess',
	'public:readme'
));