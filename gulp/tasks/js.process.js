'use strict';

module.exports = function() {
  $.gulp.task('js:process', function() {
    return $.browserify($.path.app)
      .bundle().on('error', $.gp.notify.onError({ title: 'Java Script' }))
      .pipe($.vinyl('app.js'))
      .pipe($.buffer())
      .pipe($.gp.sourcemaps.init())
      //.pipe($.gp.uglify())
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};
