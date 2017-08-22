import Scene from './scene'
import Block from './block'
import config from './config'

interface Elements{
    [index: number]: HTMLElement[]
}

export default class SceneRender extends Scene{

    elements: Elements

    putBlock( block: Block ): void{
        super.putCoor( block.coors )
        if( !this.elements ){
            this.elements = {}
        }
        let elements = this.elements
        let elems: HTMLElement[]
        let coors = block.coors
        block.coors.forEach( ( coor, index ) => {
            let line = coor[0]
            if( !elements[line] ){
                elements[line] = []
            }
            elements[line].push( block.elements[index] )
            if( this.isLineFulled( line ) ){
                this.clearLine( line )
            }
        })
    }

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
                elem.style.top = line * config.blockSize + 'px'
            })
            elements[i+1] = elements[i]
            elements[i] = null
        }
    }

}