/** 
    title
    body
    style
*/
export const makeHtml = (tpl) => {
    return `<!doctype html>
        <html lang="en">
        <head>
        <meta charset="utf-8">

        <title>${tpl.title}</title>
        <meta name="description" content="The HTML5">
        <meta name="author" content="SitePoint">

        <link rel="stylesheet" href="css/styles.css?v=1.0">
        <style>${tpl.style}</style>
        </head>

        <body>
            ${tpl.body}
        </body>
        </html>`
}
