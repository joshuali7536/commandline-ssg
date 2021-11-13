const { encodeHTML } = require("../src/helper/encodeHTML");

describe("tests encodeHTML", () => {
  test("should get the exact same output", () => {
    const lang = "en",
      title = "title",
      stylesheet =
        "https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css",
      body = "the body part";

    expect(encodeHTML(lang, title, stylesheet, body)).toBe(
      `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>title</title><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><h1>title</h1>the body part</body></html>`
    );
  });
});
