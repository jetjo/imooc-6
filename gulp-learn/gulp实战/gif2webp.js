const { src, dest } = require( 'gulp' );
const extReplace = require( 'gulp-ext-replace' )
const { task } = require( 'gulp' )

task( 'gif2webp', async ( cb ) =>
{
    return Promise.all( [
        import( 'gulp-imagemin' ),
        import( "imagemin-webp" ),
        import( 'imagemin-gifsicle' )
    ] ).then( ( [
        { default: imagemin },
        { default: webp },
        { default: imageminGifsicle }
    ] ) => {
        const input = [ './images/*.gif' ];
        const output = 'dist/images'
        console.log( { input, output, cwd: process.cwd() } )
        return src( input )
            .pipe( imagemin( [
                // webp( {
                //     quality: 5,
                //     lossless: false
                // } )
                imageminGifsicle( { interlaced: true } )
            ] ) )
            .pipe( extReplace( '.webp' ) )
            .pipe( dest( output ) )
    } )
} );
