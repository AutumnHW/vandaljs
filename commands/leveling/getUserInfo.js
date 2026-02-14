const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js')
const embedBuilder = require(process.cwd() + '/modules/embedBuilder.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('nfo')
		.setDescription('Shows you your total XP, level, and standing in the server.'),
	async execute(interaction) {
		


		await interaction.reply(embedBuilder.build());
	},
};