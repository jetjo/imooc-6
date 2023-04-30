/**
 * 执行gulp taskParamenter之前，先运行以下命令：
 * MacOS: export imagemin_input_path=\~/project/assets/images
 * Win: set imagemin_input_path=\~/project/assets/images
 */
function taskParamenter ( cb, ...args )
{
    // console.log( args );
    console.log(process.env.imagemin_input_path)
    cb();
}

exports.taskParamenter = taskParamenter;
