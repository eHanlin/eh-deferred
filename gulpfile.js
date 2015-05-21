var gulp = require('gulp'),
plugins = require('gulp-load-plugins')(),
pack = require('./package.json'),
mocha = plugins.mocha,
port = 8989;
var del = require('del');

pack.dist = 'dist';

var buildConactScript = function( scripts, output ){
  return gulp.src(scripts)
             .pipe(plugins.concat(output))
             .pipe(plugins.uglify())
             .pipe(plugins.header('//author: <%= author %>\n//verion: <%= version %>\n',{author:pack.author,version:pack.version}));
};

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('build', ['clean', 'test'], function(){

  buildConactScript([
      'src/js/deferred.js',
  ], 'deferred.js')
    .pipe(gulp.dest( pack.dist ));

});

gulp.task('test', function () {
  return gulp.src('tests/test.js', {read: false})
         .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['build']);
