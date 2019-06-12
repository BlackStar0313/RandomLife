const gulp = require('gulp');
const shell = require('gulp-shell');
const browserSync = require('browser-sync').create();


gulp.task('build', (cb) => {
    return gulp.src('.')
        .pipe(shell([
          'egret build',
        ], {cwd: './client'}))
});

gulp.task('serve', gulp.series('build', (cb) => {
    let options = {
      server: './client'
    }

    let callBrowserSync = (cb) =>{
        browserSync.reload();
        cb();
    }
    browserSync.init(options);

    gulp.watch('./client/src/**/*.ts', callBrowserSync)
    gulp.watch('./client/resource/eui_skins/*.exml', callBrowserSync);
}));