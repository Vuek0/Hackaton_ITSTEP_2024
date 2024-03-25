const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const concat = require('gulp-concat')
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')
const sync = require('browser-sync').create()

function html(){
  return src('src/**.html')
    .pipe(include({
      prefix: '@@'
    }))

    .pipe(dest('public'))
}
function js(){
  return src('src/js/**.js')
    .pipe(concat('main.js')) 
    .pipe(dest('public'))
}
function scss(){
  return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(csso())
    .pipe(concat('style.css'))
    .pipe(dest('public'))
}

function clear(){
  return del([
    'public/**.html',
    'public/style.css'
  ])
}

function server(){
  sync.init({
    server: './public'
  })

  watch('src/**.html', html).on('change', sync.reload)
  watch('src/parts/**.html', html).on('change', sync.reload)
  watch('src/scss/**.scss', scss).on('change',sync.reload)
  watch('src/js/**.js', js).on('change', sync.reload)
}

// exports.build = series(clear, scss, html)
exports.server = series(clear, scss, html, js, server)
// exports.clear = clear