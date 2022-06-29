//@deno-types="https://deno.land/x/servest@v1.3.4/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@1.3.4/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.4/mod.ts";

const app = createApp();

app.handle('/', async (req) => {
    const colorForm = await req.formData()
    const colorName = colorForm!.value('color');
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/html; charset=UTF-8",
        }),
        body: ReactDOMServer.renderToString(
            <html>
            <head>
                <meta charSet="UTF-8" />
                <title>Deno</title>
            </head>
            <body>
                <form action="/" method="post">
                    <label htmlFor="color">Color</label>
                    <input type="text" name="color" />
                    <button type="submit">Enviar</button>
                </form>
                <ul>
                        <li style={{color: colorName}}>{colorName}</li>
                </ul>
            </body>
            </html>
        )
    })
})

app.listen({port:8080})