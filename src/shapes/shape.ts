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

    clone( shape: Shape ): Shape{
        let _shape = new Shape
        _shape.allShapes = shape.allShapes
        _shape.shapeIndex = shape.shapeIndex
        _shape.coordinate = _shape.allShapes[_shape.shapeIndex]
        return _shape
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