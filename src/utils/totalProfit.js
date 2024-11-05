import UserController from "../controllers/UserController.js";
import ConsumptionController from "../controllers/ConsumptionController.js";

export default async function (ctx) {
    try {
        const students = await UserController.getAllUsers()  
        const consumptions = await ConsumptionController.getAllConsumptions();

        const totalProfit = students.reduce((acc, student) => acc + student.mustPay, 0)
        const totalConsumptions = consumptions.reduce((acc, el) => acc + el.consumption, 0)

        await ctx.reply(`Общая прибыль на сегодняшний день ${totalProfit - totalConsumptions} 💵`)        
    } catch (e) {
        console.log(e);
        
        await ctx.reply("Произошла ошибка при получении списка студентов.");
    }
}