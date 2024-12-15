import { PrismaClient, welcome } from '@prisma/client';
import { Client, GatewayIntentBits, Events } from 'discord.js';
export class DiscordClient {
    client: Client;
    constructor(token: string, clientReadyHandler?: (client: Client) => void) {

        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildInvites,

            ]
        });
        this.client.login(token);
        this.client.once(Events.ClientReady, clientReadyHandler || (() => { }));
        // this.testDb().then(() => {
        //     console.log("Tested DB");
        // });
    }

    // @TODO Remove this function
    // This function is only for testing purposes
    // It's there so i can remember how to use prisma
    // when I am less tired and can think straight
    // public async testDb() {
    //     let prisma = await new PrismaClient();
    //     const welcome = await prisma.welcome.create({
    //         data: {
    //             Field1: 2,
    //             Field2: 2,
    //             Field3: "",
    //         },
    //     });

    //     console.log(welcome.Field1);
    // }
}