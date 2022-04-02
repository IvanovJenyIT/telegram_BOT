const TelegramBot = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options')

const token = "5255678677:AAHbsFabe98A5QwyIDi2NyyqUboHRmy8OY4"

const bot = new TelegramBot(token, {polling: true});

const chats = {}


const startGame = async(chatId) => {
  await bot.sendMessage(chatId, 'я загадаю цифру от 0 до 9')
      const randNumber = Math.floor(Math.random() * 10)
      chats[chatId] = randNumber
      await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const start = () =>   {
  bot.setMyCommands([
    {command: '/start', description: 'начальное приветствие'},
    {command: '/info', description: 'получ инфу о пользоват'},
    {command: '/game', description: 'Игра угад цифру' }
  ])

  bot.on('message', async  (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    if(text === '/start') {
      await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/7e8/aa6/7e8aa67b-ad91-4d61-8f62-301bde115989/256/3.webp')
      return bot.sendMessage(chatId, 'Привет ауа' + text)
    }
    if(text === '/game') {
      return startGame(chatId)
    }
    return bot.sendMessage(chatId, 'я тебя не понимаю')
  });

  bot.on('callback_query', async msg => {
    const data = msg.data
    const chatId = msg.message.chat.id
    if(data === 'again') {
      return startGame(chatId)
    }
    console.log(chats[chatId])
    if(data === chats[chatId]) {
      return bot.sendMessage(chatId, 'Ты угадал', againOptions)
    } else return  bot.sendMessage(chatId, 'Ты не угадал', againOptions) 
  })
}


start()