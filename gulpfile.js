var gulp = require('gulp');
var sass = require('gulp-sass');
var sassRuby = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-html-minifier');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect-php');


// Development Tasks 
// -----------------

// Start browserSync server

// gulp.task('connect', function() {
//   connect.server({}, function (){
//     browserSync({
//       proxy: '127.0.0.1:8000',
//       baseDir: 'app'
//     });
//   });
  
// });

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// gulp.task('webserver', function() {
//     gulp.src('app/')
//         .pipe(webserver({
//             livereload: true,
//             open: true
//         }));
// })

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
})


gulp.task('sass-build', function() {
  return gulp.src('app/scss/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Passes it through a gulp-sass
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));  
})

gulp.task('compress', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
        //.pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulpIf('*.js', uglify().on('error', function(e){
            console.log(e);  })))
        .pipe(gulpIf('*.css', autoprefixer()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist/'))      
})

// gulp.task('compressjshtmlHTML', function () {
//     return gulp.src('app/*.html')
//         .pipe(useref())
//         .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
//         //.pipe(htmlmin({collapseWhitespace: true}))
//         .pipe(gulpIf('*.js', uglify().on('error', function(e){
//             console.log(e);  })))
//         .pipe(gulpIf('*.css', autoprefixer()))
//         .pipe(gulpIf('*.css', cssnano()))
//         .pipe(gulp.dest('dist/'))      
// });


// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*', ['sass']);
  gulp.watch('app/js/*', browserSync.reload);
  gulp.watch('app/css/**/*.css', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
  //gulp.watch('app/../*.php').on('change', function () {
    browserSync.reload()
  })



// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

// Copying fonts 
// gulp.task('fonts', function() {
//   return gulp.src('app/fonts/**/*')
//     .pipe(gulp.dest('dist/fonts'))
// })


// gulp.task('js', function() {
//   return gulp.src('app/js/*.js')
//     .pipe(uglify().on('error', function(e){
//             console.log(e);  }))
//     .pipe(gulp.dest('dist/js'))
// })

// Cleaning 
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['browserSync','sass'], 'watch',
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass-build',
    'compress',
    ['images'],
    callback
  )
})