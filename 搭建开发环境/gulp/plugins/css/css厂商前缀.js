const { src, dest } = require('gulp');

const { wrapper } = require('../../utils/wrapper')

const autoprefixer = require('gulp-autoprefixer');

const glob = ['src/**/*.css']
const cssDist = 'dist/css';

function cssAutoPrefix(cb, stream, noEmit)
{
  stream ||= src(glob);
  if (process.env?.GULP_ENV === 'dev') return stream;
  const res = stream
    .pipe(
      autoprefixer(
        {
          cascade: false,
          // grid: 'autoplace'
        }
      )
    )
  if (noEmit)
  {
    return res;
  }
  return res.pipe(dest(cssDist))
}

exports.cssAutoPrefix = wrapper(cssAutoPrefix);
