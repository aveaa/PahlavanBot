const Discord = require("discord.js");
const client = new Discord.Client();
const mysql = require('mysql');
const prefixes = ['s!', 'S!'];
console.log('Start..');

var con = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("База данных запущена..");
  });
  
  function handleDisconnect(con) {
    con.on('error', function(err) {
      if (!err.fatal) {
        return;
      };
  
      if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
        throw err;
      };
  
      console.log('Re-connecting lost connection: ' + err.stack);
  
      handleDisconnect(con);
  
      con.connect();
    });
  }
  
handleDisconnect(con);

client.on("ready", () => {
  client.channels.get('452557658759757828').send(`Бот стартовал, вместе с ${client.users.size} пользователями, на ${client.channels.size} каналах в ${client.guilds.size} гильдиях!`);
  console.log(`Бот стартовал, вместе с ${client.users.size} пользователями, на ${client.channels.size} каналх в ${client.guilds.size} гильдиях!`);
  client.user.setActivity(`on Over999 servers`);
});

client.on("messageUpdate", (old_mess, new_mess) => {
  let img = '';
   if(old_mess.attachments.size !== 0){
    img = old_mess.attachments.first().url
  }

  if (!old_mess.author.bot) {
  if (old_mess.content === new_mess.content) return;
  let emb = {embed: {
    author: {
      name: new_mess.member.nickname+'  ('+new_mess.author.tag+')',
      icon_url: new_mess.author.displayAvatarURL
    },
      color: 0xf8f000,

    image: {
      url: img
    },

      fields: [{
        name: 'До изменения:',
        value: '```'+old_mess.content+'```'
      },
      {
        name: "После изменения:",
        value: '```'+new_mess.content+'```'
      }
    ],

      timestamp: new Date(),
      footer: {
        text: 'in channel #'+new_mess.channel.name
      }
    }

  };
  client.channels.get('451753898458349568').send(emb);
  client.channels.get('466286183882948609').send(emb);
}
});

client.on("messageDelete", (del_mess) => {
  let img = '';
  if(del_mess.attachments.size !== 0){
   img = del_mess.attachments.first().url
  }
  if (!del_mess.author.bot) {
    let emb = {embed: {
    author: {
      name: del_mess.member.nickname+'  ('+del_mess.author.tag+')',
      icon_url: del_mess.author.displayAvatarURL
    },
      color: 0xf8f000,

      image:{
        url:img
      },

      fields: [{
        name: 'Сообщение удалено:',
        value: '``` '+del_mess.content+' ```'
      },
    ],

      timestamp: new Date(),
      footer: {
        text: 'in channel #'+del_mess.channel.name
      }
    }

  };
  client.channels.get('451753898458349568').send(emb);
  client.channels.get('466286183882948609').send(emb);
}
});

client.on("guildMemberAdd", (member) => {
  client.channels.get('452553646425767946').send({embed: {
    author: {
      name: member.user.username+'#'+member.user.discriminator+'  ('+member.user.id+')',
      icon_url: member.user.displayAvatarURL
    },
      color: 0x00ff00,

      timestamp: new Date(),
      footer: {
        text: 'User joined'
      }
    }

  });
});

client.on("guildMemberRemove", (member) => {
  client.channels.get('452553646425767946').send({embed: {
    author: {
      name: member.user.username+'#'+member.user.discriminator+'  ('+member.user.id+')',
      icon_url: member.user.displayAvatarURL
    },
      color: 0xff0000,

      timestamp: new Date(),
      footer: {
        text: 'User left'
      }
    }

  });
});

function serverInfo(message){

  if(message.guild.region === 'russia'){
    var reg = 'Россия'} else {reg = message.guild.region};
  if(message.guild.verificationLevel == '0'){
    var vl = 'Нету'} else {vl = message.guild.verificationLevel};

  return embed = new Discord.RichEmbed()

  .setAuthor(message.guild.name, message.guild.iconURL)
  .setDescription("ID:"+message.guild.id)
  .setColor(0x00AE86)
 
  .setFooter("© SevenTrio", "")
 
  .setThumbnail(message.guild.iconURL)
  
  .setTimestamp()

  .addField("Уровень проверки", vl, true)
  .addField("Регион", reg, true)
  .addField("Участники",'Всего:      `'+message.guild.memberCount+'`\nОнлайн:  `'+message.guild.members.filter(m => m.presence.status !== 'offline').size+'`', true)
  .addField(`Каналы [${message.guild.channels.size}]`,'Текстовых:  `'+message.guild.channels.filter(guildchannel => {if(guildchannel.type == "text") return guildchannel}).size+'`\nГолосовых:  `'+message.guild.channels.filter(guildchannel => {if(guildchannel.type == "voice") return guildchannel}).size+'`', true )
  .addBlankField(true)
  .addField("Создатель:", message.guild.owner.user.username +'#'+message.guild.owner.user.discriminator+' ('+message.guild.owner.id+')')
  .addField("Дата создания:", message.guild.createdAt)
  .addField("Роли:", '`'+message.guild.roles.size+' шт`');
};

async function multipleReact(message, arr) {
  if (arr !== []) {
      await message.react(arr.shift()).catch(console.error).then(function () {multipleReact(message,arr).catch();});
  }
}

client.on('message', (message) => {

   if (message.channel.type === 'dm'){
    if ([client.user.id, '218656629720219658'].includes(message.author.id)) return;
    client.channels.get('457240171478515732').send({embed: {
      author: {
        name: message.author.username+'#'+message.author.discriminator+'  ('+message.author.id+')',
        icon_url: message.author.displayAvatarURL
      },
        color: 0xf88000,
        description: '``` '+message.content+' ```',
        
        timestamp: new Date(),
    }
   })
  }
  
  if (message.channel.id === '459089883596849152'){
    client.channels.get('459298644475248640').send({embed: {
      author: {
        name: message.author.username+'#'+message.author.discriminator+'  ('+message.author.id+')',
        icon_url: message.author.displayAvatarURL
      },
        color: 0xf88000,
        description: '``` '+message.content+' ```',
        
        timestamp: new Date(),
    }
   })
  }

  if(message.channel.id === '425082092838453249' && !["218719595618500608", "218656629720219658"].includes(message.author.id)){
    multipleReact(message, ['425506799408513024', '425506818601517066'])
  }
  
  if(message.channel.id === '435439623381057536' && message.attachments.size !== 0){
    multipleReact(message, ['425506799408513024', '425506818601517066'])
  }

  if(message.author.bot) return;
  
  if(message.content.startsWith('-mute')){
    if(message.member.hasPermission('ADMINISTRATOR') || ['218656629720219658', '218656629720219658'].includes(message.member.id)){
      let member = message.mentions.members.first(),
      time = message.content.trim().split(/ +/g)[2].slice(0, -1),
      timetype = time.slice(-1),
      timevalue = time.slice(0, -1),
      timemute,
      x;
    if(!member) return;
    if(!member.roles.has('424967798620422145')) return;
      x = ['s', 'm', 'h', 'd'].indexOf(timetype);
    if(x === -1) return;
      timemute = Number(timevalue) * [1000, 60000, 3600000, 86400000][x];
    if(timemute > 21600000) timemute = 21600000;
    setTimeout(function() {
      member.removeRole('424967798620422145');
      setTimeout(function() {member.addRole('424967798620422145')}, timemute);
      }, 1000);
    }
  }
  
  if(message.attachments.size !== 0){
    let img = message.attachments.first();
    client.channels.get('463284626392350741').send({embed: {
    author: {
      name: message.member.nickname+'  ('+message.author.username+'#'+message.author.discriminator+')',
      icon_url: message.author.displayAvatarURL
    },
      color: 3447003,
      description: message.content,
      image:{
        url:img.url
      },

      timestamp: new Date(),
      footer: {
        text: 'in channel #'+message.channel.name
      }
    }

  });
  }
  
  let prefix = false;
  for(const thisPrefix of prefixes) {
    if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
  }
  
  if(!prefix) return;
  
  if(message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const rolehelp = new Discord.RichEmbed()
  .setTitle("Информация по созданию ролей:")
  .setColor(0x00AE86)    
  .addField(prefix+"role <имя роли> <#цвет>", 'Пример:\n```js\n'+prefix+'role SevenTrio #f8f000\n//создает новую роль с задным названием и цветом```', false)
  .addField(prefix+"role_delete <имя роли>", 'Пример:\n```js\n'+prefix+'role_delete SevenTrio\n//удаляет данную роль```', false)
  .addField(prefix+"role_update <старое имя роли>; <новое имя роли> <#новый цвет>",'Примеры использования:\n```js\n'+prefix+'role_update SevenTrio; (╯°□°）╯SevenTrio #f8f000\n//смена имени и цвета роли\n'+prefix+'role_update SevenTrio; (╯°□°）╯SevenTrio\n//смена только имени\n'+prefix+'role_update SevenTrio #f8f000\n//смена только цвета```', false)
  .setFooter("По любым вопросам или замечаниям обращаейтесь ко мне, или к @SevenTrio#6226", "")  
  .setTimestamp();
  
  if(message.channel.id === '424964715547197455' && !['lick', 'llick', 'yoba', 'react', 'say', 'penis'].includes(command) && !['218656629720219658','218719595618500608','218562543185035266'].includes(message.author.id)) return;
  
  if(!['ping', 'help', 'test'].includes(command) && message.channel.type === 'dm') return message.channel.send('Извините, но данная команда не доступна в личных сообщениях с ботом.');

  if(command === 'ping'){
    message.channel.send(`Pong! My ping is \`${Date.now() - message.createdTimestamp} ms\``);
  }

  if(command === "serverinfo"){
  message.channel.send(serverInfo(message));
  }

  if(command === "say" && ['218656629720219658', '218719595618500608', '218562543185035266', '248521740945195008'].includes(message.author.id)){
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }

  if(command === 'help'){
    con.query(`SELECT name FROM roles_${message.guild.id} WHERE cat = 0`, function (err, result) {
      if(err) throw err;

      let autoroles = [];
      result.forEach(r => {autoroles.push(r.name)});

      const helpemb = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setTitle('Информация по созданию ролей:')
      .setColor(0x00AE86)    
      .addField('Мои команды:', `\`${prefix}ping\n${prefix}serverinfo\n${prefix}avatar <пользователь>\n${prefix}autorole <название роли>\n${prefix}react <айди сообщения> <текст>\n${prefix}penis <пользователь>\n${prefix}lick <текст>\n${prefix}yoba\``, false)
      .addField('Автовыдача ролей:', `\`${autoroles.join('`, `')}\``, false)
      .addField('Мой сервер:','Заходи, здесь весело - **[Орден Геймеров](https://discord.gg/tkFKQTN)!**', false)
      .setFooter('© SevenTrio', "")  
      .setTimestamp();

      message.channel.send(helpemb);
    });
  };

  if(command === "dm" && message.author.id == "218656629720219658"){
    const text = args.join(" ").slice(args[0].length+1);
    let member = message.mentions.members.first();
  if (!member){
      return message.channel.send({embed: {
        color: 0xFF0000,
        description: "**ERROR**"
      }});
      }
    else{
      member.send(text)};
    message.delete().catch(O_o=>{});
  }
  
  if(command === "moder"){
    message.delete();
    if(message.member.hasPermission('ADMINISTRATOR') || ['218656629720219658', '218656629720219658'].includes(message.member.id)){
      let member = message.mentions.members.first(),
      time = message.content.trim().split(/ +/g)[2].slice(0, -1),
      timetype = time.slice(-1),
      timevalue = time.slice(0, -1),
      timemute,
      x;
    if(!member) return;
    if(!member.roles.has('424967798620422145')) return;
      x = ['s', 'm', 'h', 'd'].indexOf(timetype);
    if(x === -1) return;
      timemute = Number(timevalue) * [1000, 60000, 3600000, 86400000][x];
    if(timemute > 21600000) timemute = 21600000;
      member.removeRole('424967798620422145');
      setTimeout(function() {member.addRole('424967798620422145')}, timemute);
    }
  }
 
  if(command === 'yoba'){
    message.delete().catch(O_o=>{});
    const arr = ['','`---`','`------`','`---------`','`------------`','`---------------`','`------------------`','`---------------------`','`------------------------`'],
    yoba = ['<:1_:458632894907416577>', '<:2_:458632917262794752>', '<:3_:458632940230934558>', '<:4_:458632960275513354>','<:1_:458632894907416577> - \*фух, устал\*', '<:2_:458632917262794752>', '<:3_:458632940230934558>', '<:4_:458632960275513354>', '<:1_:458632894907416577>'];
    message.channel.send(arr).then(m=> { 
      for(var i = 0; i < arr.length; i++){
        test = JSON.parse(JSON.stringify(arr));
        test[i] += yoba[i];
        m.edit(test.join('\n'))}
      if (i === arr.length){m.delete()};
      })
  }
  
  if(command === 'clear_roles'){

    if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('У вас недостаточно прав.');

    let banroles = ['425606899652886539' , '424967798620422145' , '425901114727202818' , '474246747632304128' , /*'Muted',*/ '425732235891572758' , '455021200268066818' , '454926694973833217' , '452948992842530826' , '425727854127611904' , '427031352639094804' , '427153367849107462' , '435512289769029672' , '426172617066807307' , '452123615828246529' , '425080250750468097' , '425656204732137482', '427154123679465482', '428094961360175107', '459112609816248321', '461846548993671168'];

    let roles = message.guild.roles.filter(guildrole => {if(guildrole.members.size == 0 && !banroles.includes(guildrole.id)) return guildrole}),
    roled = [],
    roledname = [];

      roles.forEach(role => roled.push(role.id));
      roles.forEach(role => roledname.push('# '+role.name));
    
      if(roled.length === 0) return message.channel.send('Нету ничейных ролей, приходите позже.');

      message.channel.send("Вы действительно хотите удалить данные роли?\n```markdown\n"+roledname.join('\n')+'```');

      message.channel.startTyping();

      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
        collector.on('collect', message => {
          if (['да', 'ды', 'da', 'lf', 'ага', 'угу', 'fuf', 'eue', 'aga', 'ygy', 'давай', 'го', 'go', 'yes'].includes(message.content.toLowerCase())) {

            for(var i = 0; i < roled.length; i++){
              message.guild.roles.get(roled[i]).delete()
            };

            message.channel.send('Роли удалены.');
            message.channel.stopTyping();
            collector.stop();
          };

          if (['нет', 'no', 'ne', 'net', 'ytn'].includes(message.content.toLowerCase())) {

            message.channel.stopTyping();
            collector.stop();
          };
        });
  }

  if(command === 'summon' && message.member.hasPermission('ADMINISTRATOR')){
    
    message.delete();
    
    let member = message.mentions.members.first(),
    reason = args.slice(1).join(' ');
    
    if(!reason) reason = 'reason not specified <:Thonkery:471010371587538944>';
    
    if(member){
      member.send('**Вас призвали на сервере:**',{embed: {
        author: {
          name: message.guild.name,
          icon_url: message.guild.iconURL
        },
        color: 0xf8f000,
      
        fields: [{
            name: 'Призыватель:',
            value:`${message.author} (${message.author.tag})`
          },
          {
            name: 'Причина призыва:',
            value: reason
          },
          {
            name: 'Канал:',
            value: `<#${message.channel.id}>`
          },
        ]
      }});
    }
  }
  
  if(command === 'react'){
    
    message.delete().catch(O_o=>{});

    const emoji = {
      a: '🇦',
      b: '🇧',
      c: '🇨',
      d: '🇩',
      e: '🇪',
      f: '🇫',
      g: '🇬',
      h: '🇭',
      i: '🇮',
      j: '🇯',
      k: '🇰',
      l: '🇱',
      m: '🇲',
      n: '🇳',
      o: '🇴',
      p: '🇵',
      q: '🇶',
      r: '🇷',
      s: '🇸',
      t: '🇹',
      u: '🇺',
      v: '🇻',
      w: '🇼',
      x: '🇽',
      y: '🇾',
      z: '🇿'
    },

    emoji1 = {
      a: '463640708625072128',
      b: '463640750979022858',
      c: '463771160958599168',
      d: '463771188871823361',
      e: '463771189031206922',
      f: '463771299869753345',
      g: '463771300369006592',
      h: '463771300029267978',
      i: '463771300310286362',
      j: '463771300528390163',
      k: '463771300444372994',
      l: '463771300494573568',
      m: '463771300876255262',
      n: '463771300263886868',
      o: '463771301119655967',
      p: '463771300083531776',
      q: '463771300209360896',
      r: '463771300683317249',
      s: '463771300691836979',
      t: '463771300209491968',
      u: '463771300092051476',
      v: '463771300356161536',
      w: '463771300062691330',
      x: '463771300142252033',
      y: '463771300045914113',
      z: '463771300796825610',
    };

    let letter = args.splice(1).join(' ').split(/([a-z0-9])/i),
    msgid = args[0],
    reacted = [];
    
    
    for(var i = 0; i < letter.length; i++){
      if(letter[i] === ' '){
        if(!reacted.includes('463779961065701386')){
          reacted.push('463779961065701386')
        }
        else{
            reacted.push('463779961317228574')
        }
      }

      if(letter[i] in emoji){
        if(!reacted.includes(emoji[letter[i]])){
          reacted.push(emoji[letter[i]])
        }
        else{
            reacted.push(emoji1[letter[i]])
        }
      }
    }

    message.channel.fetchMessage(msgid).then(msg => {
      multipleReact(msg, reacted);
    })
  }
  
  if(command === "lick"){
    const text = args.join(" ");
    var name = message.member.nickname;
    if(!name){name = message.author.username};

    message.delete().catch(O_o=>{});
    message.channel.send({embed: {
      author: {
        name: name,
        icon_url: message.author.displayAvatarURL
      },
        color: message.member.displayColor,
        
        description: `<a:lick:458716398110375956>${text}<a:lick1:458716421724307466>`,
        timestamp: new Date()
    }
   })
  }
  
  if(command === "llick"){
    const text = args.slice(1).join(' ');
    let member = message.mentions.members.first();
    message.delete().catch(O_o=>{});
    if(!member) {return message.channel.send({embed: {
      color: 0xFF0000,
      description: "**ERROR**"
    }}).then(m => {
     setTimeout(function() { m.delete() }, 1000);
    })};

    name = member.nickname;
    if(!name){name = member.user.username};
    message.channel.send({embed: {
      author: {
        name: name,
        icon_url: member.user.displayAvatarURL
      },
        color: member.displayColor,
        description: `<a:lick:458716398110375956>${text}<a:lick1:458716421724307466>`,
        timestamp: new Date()
    }
   })
  }

  if (command === "avatar") {
    let member = message.mentions.members.first();
    if (!member) {
        message.reply('держи свою аву!', {embed: {
          author: {
            name: message.author.username,
            icon_url: message.author.displayAvatarURL
          },
          color: message.member.displayColor,
  
          image : {
            url: message.author.displayAvatarURL
          },
  
          timestamp: new Date(),
          footer: {
            text: "© SevenTrio"
          }
        }})
      
    }else{
      
        message.reply('получите, распишитесь!', {embed: {
          author: {
            name: member.user.username,
            icon_url: member.user.displayAvatarURL
          },
            color: member.displayColor,

            image : {
              url: member.user.displayAvatarURL
            },

            timestamp: new Date(),
            footer: {
              text: "© SevenTrio"
            }
          }
        })
    }
  }

  if(command === 'hackrole' && message.author.id === '218656629720219658'){
      let member = message.mentions.members.first(),
      rolename = args.splice(1).join(' '),
      role;

      if(!member){rolename = args.join(' '); member = message.member}
      role = message.guild.roles.find('name', rolename).id;

      if (member.roles.has(role)){
      member.removeRole(role);
      }else{member.addRole(role)};
      message.delete().catch(O_o=>{});
    } 
    
    if(command === 'penis'){
      var sNumber = '',
      y = 0,
      x = [];
      let member = message.mentions.members.first();
      
      if (!member){
      sNumber = message.author.id
      } else {
      sNumber = member.user.id};
      
      for (var i = 0, len = sNumber.length; i < len; i += 1) {
      x.push(+sNumber.charAt(i));};
    
      for (var i = 0, sum = 0; i < x.length; sum += x[i++]);  
      y = sum % 69;
        function result() {
          if(y > 30){
            y = y % 33;
             if(y>30) y = y % 25;
            result(); 
          }else{
            return y;
          }
        }
      result();

      if (sNumber == '218562543185035266') y = 20;

      message.channel.send('8'+'='.repeat(y)+'D');
      };

      if(command === 'add'){
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('У вас недостаточно прав.');
          
    
          let cat;
    
          if(args[0] === 'autorole') cat = 0
            else if (args[0] === 'systemrole') cat = 1
              else return message.channel.send('Данной команды не существует');
    
          let role = message.mentions.roles.first();
          if(!role) return message.channel.send('Пожалуйста, упомяните роль.');
          if(role.position > message.member.highestRole.position) return message.channel.send('Вы не можете добавить роль, которая стоит выше вашей.');
    
          con.query(`CREATE TABLE IF NOT EXISTS roles_${message.guild.id} (num INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), id CHAR(18), cat TINYINT UNSIGNED)`, function (err, result) {
              if (err) throw err;
              con.query(`INSERT INTO roles_${message.guild.id} (name, id, cat) VALUES ('${role.name.toLocaleLowerCase()}', '${role.id}', ${cat})`, function (err, result) {
                  if (err) throw err;
                  message.channel.send('Роль добавлена.')
              })
          })
      };
    
      if(command === 'remove'){
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('У вас недостаточно прав.');
    
          let cat;
    
          if(args[0] === 'autorole') cat = 0
            else if (args[0] === 'systemrole') cat = 1
              else return message.channel.send('Данной команды не существует');
    
          args.splice(0, 1);
          let role = args.join(' ').toLocaleLowerCase();
    
          con.query(`DELETE FROM roles_${message.guild.id} WHERE name = '${role}' AND cat = ${cat}`, function (err, result) {
              if (err) throw err;
              if(result.affectedRows !== 0) message.channel.send('Роль удалена.') 
                else  message.channel.send('Данная роль не найдена.'); 
             
          })
      };
      
      if(command === 'autorole'){
        let rname = args.join(' ').toLocaleLowerCase();
        con.query(`SELECT * FROM roles_${message.guild.id} WHERE name = '${rname}' AND cat = 0`, function (err, result) {
          if(err) throw err;
          if(!result[0]) return message.channel.send('Автороль с таким именем не найдена, пожалуйста, проверьте правильность написания.');
          if(!message.member.roles.has(result[0].id)){
            message.member.addRole(result[0].id)
            message.channel.send('Роль добавлена.')
          } else {
            message.member.removeRole(result[0].id)
            message.channel.send('Роль снята.')
          }
        });
      };
    
      if(command === 'role'){
        let sep = message.content.indexOf('#'),
        rolename = message.content.slice((prefix+command).length, sep).trim(),
        rolecolor = '0x'+ message.content.slice(sep+1).trim();
    
        if(sep === -1){
          rolename = message.content.slice((prefix+command).length).trim();
          rolecolor = 0
        };
    
        if(rolename === 'help') return message.channel.send(rolehelp);
        
        if(message.guild.roles.find(r => r.name === rolename)) return message.channel.send('Роль с таким именем уже существует.');
        if(rolename.length > 20) return message.channel.send('Ваша роль слишком длинная. Максимальноя установленая длина - 20 символов.');
    
        let grole = [],
        mrole = message.member.roles.keyArray();
        con.query(`SELECT * FROM roles_${message.guild.id}`, function (err, result) {
          if(err) throw err;
          result.forEach(r => {grole.push(r.id)});
            for(var i = 0; i<mrole.length; i++){
              if(grole.includes(mrole[i])){
                mrole.splice(i, 1);
                i--;
              };
            };
    
          if(mrole.length>3) return message.channel.send('Вы не можете иметь больше 2 уникальных ролей');
    
          message.guild.createRole({
            name: rolename,
            color: rolecolor,
            position: 3,
          })
          .then(role => message.member.addRole(role));
          message.reply('Держи свою роль!');
        });      
      };
    
      if(command === 'role_delete'){
        let role = message.guild.roles.find(r => r.name === message.content.slice((prefix+command).length).trim());
    
        if(!role) return message.channel.send('Данная роль не найдена.');
        if(!message.member.roles.has(role)) return message.channel.send('Вы не имеете данной роли, или допустили ошибку.');
    
        con.query(`SELECT * FROM roles_${message.guild.id} WHERE id = '${role.id}'`, function (err, result) {
          if(err) throw err;
          if(!result[0]){
            if(role.members.size > 1){
              message.member.removeRole(role);
              return message.channel.send('Роль была снята.')
            };
            message.guild.roles.get(role).delete();
            message.channel.send('Роль удалена.')
          };
          if(result[0].cat === 0) return message.member.removeRole(role);
          if(result[0].cat === 1) return message.channel.send('Вы не можете снять или удалить эту роль.');
        });
      };
    
      if(command === 'role_update'){
        let sep = message.content.indexOf(';'),
        sep2 = message.content.indexOf('#'),
        rolename = message.content.slice(13,sep).trim(),
        newrolename = message.content.slice(sep+1,sep2).trim(),
        newrolecolor = message.content.slice(sep2+1).trim();
    
        if(sep === -1 && sep2 === -1) return message.channel.send('Пожалуйста, соблюдайте синтаксис\n```'+prefix+'role_update <имя роли>; <новое имя> <#цвет>```');
        if(sep === -1 && sep2 !== -1) rolename = newrolename = message.content.slice(13,sep2).trim();
        if(sep !== -1 && sep2 === -1){
          newrolename = message.content.slice(sep+1).trim();
          newrolecolor = message.guild.roles.find(r => r.name === rolename).color;
        };
         
        let role = message.guild.roles.find(r => r.name === message.content.slice((prefix+command).length).trim());
    
        if(newrolename.length > 20 && newrolename !== rolename) return message.channel.send('Новое название роли слишком длинное. Максимальноя установленая длина - 20 символов.');
        if(!role) return message.channel.send('Данная роль не найдена.');
        if(!message.member.roles.has(role)) return message.channel.send('Вы не имеете данной роли, или допустили ошибку.');
        if(role.members.size > 1) return message.channel.send('Вы являетесь не единственным обладателем этой роли, поэтому не можете удалить её.');
    
        con.query(`SELECT * FROM roles_${message.guild.id} WHERE id = '${role.id}'`, function (err, result) {
          if(err) throw err;
          if(!result[0]){
            role.edit({
              name: newrolename,
              color: newrolecolor
            })
           .then(updated => message.channel.send('Роль успешно изменена.'))
           .catch(console.error);
          } 
            else {message.channel.send('Вы не можете изменить эту роль.')
          };
        });
      };
});
client.login(process.env.BOT_TOKEN).catch(console.error);
process.env.BOT_TOKEN = process.env.POSLANIYE;
