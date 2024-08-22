import { games } from "./store";
//here instead of logging we will store the data in db
export function startLogger() {
    setInterval(() => {
        console.log(games);
    }, 4000)
}