import { games } from "./store";
import { startLogger } from "./logger";

startLogger();

//here we will simulating the data by adding the data in the games array , means here we are adding the data in the store
//every 2 sec we are updating the data in the store
setInterval(() => {
    games.push({
        "whitePlayer": "harkirat",
        "blackPlayer": "jaskirat",
        moves: []
    })
}, 2000);
//but we can do it better by structuring the code in a better way
// so see the better-way folder