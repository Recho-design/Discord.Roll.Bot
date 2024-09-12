//处理纯文本命令

const { client } = require('./client.js');

async function handlingCommand(message) {
  try {
    const command = client.commands.get(message.commandName);
    if (!command) return;
    let answer = await command.execute(message).catch((error) => {
      //console.error(error);
      //await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    });
    return answer;
  } catch (error) {
    return;
  }
}

module.exports = {
    handlingCommand
};



