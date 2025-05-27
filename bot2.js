const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
import { mykey } from './key';

// Thay thế bằng token của bạn
const token = mykey
const bot = new TelegramBot(token, {polling: true});

// ID nhóm bạn muốn lưu tin nhắn
const TARGET_GROUP_ID = -123456789; // Thay bằng ID nhóm thực tế

// Lưu trữ tin nhắn
const messages = [];

bot.on('message', (msg) => {
  if (msg.chat.id === TARGET_GROUP_ID) {
    const messageData = {
      date: new Date(msg.date * 1000),
      from: msg.from ? `${msg.from.first_name} ${msg.from.last_name || ''}` : 'Unknown',
      text: msg.text
    };
    
    messages.push(messageData);
    fs.appendFileSync('telegram_messages.json', JSON.stringify(messageData) + ',\n');
    
    console.log('Đã lưu tin nhắn:', messageData);
  }
});

console.log('Bot đang chạy và theo dõi tin nhắn...');