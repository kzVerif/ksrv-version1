import { getShopSettingsForAdmin } from "../database/setting";
export async function sendDiscordWebhook(data: Object) {
  try {
    const setting = await getShopSettingsForAdmin();
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
