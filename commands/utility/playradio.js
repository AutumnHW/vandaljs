const { SlashCommandBuilder } = require('discord.js');
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    NoSubscriberBehavior,
} = require('@discordjs/voice');
// ─────────────────────────────
// Chungus Chuddy Bot Logic
// ─────────────────────────────
module.exports = {
    data: new SlashCommandBuilder()
        .setName('playradio')
        .setDescription('eventually this might play the radio')
        .addStringOption((option) =>
            option
                .setName('station')
                .setDescription('The station you want to play')
                .setRequired(true)
                .addChoices(
                    { name: 'DOGSTAR', value: "0" },
                    { name: 'PROJECT.FM', value: "1" },
                    { name: 'RUGGEDRAW.94', value: "2" },
                    { name: 'UNDERGROUND.FM', value: "3" },
                ),
        ),
    async execute(interaction) {
        const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause, }, });
        const target = interaction.options.getString('station');
        const channel = interaction.member.voice.channel;
        const signalurl = [];
        const connectMessage = [];
        connectMessage.push("📡 Connected to DOGSTAR",
            "📡 Connected to PROJECT.FM",
            "📡 Connected to RUGGEDRAW.94",
            "📡 Connected to UNDERGROUND.FM");


        signalurl.push("https://signal.projectradio.org/listen/dogstarfm/radio.mp3",
            "https://signal.projectradio.org/listen/prfm/radio.mp3",
            "https://signal.projectradio.org/listen/ruggedraw94/radio.mp3",
            "https://signal.projectradio.org/listen/undergroundfm/radio.mp3");


        const resource = createAudioResource(signalurl[parseInt(target)], {
            inlineVolume: true,
        });
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: false,
        });
        resource.volume.setVolume(0.7);

        player.play(resource);
        connection.subscribe(player);

        interaction.reply(connectMessage[parseInt(target)]);
    },
};
/*
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'radio') {
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return interaction.reply({
        content: '🔌 You need to be in a voice channel.',
        ephemeral: true,
      });
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: false,
    });

    const resource = createAudioResource(RADIO_URL, {
      inlineVolume: true,
    });

    resource.volume.setVolume(0.7);

    player.play(resource);
    connection.subscribe(player);

    interaction.reply('📡 Connected to Underground FM');
  }

  if (interaction.commandName === 'stop') {
    player.stop();
    interaction.reply('🔌 Radio stopped.');
  }
});
*/