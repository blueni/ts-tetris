import Scene from './scene'
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

    scene: Scene

    currentBlock: Block

    nextBlock: Block

    blockSize: number = 15

    timer: number

    level: number = 4

    startGame(): void {
        let blockSize = this.blockSize
        let box = this.box = <HTMLElement>$( '#tetris' )
        let scene = this.scene = new Scene( 20, 10 )
        box.style.width = blockSize * scene.columns + 'px'
        box.style.height = blockSize * scene.lines + 'px'
        box.style.overflow = 'hidden'
        this.createBlock()
        this.falldown()
    }

    move(){
        
    }

    falldown(){
        let speed = this.getSpeed()
        let block = this.currentBlock
        let scene = this.scene
        let prevCoors: number[][]
        let coors = block.getCoordinate()
        clearInterval( this.timer )
        this.timer = setInterval( () => {
            if( scene.hitCheck( coors ) ){
                clearInterval( this.timer )
                if( !prevCoors ){
                    console.log( 'game is over...' )
                    return 
                }
                scene.putBlock( prevCoors )
                this.createBlock()
                this.falldown()
                return
            }else{
                prevCoors = coors
                this.setBlockPosition( prevCoors )
                coors = scene.coorOperate( coors, DIRECTION.DOWN )
            }
        }, speed )
    }

    getSpeed(): number{
        return [ 200, 180, 160, 140, 80 ][this.level]
    }

    getAbsolutePosition( position: number[] ): number[][]{
        let blockSize = this.blockSize
        let block = this.currentBlock
        return block.getCoordinate( position ).map( ( coor: number[] ) => {
            return <number[]>[ coor[0] * blockSize, coor[1] * blockSize ]
        })
    }

    setBlockPosition( coors?: number[][] ): boolean{
        let block = this.currentBlock
        if( !coors ){
            coors = this.getAbsolutePosition( block.position )
        }
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

        const _createBlock = (): Block => {
            return new Block( Math.floor( Math.random() * 7 ), [ Math.floor( this.scene.columns / 2 ) - 2, -4 ] )
        }  

        let nextBlock: Block = _createBlock()
        let currentBlock
        if( this.nextBlock ){
            this.currentBlock = this.nextBlock
        }else{
            this.currentBlock = _createBlock()
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
