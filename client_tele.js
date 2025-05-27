const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // Để nhập dữ liệu từ console

const apiId = 12345; // Lấy từ https://my.telegram.org
const apiHash = 'YOUR_API_HASH';
const stringSession = new StringSession(''); // Bỏ trống cho lần đầu

const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
});

(async () => {
    await client.start({
        phoneNumber: async () => await input.text('0788654020'),
        password: async () => await input.text('Mật khẩu? '),
        phoneCode: async () => await input.text('Mã OTP? '),
        onError: (err) => console.log(err),
    });

    console.log('Bạn đã đăng nhập:', stringSession.save());

    // ID nhóm hoặc channel bạn muốn lưu
    const targetEntity = await client.getEntity('username_nhom'); // hoặc dùng ID

    client.addEventHandler(async (event) => {
        if (event.chatId.equals(targetEntity.id)) {
            const message = event.message;
            console.log('Tin nhắn mới:', {
                from: message.senderId,
                text: message.text,
                date: message.date
            });
            // Lưu vào file hoặc database ở đây
        }
    });
})();