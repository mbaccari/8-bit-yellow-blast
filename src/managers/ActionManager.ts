import { MoveType, Move } from "../structures/Move";
import { User, UserData } from "../structures/User";

export interface MoveData {
    name: string;
    rating: number;
    type: MoveType;
}

/**
 * Manages all direct actions between players.
 */
export class ActionManager {
    
    public moves: Move[];
    private targetMove: Move | undefined;
    /**
	 * Turns moves into data for the `ActionManager`.
     * @param {MoveData[]} moves Contains the moves used by the `ActionManager`
	 */
    constructor(moves: MoveData[]) {
        this.moves = this._updateMoves(moves)
    }
    /**
	 * Turns `MoveData[]` into `Move[]` objects
     * @param {MoveData[]} moves Contains the moves used by the `ActionManager`
     * @returns {Move[]} Returns generated `Move` array
	 */
    private _updateMoves(moves: MoveData[]): Move[] {
        return moves.map(move => {
            return new Move(move.name, move.rating, move.type)
        })
    }
    public use(moveNum: number) {
        this.targetMove = this.moves[moveNum];
        return this;
    }
    public blast(user: User) {
        if (this.targetMove) {
            const {name, rating, type} = this.targetMove
            switch (this.targetMove.type) {
                case MoveType.Heals:
                    user.currentHealth += rating
                    return this;
            
                case MoveType.Damages:
                    user.currentHealth -= rating
                    return this;
        
                case MoveType.Restores:
                    // May be removed in the near future given possible uselessness
                    user.currentHealth = rating
                    return this;
                
                default:
                    throw Error("Invalid MoveType")
                    break;
            }
        }
        throw Error("No particular Move previously specified.")
    }
}
