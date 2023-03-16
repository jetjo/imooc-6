
exports.bindTask = function (module, taskIndex)
{
  // console.log({ module, taskIndex });
  const _exports = {}
  Object.entries(module).filter(e => e[0][0] != '_').map(([taskName, task]) => _exports[taskIndex != null ? taskName + taskIndex++ : taskName] = task);
  _exports.taskIndex = taskIndex;
  return _exports;
}
