const {
    ContextMenuCommandBuilder,
    ApplicationCommandType,
    ActionRowBuilder,
    ChannelSelectMenuBuilder,
    ChannelType
} = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js')
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Echo')
        .setType(ApplicationCommandType.Message),

    async execute(interaction) {
        const targetMessage = interaction.targetMessage;
   if (!userData.authenticateUser(interaction.member.id)) {
            await interaction.reply('You do not have permission to execute this command.');

        } else {
        const select = new ChannelSelectMenuBuilder()
            .setCustomId(`echo_select_${interaction.id}`)
            .setPlaceholder('Select a channel')
            .addChannelTypes(ChannelType.GuildText); // restrict if you want
        const row = new ActionRowBuilder().addComponents(select);
        await interaction.reply({
            content: 'Where do you want to send this message?',
            components: [row],
            ephemeral: true
        });
        // Store message temporarily
        interaction.client.echoCache ??= new Map();
        interaction.client.echoCache.set(interaction.id, targetMessage);
        };

   
    }
};