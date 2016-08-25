var pkg = require('./package.json'),
    gulp = require('gulp'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    replace = require('gulp-replace'),
    gulpFilter = require('gulp-filter'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    spriter = require('gulp-css-spriter'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    path = {
        index: 'src/index.html',
        asset: ['src/**/*', '!src/css/**/*', '!src/js/**/*', '!src/index.html'],
        build: 'dist/',
        ftpPath: 'activity/' + pkg.name
    },
    ftppass = {
        test: {
            username: 'ynren1',
            password: 'ynren@163'
        },
        publish: {
            username: 'wangjun2012',
            password: 'wangjun2012'
        }
    };
gulp.task('browser-sync', ['tocss'], function () {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch("src/sass/*.scss", ['tocss']);
    gulp.watch("src/*.html").on("change", browserSync.reload);
    gulp.watch("src/js/*.js").on("change", browserSync.reload);
});

gulp.task('clean', function (cb) {
    return del([path.build], cb);
});
gulp.task('copy', ['clean'], function () {
    return gulp.src(path.asset)
        .pipe(gulp.dest(path.build));
});

gulp.task('tocss', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass({sourcemap: true}))
        .pipe(autoprefixer({
            //browsers: ['last 8 versions'],
            cascade: true
        }))
        .pipe(spriter({
            'spriteSheet': './src/img/sprite.png',
            'pathToSpriteSheetFromCSS': '../img/sprite.png'
        }))
        .pipe(gulp.dest('./src/css'));
});
gulp.task('usemin', ['clean', 'tocss'], function () {
    return gulp.src(path.index)
        .pipe(usemin({
            css: [minifyCss()],
            js: [uglify()]
        }))
        .pipe(gulp.dest(path.build));
});

// 压缩效率一般，建议用https://tinypng.com/压缩图片

gulp.task('compressImg', function () {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/img'));
});

gulp.task('default', ['copy', 'usemin', 'compressImg']);


