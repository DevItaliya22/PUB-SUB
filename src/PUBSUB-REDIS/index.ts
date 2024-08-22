import { PubSubManager } from "./PubSubManager";

setInterval(() => {
    PubSubManager.getInstance().userSubscribe(Math.random().toString(), "APPL");
    PubSubManager.getInstance().getMap();
}, 5000)

//so basically what we are doing is we will start docker , then we will publish the message to the redis server ussing redis-cli 
// as PUBLISH APPL 100 , and why appl as we have fixed the stock name as APPL in the code
// and now we are subscribing to the APPL stock by random id and we are checking the map of the stock and the users subscribed to that stock
// so we are checking the map every 5 seconds
// so we will see that the user is getting subscribed to the APPL stock and we will see the map of the stock and the users subscribed to that stock

// we can also see that pub sub shit byb terminal only 
// just open docker exec -it container_id /bin/bash in 2 terminal
// anddo PUBLISH event-1 1 in terminal 1
// and do SUBSCRIBE event-1 then now everytime u publisg something u will see that thing on termibnal 2 as we are subscribed
// and similalry we can also do pub with event-2 but to look at that , we have to oprn new terminal 
// but when we implemmtt pub-sub in node js then ofc we dont need to open termnal to see shits , we know qhat we are storing

//TO START 
//TERMINAL 1
// docker run -d -p 6379:6379 redis

//TERMINAL 2
// docker ps
//  docker exec -it container_id /bin/bash
//  something will come then write =>     redis-cli
// then do PUBLISH APPL 100 , THEN U WILL SEE THAT IN TERMINAL 3

//TERMINAL 3
// tsc and then node ./dist/PUBSUB-REDIS/index.js