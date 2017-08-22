import DIRECTION from './direction'

export default class Scene{

    lines: number = 20

    columns: number = 10

    coors: number[][]

    constructor( lines?: number, columns?: number ){
        if( lines > 20 ){
            this.lines = lines
        }
        if( columns > 10 ){
            this.columns = columns
        }
        this.clear()
    }

    isLineFulled( line: number ): boolean{
        let coors = this.coors[line]
        if( !coors ){
            throw new Error( 'line is out of coordinates' )
        }
        for( let flag of coors ){
            if( !!flag ){
                return false
            }
        }
        return true
    }

    hitCheck( coors: number[][] ): boolean{
        for( let coor of coors ){
            // 撞墙了~
            if( coor[0] < 0 || coor[0] > this.columns - 1 || coor[1] > this.lines - 1 ){
                return true
            }
            // 此坑已被占~
            if( this.coors[coor[0]][coor[1]] ){
                return true
            }
        }
        return false
    }

    putBlock( coors: number[][] ): void{        
        if( this.hitCheck( coors ) ){
            throw new Error( 'block can not put there' )
        }
        for( let coor of coors ){
            this.coors[coor[0]][coor[1]] = 1
        }
    }

    logicPutBlock( coors: number[][] ): void{
        let prevLine: number = -1
        let coorsEnd = coors[coors.length - 1][1]
        coorsEnd = this.lines - coorsEnd
        for( let line = 0;line < coorsEnd;line++ ){            
            if( this.hitCheck( coors ) ){
                break
            }
            coors = this.coorOperate( coors, DIRECTION.DOWN )
            prevLine = line
        }
        if( prevLine > -1 ){
            this.putBlock( coors )
        }
    }

    coorOperate( coors: number[][], direction: DIRECTION ): number[][]{
        let _coors: number[][] = []
        let _coor: number[] = []
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

    clear(): void{
        this.coors = []
        let coors: number[]
        for( let i = 0;i<this.lines;i++ ){
            coors = []
            for( let j=0;j<this.columns;j++ ){
                coors.push( 0 )
            }
            this.coors.push( coors )
        }
    }

    clearLine( line: number ): boolean{
        let coors = this.coors[line]
        if( !coors ){
            throw new Error( 'line is out of coordinates' )
        }
        coors = coors.map( ( flag: number ) => 0 )
        this.coors.splice( line, 1 )
        this.coors.unshift( coors )
        return true
    }

}