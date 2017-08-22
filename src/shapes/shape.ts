export class Shape{

    coordinate: ( number[] | number )[]     // 形状坐标

    shapeIndex: number = 0
    
    allShapes: ( number[] | number )[][]

    rotate( n?: number ): void{
        let index
        if( isNaN( n ) ){
            index = this.shapeIndex + 1
        }else{
            index = n
        }
        index = index % this.allShapes.length
        this.coordinate = this.allShapes[index]
        this.shapeIndex = index
    }

    clone(): Shape{
        let shape = new Shape
        shape.shapeIndex = this.shapeIndex
        shape.coordinate = shape.allShapes[shape.shapeIndex]
        return shape
    }

}

// 形状"S"
export class S extends Shape{

    allShapes = [
        [ [ 0, 1, 1 ], [ 1, 1 ] ],
        [ 1, [ 1, 1 ], [ 0, 1 ] ]
    ]

}

export class L extends Shape{

    allShapes = [
        [ 1, 1, [ 1, 1 ] ],
        [ [ 1, 1, 1 ], 1 ],
        [ [ 1, 1 ], [ 0, 1 ], [ 0, 1 ] ],
        [ [ 0, 0, 1 ], [ 1, 1, 1 ] ]
    ]

}

export class Z extends Shape{

    allShapes = [
        [ [ 1, 1 ], [ 0, 1, 1 ] ],
        [ [ 0, 1 ], [ 1, 1 ], 1 ]
    ]

}

export class J extends Shape{

    allShapes = [
        [ [ 0, 1 ], [ 0, 1 ], [ 1, 1 ] ],
        [ 1, [ 1, 1, 1 ] ],
        [ [ 1, 1 ], 1, 1 ],
        [ [ 1, 1, 1 ], [ 0, 0, 1 ] ]
    ]

}

export class I extends Shape{

    allShapes = [
        [ [ 0, 1 ], [ 0, 1 ], [ 0, 1 ], [ 0, 1 ] ],
        [ 0, [ 1, 1, 1, 1 ] ]
    ]

}

export class O extends Shape{

    allShapes = [
        [ 0, [ 0, 1, 1 ], [ 0, 1, 1 ] ]
    ]

}

export class T extends Shape{

    allShapes = [
        [ [ 1, 1, 1 ], [ 0, 1 ] ],
        [ [ 0, 0, 1 ], [ 0, 1, 1 ], [ 0, 0, 1 ] ],
        [ 0, [ 0, 1 ], [ 1, 1, 1 ] ],
        [ 1, [ 1, 1 ], 1 ]
    ]

}