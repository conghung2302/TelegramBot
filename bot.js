const { Telegraf } = require('telegraf');
const fs = require('fs');
// dns.setDefaultResultOrder('ipv4first'); 
const bot = new Telegraf("7986755919:AAGW97C3zS02OzPdpWFfOetx6ZJ7eHvaUcI");

// Xử lý tin nhắn
bot.on('text', (ctx) => {
    const userId = ctx.message.from.id;
    const text = ctx.message.text;
    console.log(`Nhận tin nhắn từ ${userId}: ${text}`);

    // Ghi vào file
    fs.appendFile('telegram_messages.txt', `User ${userId}: ${text}\n`, (err) => {
        if (err) console.error("Lỗi khi ghi file:", err);
    });

    ctx.reply(`Bot đã nhận: "${text}" và ghi vào file!`);
});

// Khởi động bot
bot.launch().then(() => {
    console.log('Bot đang chạy...');
});