function encodeHTML(lang, title, stylesheet, body) {
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${title}</title><link rel="stylesheet" href="${stylesheet}"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><h1>${title}</h1>${body}</body></html>`;
}

module.exports = { encodeHTML };
