const { EmbedBuilder } = require('discord.js');
const userData = require(process.cwd() + '/modules/userdata.js')
class PrEmbed {
    constructor(type, level, xp, msgs, hvc, userpfp, username, userid) {
        const sentinel = parseInt(userData.getUserData('sentinel', userid));
        let bannerFile;
        let standingMessage;
        let embedColor;
        if (sentinel > 0) {
            bannerFile = 'https://labs.projectradio.org/VANDAL/sentbanner.png';
            standingMessage = "**WELCOME SENTINEL\n\nYour standing:**"
            embedColor = '#1D47B7'
        } else if (xp < 0) {
            bannerFile = 'https://labs.projectradio.org/VANDAL/hellbanner' + Math.floor(1+(Math.random()*6)) + '.png'
            console.log(bannerFile);
            standingMessage = "**You are in HELL, not sure how you ended up here honestly...\n\nYour standing:**"
            embedColor = '#FFFFFF'

        } else {
            bannerFile = 'https://labs.projectradio.org/VANDAL/ccbanner1.png'; console.log(bannerFile);
            standingMessage = "**Your standing:**"
            embedColor = '#057205'
        }

        this.embed = new EmbedBuilder()
            .setAuthor({
                name: "VANDAL",
                iconURL: "https://labs.projectradio.org/VANDAL/vandal.png",
            })
            .setTitle(username)
            .setDescription(standingMessage)
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
            .setColor(embedColor)
            .setImage(bannerFile)
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
