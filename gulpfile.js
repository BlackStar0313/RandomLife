const gulp = require('gulp');
const shell = require('gulp-shell');
const browserSync = require('browser-sync').create();
const del = require('del');

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

    gulp.watch('./client/src/**/*.ts',gulp.series('build' , callBrowserSync) )
    gulp.watch('./client/resource/eui_skins/*.exml', callBrowserSync);
}));

gulp.task('copyServer', (cb)=>{
    let destPath = './server';
    return gulp.src('main', {cwd: destPath + '/src'})
          .pipe(gulp.dest(destPath));
})

gulp.task('buildServer', (cb) => {
    return gulp.src('.')
          .pipe(shell([
            'env GOOS=linux GOARCH=386 go build main.go'
          ], {cwd: './server/src'}));
});

gulp.task('deleServer', (cb) => {
    del('./server/src/main');
    cb();
});

gulp.task('distServer', gulp.series('buildServer' , 'copyServer' , 'deleServer', (cb) => {
    console.log("^^^^^ finish dist server");
    return gulp.src('.')
}));

gulp.task('uploadServer', (cb) => {
     return gulp.src('.')
        .pipe(shell([
          'scp main root@47.95.246.80:/root/randomLife',
          'scp data/*.* root@47.95.246.80:/root/randomLife/data'
        ], {cwd: './server'}));
});

gulp.task('uploadData', (cb) => {
     return gulp.src('.')
        .pipe(shell([
          'scp data/*.* root@47.95.246.80:/root/randomLife/data'
        ], {cwd: './server'}));
});