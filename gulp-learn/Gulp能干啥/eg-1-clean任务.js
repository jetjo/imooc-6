// 前提： 在工程目录下安装del包(https://github.com/sindresorhus/del)
// npm i -D del
// const del = require('del');

async function clean(cb, glob)
{
  // return del(['dist']);
  try
  {
    const { deleteAsync } = await import('del')
    const deletedPaths = await deleteAsync(glob || ['dist']);
    // console.log('清理完毕。');
    console.warn('Deleted files and directories:\n', deletedPaths.join('\n'));
  } catch (error)
  {
    console.error(error);
  }
}

exports.clean = clean;
