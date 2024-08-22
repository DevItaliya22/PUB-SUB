// Import the necessary module from the 'redis' package
import { createClient, RedisClientType } from 'redis';


//THIS IS BASCIALLY REDIS + PUBSUB IN SINGLETON DESIGN PATTERN
export class PubSubManager {
    private static instance: PubSubManager;
    private redisClient: RedisClientType;
    private subscriptions: Map<string, string[]>; // means here we will store the stock name and the users subscribed to that stock 
    // means people who want to see the privce of this particular stock in real time 

    // Private constructor to prevent direct construction calls with the `new` operator
    private constructor() {
        // Create a Redis client and connect to the Redis server
        this.redisClient = createClient();
        this.redisClient.connect();
        this.subscriptions = new Map();
    }

    // The static method that controls the access to the singleton instance
    public static getInstance(): PubSubManager {
        if (!PubSubManager.instance) {
            PubSubManager.instance = new PubSubManager();
        }
        return PubSubManager.instance;
    }

    public userSubscribe(userId: string, stock: string) {
        if (!this.subscriptions.has(stock)) {
            this.subscriptions.set(stock, []);
        }
        this.subscriptions.get(stock)?.push(userId);
        
        if (this.subscriptions.get(stock)?.length === 1) {
            this.redisClient.subscribe(stock, (message:any) => {
                this.handleMessage(stock, message);
            });
            console.log(`Subscribed to Redis channel: ${stock}`);
        }
    }


    public userUnSubscribe(userId: string, stock: string) {
        //means remove the userid from the stock who dont want to see the price of this stock in real time
        this.subscriptions.set(stock, this.subscriptions.get(stock)?.filter((sub) => sub !== userId) || []);

        if (this.subscriptions.get(stock)?.length === 0) {
            this.redisClient.unsubscribe(stock);
            console.log(`UnSubscribed to Redis channel: ${stock}`);
        }
    }

    // Define the method that will be called when a message is published to the subscribed channel
    private handleMessage(stock: string, message: string) {
        console.log(`Message received on channel ${stock}: ${message}`);
        this.subscriptions.get(stock)?.forEach((sub) => {
            console.log(`Sending message to user: ${sub}`);
        });
    }
    public getMap(){
        console.log(this.subscriptions);
    }

    // Cleanup on instance destruction
    public async disconnect() {
        await this.redisClient.quit();
    }
}

