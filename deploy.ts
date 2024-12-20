import { serve } from "https://deno.land/std/http/server.ts";
import { readFileStr } from "https://deno.land/std/fs/mod.ts";

const PORT = 8000;

// 处理根目录请求并返回 index.html
serve(async (req) => {
  const url = new URL(req.url);
  
  if (url.pathname === "/") {
    const indexHtml = await readFileStr("./index.html");
    return new Response(indexHtml, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    });
  }
  
  return new Response("Not Found", { status: 404 });
});

console.log(`Server running on http://localhost:${PORT}`);
