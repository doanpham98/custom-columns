const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

// Complie bootstrap task
function sassTask(){
    return gulp.src('bootstrap/scss/bootstrap.scss')
              .pipe(sass())
              .pipe(gulp.dest('./'))
              .pipe(browserSync.stream())
}

// Html task
function htmlTask(){
    return gulp.src('index.pug')
              .pipe(pug({pretty:true}))
              .pipe(gulp.dest('./'))
              .pipe(browserSync.stream())
}

//Live-reload
function serve(){
    browserSync.init({
        server:{
            baseDir:'./'
        }
    })
    gulp.watch('bootstrap/scss/**/*.scss',sassTask)
    gulp.watch('index.pug',htmlTask)
}

exports .sass = sassTask;
exports .html = htmlTask;
exports .default = gulp.series(gulp.parallel(htmlTask,sassTask))
exports .serve = gulp.series(serve,gulp.parallel(htmlTask,sassTask))