import config from './config'
import KEYCODE from './keycode'
import SceneRender from './scene-render'
import Block from './block'
import Score from './score'
import DIRECTION from './direction'

const $ = ( args: string ) => document.querySelector( args )

export default class Tetris{

    box: HTMLElement

    scene: SceneRender

    currentBlock: Block

    nextBlock: Block

    timer: number

    level: number = 0

    startGame(): void {
        document.body.focus()
        let blockSize = config.blockSize
        let box = this.box = <HTMLElement>$( '#tetris' )
        let scene = this.scene = new SceneRender( config.lines, config.columns )
        box.style.width = blockSize * config.columns + 'px'
        box.style.height = blockSize * config.lines + 'px'
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
                this.next()
                return
            }else{
                coors = nextCoors
                block.coors = coors
                this.setBlockPosition( coors )
            }
        }, speed )
    }

    next(): void{
        this.scene.putBlock( this.currentBlock )
        this.createBlock()
        this.falldown()
    }
    
    keyBinding(): void{
        document.addEventListener( 'keydown', ( event ) => {
            let block = this.currentBlock
            let coors: number[][]
            switch( event.keyCode ){                                
                case KEYCODE.LEFT:    // left
                    coors = block.blockOperate( DIRECTION.LEFT )
                    break

                case KEYCODE.UP:    // rotate
                    coors = block.blockOperate( DIRECTION.UP )
                    break
                    
                case KEYCODE.RIGHT:    // right
                    coors = block.blockOperate( DIRECTION.RIGHT )
                    break
                    
                case KEYCODE.DOWN:    // down
                    coors = block.blockOperate( DIRECTION.DOWN )
                    break

                case KEYCODE.SPACE:    // space
                    let _coors = block.blockOperate( DIRECTION.DOWN )
                    while( !this.scene.hitCheck( _coors ) ){
                        coors = _coors
                        block.coors = coors
                        _coors = block.blockOperate( DIRECTION.DOWN )
                    }
                    if( coors ){
                        this.setBlockPosition( coors )
                        this.next()
                        return
                    }
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
        let blockSize = config.blockSize
        coors.forEach( ( coor: [number, number ], index: number ) => {
            elems[index].style.left = coor[0] * blockSize + 'px'
            elems[index].style.top = coor[1] * blockSize + 'px'
        })
        return true
    }

    createBlock() :void{
        let blockSize = config.blockSize
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
