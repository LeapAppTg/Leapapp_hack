if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config();
}
import TelegramApi from 'node-telegram-bot-api';

const bot = new TelegramApi(process.env.TOKEN || '', { polling: true })

bot.on('message', async (msg) => {
    if (msg.text && msg.text === '/start') {
        await bot.sendMessage(
            msg.chat.id,
            "Hey, click the button to launch app!",
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Launch',
                                web_app: {
                                    url: 'https://leapapp.fun'
                                }
                            }
                        ]
                    ]
                }
            }
        )
    }
})