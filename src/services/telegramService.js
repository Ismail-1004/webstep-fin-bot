import { Bot, Keyboard } from "grammy";
import debtors from "../utils/debtors.js";
import groups from "../utils/groups.js";
import profit from "../utils/profit.js";
import consumption from "../utils/consumption.js";
import students from "../utils/students.js";
import totalProfit from "../utils/totalProfit.js";

const bot = new Bot(process.env.TOKEN);

bot.command("start", async (ctx) => {
  const startKeyboard = new Keyboard()
    .text("Ученики")
    .text("Группы")
    .row()
    .text("Должники")
    .text("Прибыль")
    .row()
    .text("Расход")
    .text("Чистая прибыль")
    .resized();

  await ctx.reply(
    "Привет! - Давай посмотрим кто тебе должен и сколько ты уже заработал 🤖"
  );

  await ctx.reply("С чего начнем? Выберай 👇", {
    reply_markup: startKeyboard,
  });
});

bot.hears(["Ученики", "Группы", "Должники", "Прибыль", "Расход", "Чистая прибыль"], async (ctx) => {
  const command = ctx.message.text.toLocaleLowerCase();
  
  if (command === 'ученики') return students(ctx);
  if (command === 'группы') return groups(ctx);
  if (command === 'должники') return debtors(ctx);
  if (command === 'прибыль') return profit(ctx);
  if (command === 'расход') return consumption(ctx);
  if (command === 'чистая прибыль') return totalProfit(ctx)
});

bot.start();
export default bot;