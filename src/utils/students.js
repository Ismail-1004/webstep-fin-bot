import UserController from "../controllers/UserController.js";

export default async function (ctx) {
    try {
        const students = await UserController.getAllUsers()  
                

        if (students.length === 0) return await ctx.reply("У вас нет студентов 😔");

        const studentsList = students.map((student, idx) => 
            `${idx+1}) Имя: ${student.name} \nГруппа: ${student.group.name} \nКурс: ${
                student.group.course
            } \nНомер: ${student.phone} \n\n`
        ).join('')

        await ctx.reply(`Список студентов\n\n${studentsList}`);
    } catch (e) {
        await ctx.reply("Произошла ошибка при получении списка студентов.");
    }
}