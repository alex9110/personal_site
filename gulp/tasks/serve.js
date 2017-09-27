'use strict';

module.exports = function() {
  $.gulp.task('serve', function() {
    $.browserSync.init({
      open: false,
      //server: $.config.root
      proxy: 'personal'
    });

    $.browserSync.watch([$.config.root + '/**/*.*', '!**/*.css', '!'+$.config.root+'/assets/img/works_image/*.*'], $.browserSync.reload);
  });
};
