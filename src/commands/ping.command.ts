import { CommandBase } from "./commandBase";

export class PingCommand extends CommandBase {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        super();

        this.name = name;
        this.description = description;

        this.data.setName(this.name)
            .setDescription(this.description);
    }

    async execute(interaction: any): Promise<void> {
        await interaction.reply('Pong!');
    }
}