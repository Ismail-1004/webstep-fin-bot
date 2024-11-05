import UserController from "../controllers/UserController.js";

export default async function (ctx) {
    try {
        const users = await UserController.getAllUsers()
        const totalProfit = users.reduce((acc, user) => acc + user.paid, 0)
        const mustBe = users.reduce((acc, user) => acc + user.mustPay, 0)

        if (mustBe === 0) {
            return await ctx.reply(`У вас нет учеников, что бы считать прибыль!`);
        }

        await ctx.reply(`Общая прибыль составляет: ${totalProfit} 💵 из ${mustBe} 💵`);
        await ctx.reply('Посмотрите список должников и напомните им об оплате');
    } catch (e) {
        await ctx.reply("Произошла ошибка при получении дохода.");
    }
}