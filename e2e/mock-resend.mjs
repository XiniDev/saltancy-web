// A stand-in for the Resend API, so the contact form can be checked end to end
// without sending real email. The site under test reaches it via RESEND_BASE_URL.
//
//   POST /emails   records the request, then accepts it or refuses it like Resend
//   GET  /__mock   returns everything recorded since the last reset
//   POST /__mock   resets the record; {"refuse": true} makes later sends fail
import { createServer } from "node:http";

const PORT = Number(process.env.MOCK_RESEND_PORT ?? 3199);

let refuse = false;
let sent = [];

function reply(res, status, body) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(body === undefined ? "" : JSON.stringify(body));
}

createServer((req, res) => {
  let raw = "";
  req.on("data", (chunk) => (raw += chunk));
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/emails") {
      sent.push({ authorization: req.headers.authorization ?? null, body: JSON.parse(raw) });
      if (refuse) {
        return reply(res, 403, {
          statusCode: 403,
          name: "validation_error",
          message: "The saltancy.com domain is not verified.",
        });
      }
      return reply(res, 200, { id: `mock-${sent.length}` });
    }
    if (req.url === "/__mock" && req.method === "GET") return reply(res, 200, { sent });
    if (req.url === "/__mock" && req.method === "POST") {
      refuse = raw ? JSON.parse(raw).refuse === true : false;
      sent = [];
      return reply(res, 200, { refuse });
    }
    reply(res, 404, { message: "Not found" });
  });
}).listen(PORT, "127.0.0.1");
