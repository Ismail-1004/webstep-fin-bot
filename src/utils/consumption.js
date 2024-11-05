import ConsumptionController from "../controllers/ConsumptionController.js";

export default async function (ctx) {
  try {
    const consumptions = await ConsumptionController.getAllConsumptions();

    if (consumptions.length === 0)
      return await ctx.reply("У вас нет расходов! 🎉");

    const totalConsumptions = consumptions.reduce((acc, el) => acc + el.consumption, 0)
    const totalDebt = consumptions.reduce((acc, el) => acc + (el.consumption - el.paid),0)
    const consumptionsList = consumptions
      .map(
        (consumption, idx) =>
          `${idx + 1}) ${consumption.name}: оплачено ${consumption.paid} из ${consumption.consumption}`
      )
      .join("\n\n");

    await ctx.reply(`Список расходов:\n\n${consumptionsList}`);
    await ctx.reply(`Общая сумма расходов состовляет: ${totalConsumptions} 💵`)
    await ctx.reply(`Задолжность на сегодняшний день ${totalDebt} 💵`)
  } catch (e) {
    await ctx.reply("Произошла ошибка при получении списка расходов.");
  }
}