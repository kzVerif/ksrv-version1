export function HTMLFilter(html: string) {
  if (!html) return "";

  let safe = html;

  // 1) ลบ script และ tag อันตรายทั้งหมด
  safe = safe.replace(/<(script|iframe|embed|object|style|meta|link|svg|math)[\s\S]*?>[\s\S]*?<\/\1>/gi, "");
  safe = safe.replace(/<(script|iframe|embed|object|style|meta|link|svg|math)[^>]*>/gi, "");

  // 2) ลบ event handlers เช่น onclick=, onerror=, onload= ฯลฯ
  safe = safe.replace(/\son\w+="[^"]*"/gi, "");
  safe = safe.replace(/\son\w+='[^']*'/gi, "");
  safe = safe.replace(/\son\w+=\S+/gi, "");


  // 4) ลบ data URLs อันตราย เช่น data:text/html;base64
  safe = safe.replace(/(href|src)\s*=\s*"data:[^"]*"/gi, "");
  safe = safe.replace(/(href|src)\s*=\s*'data:[^']*'/gi, "");
  safe = safe.replace(/(href|src)\s*=\s*data:\S+/gi, "");

  // 5) ลบ attribute อันตราย เช่น style="background:url(javascript:...)"
  safe = safe.replace(/style="[^"]*javascript:[^"]*"/gi, "");
  safe = safe.replace(/style='[^']*javascript:[^']*'/gi, "");

  // 6) ลบแท็กไม่ปกติ เช่น <base> <form> <input> <textarea>
  safe = safe.replace(/<(base|form|input|textarea|button|select|option)[^>]*>[\s\S]*?<\/\1>/gi, "");
  safe = safe.replace(/<(base|form|input|textarea|button|select|option)[^>]*>/gi, "");

  // 7) ลบ action= เพื่อกัน form แอบส่งข้อมูล
  safe = safe.replace(/\saction\s*=\s*(['"])[\s\S]*?\1/gi, "");

  return safe;
}
