const gulp = require( 'gulp' )
const browserify = require( 'browserify' )
const tsify = require( 'tsify' )
const source = require( 'vinyl-source-stream' )

gulp.task( 'ts', () => {
    return browserify({
            basedir: '.',
            debug: true,
            entries: [ 'src/game.ts' ],
        })
        .plugin( tsify )
        .bundle()
        .pipe( source( 'game.js' ) )
        .pipe( gulp.dest( 'dist' ) )
})

gulp.task( 'default', [ 'ts' ], () => {
    gulp.watch( 'src/*.ts', [ 'ts' ] )
})

gulp.task( 'build', [ 'ts' ] )
