import { 
    Shape,
    SHAPE_TYPES,
    createShape
} from './shapes/index'

export default class Block{

    elements: HTMLElement[]

    shape: Shape

    position: number[] = [ 0, 0 ]

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
    }

    getCoordinate( position?: number[] ): number[][]{
        let elems = this.elements
        let pos: number[][] = []
        let coordinate = this.shape.coordinate
        let nums: number[]
        if( !position ){
            position = this.position
        }
        for( let i=0;i<coordinate.length;i++ ){
            nums = <number[]>(Array.isArray( coordinate[i] ) ? coordinate[i] : [ coordinate[i] ])
            for( let j=0;j<nums.length;j++ ){
                if( nums[j] ){
                    pos.push( [ j + position[0], i + position[1] ] )
                }
            }
        }
        return pos
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
