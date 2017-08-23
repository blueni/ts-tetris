import SceneRender from './scene-render'
import { 
    Shape,
    createShape
} from './shapes/index'
import Block from './block'
import Score from './score'
import DIRECTION from './direction'

const $ = ( args: string ) => document.querySelector( args )

export default class Tetris{

    box: HTMLElement

    scene: SceneRender

    currentBlock: Block

    nextBlock: Block

    blockSize: number = 15

    timer: number

    level: number = 0

    startGame(): void {
        let blockSize = this.blockSize
        let box = this.box = <HTMLElement>$( '#tetris' )
        let scene = this.scene = new SceneRender( 20, 10 )
        box.style.width = blockSize * scene.columns + 'px'
        box.style.height = blockSize * scene.lines + 'px'
        box.style.overflow = 'hidden'
        this.createBlock()
        this.falldown()
        this.keyBinding()
    }

    falldown(){
        let speed = this.getSpeed()
        let block = this.currentBlock
        let scene = this.scene
        let coors: number[][]
        let nextCoors: number[][]
        clearInterval( this.timer )
        this.timer = setInterval( () => {
            nextCoors = block.blockOperate( DIRECTION.DOWN )
            if( scene.hitCheck( nextCoors ) ){
                clearInterval( this.timer )
                if( !coors ){
                    console.log( 'game is over...' )
                    return 
                }
                scene.putBlock( block )
                this.createBlock()
                this.falldown()
                return
            }else{
                coors = nextCoors
                block.coors = coors
                this.setBlockPosition( coors )
            }
        }, speed )
    }
    
    keyBinding(): void{
        document.addEventListener( 'keydown', ( event ) => {
            let block = this.currentBlock
            let coors: number[][]
            switch( event.keyCode ){                                
                case 37:    // left
                    coors = block.blockOperate( DIRECTION.LEFT )
                    break

                case 38:    // rotate
                    coors = block.blockOperate( DIRECTION.UP )
                    break
                    
                case 39:    // right
                    coors = block.blockOperate( DIRECTION.RIGHT )
                    break
                    
                case 40:    // down
                    coors = block.blockOperate( DIRECTION.DOWN )
                    break

                default:
                    return
            }
            if( !this.scene.hitCheck( coors ) ){
                block.coors = coors
                this.setBlockPosition( coors )

                if( event.keyCode == 38 ){
                    block.shape.rotate();
                }
            }
        })
    }

    getSpeed(): number{
        return [ 200, 180, 160, 140, 120, 100, 80 ][this.level]
    }

    setBlockPosition( coors: number[][] ): boolean{
        let block = this.currentBlock
        let elems = block.elements
        let blockSize = this.blockSize
        coors.forEach( ( coor: [number, number ], index: number ) => {
            elems[index].style.left = coor[0] * blockSize + 'px'
            elems[index].style.top = coor[1] * blockSize + 'px'
        })
        return true
    }

    createBlock() :void{
        let blockSize = this.blockSize
        let box = this.box
        let random = Math.floor( Math.random() * 5 )

        const _createBlock = (): Block => {
            return new Block( Math.floor( Math.random() * 7 ), [ Math.floor( this.scene.columns / 2 ) - 2, -4 ] )
        }  

        let nextBlock: Block = _createBlock()
        nextBlock.shape.rotate( random )
        let currentBlock
        if( this.nextBlock ){
            this.currentBlock = this.nextBlock
        }else{
            this.currentBlock = _createBlock()
            this.currentBlock.shape.rotate( random )            
        }
        this.nextBlock = nextBlock
        currentBlock = this.currentBlock
        for( let elem of currentBlock.elements ){
            elem.style.width = blockSize + 'px'
            elem.style.height = blockSize + 'px'
            box.appendChild( elem )
        }        
        this.setBlockPosition( currentBlock.getCoordinate() )
    }

}

let game = new Tetris()
game.startGame()
