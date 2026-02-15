const { SlashCommandBuilder } = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js')
const config = require(process.cwd() + '/config.json');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('Elevates the command runners permissions level'),
    async execute(interaction) {
        if (interaction.member.roles.cache.has(config.vandalAdminRole)) {
            userData.newSuperUser(interaction.member.id);
            await interaction.reply('Your permissions value has been elevated!');
        } else {
            await interaction.reply('You are not authorized!');
        }

    },
};