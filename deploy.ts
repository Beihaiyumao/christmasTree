import { serve } from "https://deno.land/std/http/server.ts";
import { extname } from "https://deno.land/std/path/mod.ts";

// 更新为 Deno.readTextFile
const PORT = 8000;

const mimeTypes: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

serve(async (req) => {
  const url = new URL(req.url);
  let filePath = url.pathname === "/" ? "/index.html" : url.pathname;
  const fileExt = extname(filePath);

  try {
    // 使用 Deno.readTextFile 替代 readFileStr
    const file = await Deno.readTextFile("." + filePath);
    const contentType = mimeTypes[fileExt] || "application/octet-stream";
    return new Response(file, {
      headers: { "Content-Type": contentType },
    });
  } catch (e) {
    return new Response("Not Found", { status: 404 });
  }
});
