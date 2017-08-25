import config from './config'
import KEYCODE from './keycode'
import SceneRender from './scene-render'
import Block from './block'
import Score from './score'
import DIRECTION from './direction'

const $ = ( args: string ) => document.querySelector( args )

export default class Tetris{

    box: HTMLElement

    previewBox: HTMLElement

    scene: SceneRender

    currentBlock: Block

    nextBlock: Block

    timer: number

    level: number = 0

    constructor( box: string, preview: string ){
        this.box = <HTMLElement>$( box )
        this.previewBox = <HTMLElement>$( preview )
    }

    startGame(): void {
        document.body.focus()
        let blockSize = config.blockSize
        let scene = this.scene = new SceneRender( config.lines, config.columns )
        let box = this.box
        box.style.width = blockSize * config.columns + 'px'
        box.style.height = blockSize * config.lines + 'px'
        box.style.overflow = 'hidden'

        let previewBox = this.previewBox
        previewBox.style.margin = blockSize + 'px auto'

        this.next()
        this.keyBinding()
    }

    falldown(): void{
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
                this.scene.putBlock( block )
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
                        this.scene.putBlock( block )
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

                if( event.keyCode == KEYCODE.UP ){
                    block.shape.rotate()
                }
            }
        })
    }

    getSpeed(): number{
        return [ 200, 180, 160, 140, 120, 100, 80 ][this.level]
    }

    setBlockPosition( coors: number[][], block?: Block ): boolean{
        block = block || this.currentBlock
        let elems = block.elements
        let blockSize = config.blockSize
        coors.forEach( ( coor: [number, number ], index: number ) => {
            elems[index].style.left = coor[0] * blockSize + 'px'
            elems[index].style.top = coor[1] * blockSize + 'px'
        })
        return true
    }

    createBlock(): void{
        let blockSize = config.blockSize
        let box = this.box
        let random = Math.floor( Math.random() * 5 )

        const _createBlock = (): Block => {
            return new Block( Math.floor( Math.random() * 7 ), [ Math.floor( this.scene.columns / 2 ) - 2, -4 ] )
        }  

        let nextBlock: Block = _createBlock()
        nextBlock.rotate( random )

        if( this.nextBlock ){
            this.currentBlock = this.nextBlock
            this.nextBlock = nextBlock
        }else{
            this.currentBlock = nextBlock
            this.nextBlock = _createBlock()
            this.nextBlock.rotate( random )
        }
        let currentBlock = this.currentBlock
        for( let elem of currentBlock.elements ){
            elem.style.width = blockSize + 'px'
            elem.style.height = blockSize + 'px'
            box.appendChild( elem )
        }
        this.setBlockPosition( currentBlock.getCoordinate() )
        this.setPreview()
    }

    setPreview(): void{
        let nextBlock = this.nextBlock
        let previewBox = this.previewBox
        let blockSize = config.blockSize
        previewBox.innerHTML = ''
        previewBox.style.width = nextBlock.getHorizontalBlocks() * blockSize + 'px'
        previewBox.style.height = nextBlock.getVerticalBlocks() * blockSize + 'px'
        for( let elem of nextBlock.elements ){
            elem.style.width = blockSize + 'px'
            elem.style.height = blockSize + 'px'
            previewBox.appendChild( elem )
        }
        this.setBlockPosition( nextBlock.getCoordinate( undefined, [ 0, 0 ] ), nextBlock )
    }

}

let game = new Tetris( '#tetris', '#preview-box' )
game.startGame()
