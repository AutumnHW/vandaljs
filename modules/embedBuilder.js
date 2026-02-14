const { EmbedBuilder } = require('discord.js');

class PrEmbed {
    constructor(type, level, xp, msgs, hvc, userpfp, username) {
        

        this.embed = new EmbedBuilder()
            .setAuthor({
                name: "VANDAL",
                iconURL: "https://labs.projectradio.org/VANDAL/vandal.png",
            })
            .setTitle(username)
            .setDescription("**Your standing:**")
            .addFields(
                {
                    name: "Level:",
                    value: String(level),
                    inline: false
                },
                {
                    name: "Total XP Earned:",
                    value: String(xp),
                    inline: false
                },
                {
                    name: "Messages Sent:",
                    value: String(msgs),
                    inline: false
                },
                {
                    name: "Hours spent in VC:",
                    value: String(hvc),
                    inline: false
                }
            )
            .setColor("#057205")
            .setImage("https://labs.projectradio.org/VANDAL/numetalbanner.png")
            .setThumbnail(String(userpfp))
            .setFooter({
                text: "Project Radio | Your guide through the noise.",
                iconURL: "https://labs.projectradio.org/VANDAL/prlogowhite80x80.png",
            })
            .setTimestamp();
    }

    build() {
        return { embeds: [this.embed] };
    }
}

module.exports = PrEmbed;
