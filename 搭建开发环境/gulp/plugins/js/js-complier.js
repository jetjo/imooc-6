const { src, dest, series } = require('gulp');

const babel = require('gulp-babel');
const { wrapper } = require('../../utils/wrapper')

const opt = {
  // "presets": ["@babel/preset-env"]
  "presets": ["@babel/env"]
};

function complierJS(cb, stream, noEmit)
{
  stream ||= src(['src/**/*.js', '!src/**/vendor/**']);
  if (process.env.GULP_ENV === 'dev') return stream;
  const res = stream
    .pipe(
      babel({
        ...opt
      })
    );
  if (noEmit)
  {
    return res;
  }
  return res.pipe(dest('dist/'))
}

exports.complierJS = wrapper(complierJS, null, () => opt);
