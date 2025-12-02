import { getShopSettings } from "../database/setting";
import { requireUser } from "../requireUser";

export async function sendDiscordWebhook(data: Object) {
  await requireUser()
  try {
    const setting = await getShopSettings();
    const url = setting?.webhookDiscord;
    await fetch(url ?? "", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("sendDiscordWebhook: ", error);
  }
}
