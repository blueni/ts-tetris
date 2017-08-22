import {
    Shape,
    S,
    Z,
    L,
    J,
    T,
    O,
    I
} from './shape'

const enum SHAPE_TYPES {
    S, Z, L, J, T, O, I
}

const createShape = ( type: SHAPE_TYPES | Shape ): Shape => {
    let shape = type instanceof Shape ? type : new [ S, Z, L, J, T, O, I ][ type ]    
    shape.coordinate = shape.allShapes[0]
    shape.shapeIndex = 0
    return shape
}

export {
    Shape,
    SHAPE_TYPES,
    createShape
}