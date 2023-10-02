const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const uglifu = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')(require('sass'))
const del = require('del')

const gulpif = require('gulp-if')
const argv = require('yargs').argv

const browserSync = require('browser-sync').create()

const clean = () => {
    return del(['dist'])
}

const resources =() => {
    return src('src/resources/**')
    .pipe(dest('dist/resources'))
}

const sassToCSS = () => {
	return src('src/scss/style.scss')
		.pipe(sass({
			errorLogToConsole: true,
			outputStyle: 'compressed'
		}))
		.on('error', console.error.bind(console))
		// .pipe(rename({suffix: '.min'}))
		.pipe(dest('dist/css'))
    .pipe(browserSync.stream() );
}

const normalize = () => {
    return src('src/scss/*.scss')
    .pipe(concat('style.css'))
    .pipe(gulpif( !argv.prod, sourcemaps.init()) )
    .pipe(gulpif( !argv.prod, autoprefixes({
        cascade: false
    })) )
    .pipe(gulpif( !argv.prod, cleanCSS({
        level: 2
    })) )
    .pipe(gulpif( !argv.prod, sourcemaps.write()) )
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('src/**/*.html')
    .pipe(gulpif( !argv.prod, htmlMin({
        collapseWhitespace: true,
    })) )
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const scripts = () => {
    return src([
        'src/js/main.js'
    ])
    .pipe(gulpif( !argv.prod, sourcemaps.init()) )
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglifu(/*{toplevel: true} */).on('error', notify.onError()))
    .pipe(gulpif( !argv.prod, sourcemaps.write()) )
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest('dist/img'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

const images = () => {
    return src([
        'src/img/**/*.jpg',
        'src/img/**/*.png',
        'src/img/*.svg',
        'src/img/**/*.jpeg',
    ])
    .pipe(dest('dist/img'))
}

watch('src/**/*.html', htmlMinify)
watch('src/scss/**/*.scss', sassToCSS)
watch('src/img/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)

exports.sassToCSS = sassToCSS
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, resources, htmlMinify, scripts, sassToCSS, images, svgSprites, watchFiles)
