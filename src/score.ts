export default class Score{

    count: number = 0

    baseScore: number = 10

    constructor( baseScore: number ){
        this.baseScore = baseScore
    }

    getScore( lines: number ): number{
        let score = 0
        for( let i=1;i<=lines;i++ ){
            score += i
        }
        score = score * this.baseScore
        this.count += score
        return score
    }

}