import { 
    Shape,
    SHAPE_TYPES,
    createShape
} from './shapes/index'
import DIRECTION from './direction'

export default class Block{

    elements: HTMLElement[]

    shape: Shape

    private position: number[] = [ 0, 0 ]

    coors: number[][]

    constructor( type: Shape | SHAPE_TYPES, position?: number[] ){
        let elm: HTMLElement
        this.shape = createShape( type )
        this.elements = []
        for( let i=0;i<4;i++ ){
            let div = document.createElement( 'div' )            
            this.elements.push( div )
        }
        if( position ){
            this.position = position
        }
        this.coors = this.getCoordinate()
    }

    getCoordinate( coordinate?: ( number | number[])[] ): number[][]{
        let elems = this.elements
        let coors: number[][] = []
        let position = this.position

        if( !coordinate ){
            coordinate = this.shape.coordinate
        }
        let nums: number[]
        for( let i=0;i<coordinate.length;i++ ){
            nums = <number[]>(Array.isArray( coordinate[i] ) ? coordinate[i] : [ coordinate[i] ])
            for( let j=0;j<nums.length;j++ ){
                if( nums[j] ){
                    coors.push( [ j + position[0], i + position[1] ] )
                }
            }
        }
        return coors
    }

    blockOperate( direction: DIRECTION ): number[][]{
        if( direction == DIRECTION.UP ){
            let shape = createShape( this.shape )
            shape.rotate()
            return this.getCoordinate( shape.coordinate )
        }
        let _coors: number[][] = []
        let _coor: number[] = []
        let coors = this.coors
        for( let coor of coors ){
            _coor = coor.slice()
            if( direction == DIRECTION.LEFT ){
                _coor[0] -= 1
            }else if( direction == DIRECTION.RIGHT ){
                _coor[0] += 1
            }else if( direction == DIRECTION.DOWN ){
                _coor[1] += 1
            }
            _coors.push( _coor )
        }
        return _coors
    }

    rotate( num?: number ): void{
        this.shape.rotate( num )
        this.coors = this.getCoordinate()
    }

    destroy(): void{
        this.shape = null
        this.elements = null
        this.coors = null
        this.position = null
    }

    [Symbol.iterator](): Iterator<Element>{
        let index = 0
        let elements = this.elements
        return {
            next(){
                let elem = elements[index++]
                return {
                    value: elem,
                    done: !!elem
                }
            }
        }
    }
}
