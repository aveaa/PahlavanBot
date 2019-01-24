const Discord = require("discord.js");
const client = new Discord.Client();
const prefixes = ['p!', 'P!', 'p.', 'P.'];

client.login(process.env.BOT_TOKEN).catch(console.error);

client.on('message', async (message) => {
  let prefix = false;
  for(const thisPrefix of prefixes) {
    if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
  }
  
  if(!prefix) return;
  if(message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(['help', 'helpembed'].includes(command)){
    message.channel.send("```{description: текст описания} \n{title: текст заголовка} \n{field: имя | value: текст} \n{timestamp}(временая метка) \n{footer: нижний текст} \n{color: #цвет} \n{image: url} \n{thumbnail url}```")
    message.channel.send("Пример: ```x!embed {thumbnail: https://cdn.discordapp.com/emojis/429653035984355338.png}{title: hello world}{description: привет ☮️}{field: пункт 1 | value: содержание пункта}{timestamp}{footer: XeVAL}{color: 00ff00}```")
  }
  if (['embed', 'embedsay', 'e'].includes(command)) {
    try {
        let text = args.join(" ").replace(/\n/g, "\\n");
        let embed = new Discord.RichEmbed();
        let footer = text.match(/{footer:(.*?)( \| icon: ?(.*?))?}/i);
        if (footer !== null) {
            embed.setFooter(footer[1], footer[3])
        }
        let image = text.match(/{image: ?(.*?)}/i);
        if (image !== null) {
            embed.attachFile({
                attachment: image[1],
                file: image[1].substring(image[1].lastIndexOf('/') + 1)
            }).setImage('attachment://'+image[1].substring(image[1].lastIndexOf('/') + 1));
        }
        let thumb = text.match(/{thumbnail: ?(.*?)}/i);
        if (thumb !== null) {
            embed.attachFile({
                attachment: thumb[1],
                file: thumb[1].substring(thumb[1].lastIndexOf('/') + 1)
            }).setThumbnail('attachment://'+thumb[1].substring(thumb[1].lastIndexOf('/') + 1));
        }
        let author = text.match(/{author:(.*?)( \| icon: ?(.*?))?( \| url: ?(.*?))?}/i);
        if (author !== null) {
            embed.setAuthor(author[1], author[3], author[5])
        }
        let title = text.match(/{title:(.*?)}/i);
        if (title !== null) {
            embed.setTitle(title[1])
        }
        let url = text.match(/{url: ?(.*?)}/i);
        if (url !== null) {
            embed.setURL(url[1])
        }
        let description = text.match(/{description:(.*?)}/i);
        if (description !== null) {
            embed.setDescription(description[1].replace(/\\n/g, '\n'))
        }
        let color = text.match(/{colou?r: ?(.*?)}/i);
        if (color !== null) {
            embed.setColor(color[1])
        }
        let timestamp = text.match(/{timestamp(: ?(.*?))?}/i);
        if (timestamp !== null) {
            if (timestamp[2] === undefined || timestamp[2] === null)
            embed.setTimestamp(new Date());
            else
            embed.setTimestamp(new Date(timestamp[2]));
        }
        let fields = text.match(/{field: ?(.*?) \| value: ?(.*?)( \| inline)?}/gi)
        if (fields !== null) {
            fields.forEach((item) => {
            if (item[1] == null || item[2] == null || typeof item[1] === "undefined" || typeof item[2] === "undefined") return;
            let matches = item.match(/{field: ?(.*?) \| value: ?(.*?)( \| inline)?}/i);
            embed.addField(matches[1], matches[2], (matches[3] != null));
        });}
        message.channel.send({embed});
        message.delete();
    } catch(e) {
        message.channel.send({embed: (new Discord.RichEmbed).setTitle('Ошибка').setDescription('Ошибка отправки эмбэда').setColor('#C34E4E')}).then(msg => msg.delete(3000));
        console.error(e);
    }
  }
});
