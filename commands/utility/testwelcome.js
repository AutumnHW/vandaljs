const { SlashCommandBuilder, client } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('testwelcome')
		.setDescription('executes the welcome sequence for testing'),
	async execute(interaction) {
		const { client } = interaction
		const welcomeChannel = client.channels.cache.get('1327755122960236636');
		const line = "====================================================\n"
		const prlogo = [];
		prlogo.push("⠀⠀⠀⣀⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n", "⠐⡗⠂⢸⡇⠀⠀⠀⠀⣀⣀⣀⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀\n", "⠀⡇⠀⢸⣇⣠⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣀⠀⠀⠀\n", "⠀⡇⠀⣤⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡄⠀\n", "⢀⣇⣿⣧⠤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⣭⣭⣭⣭⣀⣼⣿⣿⠀\n", "⠀⠋⣿⡿⠽⣿⣿⡿⠟⠛⠿⣿⣿⣿⣿⡇⠛⠛⢐⣶⣷⣶⣷⡾⠀\n", "⠀⠀⠠⢿⣿⣿⣿⠀⠀⠀⠀⢸⣿⣿⣯⠀⠀⠀⠀⢨⣭⣭⡍⠀⠀\n",  "⠀⠀⠀⠈⠻⣿⣿⣶⣤⣤⣴⣾⣿⢿⣿⠆⢤⣤⠰⠿⠿⠟⠀⠀⠀\n", "⠀⠀⠀⠀⠀⠿⣿⣿⣿⣿⣿⣿⠋⠈⣿⣿⣿⣿⣿⣿⠟⠂⠀⠀⠀\n", "⠀⠀⠀⠀ ⠀⠀⢨⣍⡿⣿⣿⣿⣿⣿⣿⢛⣉⡁⠀⠀⠀⠀⠀⠀\n", "⠀⠀⠀⠀ ⠀⠀⠘⠻⢧⣿⣽⣽⣯⣿⣽⡼⠟⠃⠀⠀⠀⠀⠀⠀\n",  "⠀⠀⠀⠀ ⠀⠀⠀⠀⠀⠻⢿⣿⣿⡿⠏          \n")

		/*const prline0 = "⠀⠀⠀⣀⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n"
		const prline1 = "⠐⡗⠂⢸⡇⠀⠀⠀⠀⣀⣀⣀⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀\n"
		const prline2 = "⠀⡇⠀⢸⣇⣠⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣀⠀⠀⠀\n"
		const prline3 = "⠀⡇⠀⣤⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡄⠀\n"
		const prline4 = "⢀⣇⣿⣧⠤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⣭⣭⣭⣭⣀⣼⣿⣿⠀\n"
		const prline5 = "⠀⠋⣿⡿⠽⣿⣿⡿⠟⠛⠿⣿⣿⣿⣿⡇⠛⠛⢐⣶⣷⣶⣷⡾⠀\n"
		const prline6 = "⠀⠀⠠⢿⣿⣿⣿⠀⠀⠀⠀⢸⣿⣿⣯⠀⠀⠀⠀⢨⣭⣭⡍⠀⠀\n"
		const prline7 = "⠀⠀⠀⠈⠻⣿⣿⣶⣤⣤⣴⣾⣿⢿⣿⠆⢤⣤⠰⠿⠿⠟⠀⠀⠀\n"
		const prline8 = "⠀⠀⠀⠀⠀⠿⣿⣿⣿⣿⣿⣿⠋⠈⣿⣿⣿⣿⣿⣿⠟⠂⠀⠀⠀\n"
		const prline9 = "⠀⠀⠀⠀⠀⠀⠀⢨⣍⡿⣿⣿⣿⣿⣿⣿⢛⣉⡁⠀⠀⠀⠀⠀⠀\n"
		const prline10 = "⠀⠀⠀⠀⠀⠀⠘⠻⢧⣿⣽⣽⣯⣿⣽⡼⠟⠃⠀⠀⠀⠀⠀⠀\n"
		const prline11 = "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⢿⣿⣿⡿⠏          \n"
		*/

	//if(interaction.user.id === '1397284174515142696'){
		await interaction.reply("ok, welcome channel id is " + welcomeChannel );
		var welcomeMessage = "";
		for (var i=0; i<12; i++){
			welcomeMessage = welcomeMessage + prlogo[i];
			console.log(prlogo[i]);
		};
		welcomeChannel.send(welcomeMessage);

		}
	//}
};