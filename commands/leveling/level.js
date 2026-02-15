const { SlashCommandBuilder } = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Sets Level for any given user, usable by staff only.')
		.addUserOption((option) => option.setName('user').setDescription('The user you would like to target.').setRequired(true))
		.addIntegerOption((option) => option.setName('level').setDescription('Level to set user to').setRequired(true) ),
		
	async execute(interaction) {
		const target = interaction.options.getUser('user');
		const level = interaction.options.getInteger('level');
		const username = target.username;
		if(!userData.authenticateUser(interaction.member.id)){
			await interaction.reply('You do not have permission to execute this command.');

		}else{
			userData.setLevel(target, level);
			await interaction.reply('Ok! Set ' + username + "'s level to: "  + userData.getUserData('level', target));
		}

		//console.log(userData.getUserInfo(interaction.user, 'permissions'));
		//console.log('target: ' + target + 'qty: ' + qty);
		//userData.xpAdd(target, qty);
		//reply with new xp value
		
	},
}
