import GroupsController from "../controllers/GroupsController.js";

export default async function (ctx) {
  try {
    const groups = await GroupsController.getAllGroups();

    if (groups.length === 0) {
      await ctx.reply("Группы не найдены 😔");
    } else {
      const groupsList = groups
        .map(
          (group) =>
            `Группа: ${group.name}, Курс: ${group.course}`
        )
        .join("\n\n");

      await ctx.reply(`Список групп:\n\n${groupsList}`);
    }
  } catch (e) {
    await ctx.reply("Произошла ошибка при получении списка групп.");
  }
}