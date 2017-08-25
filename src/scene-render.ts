import Scene from './scene'
import Block from './block'
import config from './config'

interface Elements{
    [index: number]: HTMLElement[]
}

export default class SceneRender extends Scene{

    elements: Elements

    putBlock( block: Block ): void{
        this.putCoor( block.coors )
        if( !this.elements ){
            this.elements = {}
        }
        let elements = this.elements
        let elems: HTMLElement[]
        let coors = block.coors
        block.coors.forEach( ( coor, index ) => {
            let line = coor[1]
            if( !elements[line] ){
                elements[line] = []
            }
            elements[line].push( block.elements[index] )
        })
        block.coors.forEach( coor => {
            let line = coor[1]
            if( this.isLineFulled(  line ) ){
                this.clearLine( line )
            }
        })
    }

    // putCoor( coors: number[][] ): void{
    //     super.putCoor( coors )
    //     let flags: number[]
    //     let _coors
    //     for( let i=0;i<this.coors.length;i++ ){
    //         _coors = this.coors[i]
    //         flags = []
    //         for( let flag of _coors ){
    //             flags.push( flag ? 1 : 0 )
    //         }
    //         if( !/1/.test( flags.join() ) ){
    //             continue
    //         }
    //         console.log( 'line', ( '0' + i ).slice( -2 ), ':', flags.join( ' - ' ) )
    //     }
    //     console.log( '------------------------\n' )
    // }

    clearLine( line: number ): void{
        super.clearLine( line )
        let elements = this.elements
        for( let elem of elements[line] ){
            if( elem.parentNode ){
                elem.parentNode.removeChild( elem )
            }
        }
        for( let i=line-1;i>0;i-- ){
            if( !elements[i] ){
                break
            }
            elements[i].forEach( elem => {
                elem.style.top = ( i + 1 ) * config.blockSize + 'px'
            })
            elements[i+1] = elements[i]
            elements[i] = null
        }
    }

}