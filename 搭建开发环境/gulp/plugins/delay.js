exports.delay = function (timeout)
{
  return (cb) =>
  {
    setTimeout(() =>
    {
      cb()
    }, timeout);
  }
}
