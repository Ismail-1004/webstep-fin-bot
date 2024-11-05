import UserController from "../controllers/UserController.js";

export default async function (ctx) {
  try {
    const debtors = await UserController.getDebtors();

    if (debtors.length === 0) {
      await ctx.reply("Нет должников! 🎉");
    } else {
      const totalDebt = debtors.reduce((acc, el) => acc + (el.mustPay - el.paid),0)
      
      const debtorList = debtors
        .map(
          (debtor, idx) =>
            `${idx+1}) Имя: ${debtor.name}, \nГруппа: ${debtor.group.name}, \nКурс: ${
              debtor.group.course
            }, \nДолжен: ${debtor.mustPay - debtor.paid} 💵, \nНомер: ${debtor.phone}`
        )
        .join("\n\n");

      await ctx.reply(`Список должников:\n\n${debtorList}`);
      await ctx.reply(`Общаяя задолжность состовляет: ${totalDebt} 💵`)
    }
  } catch (e) {
    await ctx.reply("Произошла ошибка при получении списка должников.");
  }
}