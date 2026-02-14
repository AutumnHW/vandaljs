
const { SlashCommandBuilder } = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('testleveling')
		.setDescription('Development command for level testing'),
	async execute(interaction) {
        const userID = interaction.user.id;
        totalxp = userData.getUserData('totalxp', userID);
        await interaction.reply('function returned ' + totalxp);
		
	},
};