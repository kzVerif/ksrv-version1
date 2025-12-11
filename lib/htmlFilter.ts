export function HTMLFilter(html: string) {
  if (!html) return "";
  
  let safe = html;

  // ลบ script ทั้งหมด
  safe = safe.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");

  // ลบ event handlers เช่น onclick="..."
  safe = safe.replace(/\son\w+="[^"]*"/gi, "");
  safe = safe.replace(/\son\w+='\[^']*'/gi, "");
  safe = safe.replace(/\son\w+=\S+/gi, "");

  return safe;
}
