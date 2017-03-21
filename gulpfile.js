var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver');

var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return sass('app/scss/*.scss', {
      sourcemap: true,
      style: 'expanded'
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('watch', ['browserSync', 'sass'], function() {

  gulp.watch(['app/scss/**/*.scss'], ['sass']);
      // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);

});

gulp.task('webserver', function() {
    gulp.src('app/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['sass', 'watch', 'browserSync', 'webserver']);
