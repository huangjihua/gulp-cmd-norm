var gulp = require('gulp');
var cmd = require('./index');

 
gulp.task('test', function () {
    // console.log('test');
    gulp.src(['test/**/*.js'])
        .pipe(cmd({
            id:'mod/',
            base: 'test/',
        }))
        .pipe(gulp.dest('dist/test/'))
        .on('Error',function(error){
            console.log(error);
        });
    gulp.src(['test/index.html']) 
        .pipe(gulp.dest('dist/'));
});