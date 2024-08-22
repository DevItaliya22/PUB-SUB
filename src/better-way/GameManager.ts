interface Game {
    id: string;
    whitePlayer: string;
    blackPlayer: string;
    moves: string[];
}
//here we are creating a class GameManager which will be responsible for managing the games
//means now u have only one obj/instance and we even cannot make one more obj as we are doing private constructor
// and the only one obj will be shared across the application
//this is the singleton pattern

export class GameManager {
    private static instance: GameManager; // Create a static instance of the class of type GameManager
    private games: Game[] = [];

        
    private constructor() {
        // Private constructor ensures that a new instance cannot be created from outside
    }
//this methid should be static as we are calling this method without creating an obj and we are using it for static members
    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    public addGame(game: Game) {
        this.games.push(game);
    }

    public getGames() {
        return this.games;
    }

    public addMove(gameId: string, move: string) {
        const game = this.games.find(game => game.id === gameId);
        if (game) {
            game.moves.push(move);
        }
    }

    public logState() {
        console.log(this.games);
    }
}
