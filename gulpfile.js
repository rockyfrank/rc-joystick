const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const autoprefix = require('gulp-autoprefixer');
const replace = require('gulp-replace');

const del = import('del');

const TS_CONFIG_PATH = './tsconfig.json';
const CJS_TARGET_PATH = './lib';
const ES_TARGET_PATH = './es';

const BUILD_CONFIG = {
  CJS: {
    module: 'CommonJS',
    dest: CJS_TARGET_PATH,
  },
  ES: {
    module: 'ESNext',
    dest: ES_TARGET_PATH,
  },
};

const cleanTask = async () => {
  const { deleteSync } = await del;
  deleteSync('lib');
  deleteSync('es');
  deleteSync('dist');
};

const createBuildTask = (config) => {
  const resolveTypeDeclaration = () => {
    const tsProject = ts.createProject(TS_CONFIG_PATH, {
      declaration: true,
      emitDeclarationOnly: true,
    });

    return tsProject
      .src()
      .pipe(tsProject())
      .pipe(replace('.less', '.css'))
      .pipe(gulp.dest(config.dest));
  };

  const resolveTsx = () => {
    const tsProject = ts.createProject(TS_CONFIG_PATH, {
      module: config.module,
      declaration: false,
    });
    return gulp
      .src('src/**/*.tsx')
      .pipe(tsProject())
      .pipe(
        babel({
          presets: ['@babel/env', '@babel/typescript'],
          plugins: ['@babel/plugin-syntax-jsx'],
        }),
      )
      .pipe(replace('.less', '.css'))
      .pipe(gulp.dest(config.dest));
  };

  const resolveLess = () => {
    return gulp.src('./src/**/*.less').pipe(less()).pipe(autoprefix()).pipe(gulp.dest(config.dest));
  };

  return gulp.parallel(resolveTsx, resolveTypeDeclaration, resolveLess);
};

module.exports.default = gulp.series(
  cleanTask,
  gulp.parallel(createBuildTask(BUILD_CONFIG.ES), createBuildTask(BUILD_CONFIG.CJS)),
);
