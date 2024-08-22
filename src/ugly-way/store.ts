interface Game {
    whitePlayer: string;
    blackPlayer: string;
    moves: string[];
}
//basically this is your store for the state and here you can store the data , see index.ts  as from there we
//are adding the data in the games array
export const games: Game[] = [];