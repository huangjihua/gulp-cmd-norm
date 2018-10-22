var gulp = require('gulp');

var cmd = require('./index');

gulp.task('cmd', function () {
    gulp.src('./test/**/*.js')
        .pipe(cmd({
            id:'mod/',
            base: 'test/'
        }))
        .pipe(gulp.dest('dist/'))
        .on('Error',function(error){
            console.log(error);
        });
});