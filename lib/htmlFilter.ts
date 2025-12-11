export function HTMLFilter(html: string) {
  if (!html) return "";

  let safe = html;

  // 1) Normalize whitespace
  safe = safe.replace(/\r\n?/g, "\n");

  // 2) Remove comments and CDATA
  safe = safe.replace(/<!--[\s\S]*?-->/g, "");
  safe = safe.replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, "");

  // 3) Lowercase protocol names for easier matching (best-effort)
  safe = safe.replace(/javascript\s*:/gi, "javascript:");
  safe = safe.replace(/data\s*:/gi, "data:");
  safe = safe.replace(/vbscript\s*:/gi, "vbscript:");

  // 4) Remove all dangerous tags outright (script/style/iframe/svg/object/etc.)
  safe = safe.replace(/<(script|iframe|embed|object|style|meta|link|svg|math|base|form|input|textarea|button|select|option|applet|frame|frameset|noscript)[\s\S]*?>[\s\S]*?<\/\1>/gi, "");
  safe = safe.replace(/<(script|iframe|embed|object|style|meta|link|svg|math|base|form|input|textarea|button|select|option|applet|frame|frameset|noscript)[^>]*>/gi, "");

  // 5) Remove template, details, and other container tags that can hide payloads
  safe = safe.replace(/<template[\s\S]*?>[\s\S]*?<\/template>/gi, "");
  safe = safe.replace(/<details[\s\S]*?>/gi, "");
  safe = safe.replace(/<\/details>/gi, "");

  // 6) Remove event handlers (on... attributes) - covers single/double/unquoted roughly
  safe = safe.replace(/\s(on[a-z\-]+)\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");

  // 7) Remove style attributes entirely (hard fail)
  safe = safe.replace(/\sstyle\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");

  // 8) Remove attributes that allow remote/pinging/submit/data: srcset, ping, action, formaction, formaction, enctype, method, contenteditable
  safe = safe.replace(/\ssrcset\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");
  safe = safe.replace(/\sping\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");
  safe = safe.replace(/\saction\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");
  safe = safe.replace(/\sformaction\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");
  safe = safe.replace(/\senctype\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");
  safe = safe.replace(/\smethod\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");
  safe = safe.replace(/\scontenteditable\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");

  // 9) Remove src and data-src attributes (if you allow images, make a stricter check instead)
  safe = safe.replace(/\ssrc\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");
  safe = safe.replace(/\sdata-src\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");
  safe = safe.replace(/\sdata-[a-z0-9\-]*\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, ""); // optionally remove other data- attrs

  // 10) Sanitize href: allow only http(s) and mailto. Remove everything else.
  // matches href="..." or href='...' or href=unquoted
  safe = safe.replace(/\shref\s*=\s*(['"])(.*?)\1/gi, (m, qq, url) => {
    const lower = (url || "").trim().toLowerCase();
    if (lower.startsWith("http://") || lower.startsWith("https://") || lower.startsWith("mailto:")) {
      // remove any javascript/data inside by rejecting if contains suspicious tokens
      if (lower.includes("javascript:") || lower.includes("data:") || lower.includes("vbscript:")) return "";
      return ` href="${url}"`;
    }
    return ""; // drop other protocols (javascript:, data:, ftp:, file:, etc.)
  });
  // unquoted href
  safe = safe.replace(/\shref\s*=\s*([^\s>]+)/gi, "");

  // 11) Remove any remaining occurrences of javascript: or data: inside attributes (best-effort)
  safe = safe.replace(/javascript:/gi, "");
  safe = safe.replace(/data:/gi, "");

  // 12) Remove any remaining lonely <base> or other single tags
  safe = safe.replace(/<\s*(base|meta|link)[^>]*>/gi, "");

  // 13) Allowlist tags only (remove tags not in list)
  // Adjust the allow list as you need.
  const allowTags = [
    "a","b","strong","i","em","u","p","br","div","span",
    "ul","ol","li","h1","h2","h3","h4","h5","h6",
    "pre","code","blockquote"
  ];
  // remove tags not in allowTags
  safe = safe.replace(/<\/?([a-z0-9\-]+)(\s[^>]*)?>/gi, (m, tag, attrs) => {
    if (allowTags.includes(tag.toLowerCase())) {
      // keep tag but strip any attributes (we keep href only via step 10)
      // allow <a href="..."> specifically (href already processed)
      if (tag.toLowerCase() === "a") {
        // recover href if present
        const hrefMatch = m.match(/\shref\s*=\s*(['"])(.*?)\1/i);
        if (hrefMatch) {
          return `<a href="${hrefMatch[2]}">`;
        }
        return `<a>`;
      }
      return `<${tag}>`;
    }
    return ""; // drop disallowed tag entirely
  });

  // 14) Final small cleanup - remove leftover dangerous keywords
  safe = safe.replace(/on\w+\s*=/gi, "");
  safe = safe.replace(/javascript\s*:/gi, "");
  safe = safe.replace(/data\s*:/gi, "");

  // 15) Trim
  return safe.trim();
}
