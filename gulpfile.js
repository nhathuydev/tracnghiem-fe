var gulp = require('gulp')
var concatCss = require('gulp-concat-css')
var minify = require('gulp-minifier')
var gulpConcat = require('gulp-concat')

gulp.task('css', function () {
  return gulp.src([
    'assets/css/bootstrap.min.css',
    'assets/css/font-awesome.min.css',
    'assets/css/simple-line-icons.min.css',
    'assets/global/plugins/uniform/css/uniform.default.css',
    'assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
    'assets/global/css/components.min.css',
    'assets/global/css/plugins.min.css',
    'assets/layouts/layout/css/layout.min.css',
    'assets/layouts/layout/css/themes/darkblue.css',
    'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
    'assets/layouts/layout/css/custom.min.css',
    'assets/pages/css/login.min.css',
    '/assets/pages/css/profile.min.css',
  ])
    .pipe(gulpConcat("bundle.css"))
    .pipe(minify({
      minify: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyJS: true,
      minifyCSS: true,
    }))
    .pipe(gulp.dest('./static'));
})

gulp.task('js', function () {
  return gulp.src([
    'assets/global/plugins/jquery.min.js',
    'assets/global/plugins/bootstrap/js/bootstrap.min.js',
    'assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js',
    'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
    'assets/pages/scripts/ui-confirmations.min.js',
    'assets/global/scripts/app.min.js',
    'assets/layouts/layout/scripts/layout.min.js',
  ])
    .pipe(gulpConcat('all.js'))
    .pipe(gulp.dest('./static'))
})

gulp.task('default', function () {

})
