var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var templateCache = require('gulp-angular-templatecache');

var paths = {
    concat: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'bower_components/restangular/dist/restangular.min.js',
        'bower_components/lodash/lodash.min.js',
        'bower_components/leaflet/dist/leaflet.js',
        'bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.min.js',
        'public/assets/compiled/temp/*.js',
        'public/app/*.js',
        'public/app/*/**/*.js'
    ],
    angularTemplates: 'public/app/**/*.html',
    copy: {
        css: [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/font-awesome/css/font-awesome.min.css',
            'bower_components/leaflet/dist/leaflet.css'
        ],
        fonts: [
            'bower_components/font-awesome/fonts/*'
        ]
    },
    watch: {
        concat: [
            'public/app/**/*.js',
            'public/assets/compiled/temp/*.js'
        ],
        scss: 'public/assets/scss/**/*.scss'
    }
};

gulp.task('default', ['copy', 'concat', 'scss']);

gulp.task('watch', ['default'], function() {
    gulp.watch(paths.watch.concat, ['concat']);
    gulp.watch(paths.angularTemplates, ['angular-template']);
    gulp.watch(paths.watch.scss, ['scss']);
});

gulp.task('concat', ['angular-template'], function () {
    return gulp.src(paths.concat)
        .pipe(plumber())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('public/assets/compiled'));
});

gulp.task('angular-template', function () {
    return gulp.src(paths.angularTemplates)
        .pipe(templateCache({standalone: true}))
        .pipe(gulp.dest('public/assets/compiled/temp'));
});

gulp.task('copy', function () {
    gulp.src(paths.copy.css)
        .pipe(gulp.dest('public/assets/css'));
    gulp.src(paths.copy.fonts)
        .pipe(gulp.dest('public/assets/fonts'));
});

gulp.task('scss', function(){
    return gulp.src(paths.watch.scss)
        .pipe(plumber())
        .pipe(sass({style: 'compressed'}))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('public/assets/compiled'));
});