const file = require("../src/fileFolder/file");

describe("parse markdown return values", () => {
  test("return is h1", () => {
    expect(file.parseMd("# heading size 1")).toBe("<h1>heading size 1</h1>");
  });

  test("return is h2", () => {
    expect(file.parseMd("## Features")).toBe("<h2>Features</h2>");
  });

  test("return is h3", () => {
    expect(file.parseMd("### heading size 3")).toBe("<h3>heading size 3</h3>");
  });

  test("return is h4", () => {
    expect(file.parseMd("#### heading size 4")).toBe("<h4>heading size 4</h4>");
  });

  test("return is h5", () => {
    expect(file.parseMd("##### heading size 5")).toBe(
      "<h5>heading size 5</h5>"
    );
  });

  test("return is h6", () => {
    expect(file.parseMd("###### heading size 6")).toBe(
      "<h6>heading size 6</h6>"
    );
  });

  test("return is b for **", () => {
    expect(file.parseMd("**testing bold**")).toBe("<b>testing bold</b>");
  });

  test("return is b for __", () => {
    expect(file.parseMd("__testing bold__")).toBe("<b>testing bold</b>");
  });

  test("return is i for *", () => {
    expect(file.parseMd("*testing italics*")).toBe("<i>testing italics</i>");
  });

  test("return is i for _", () => {
    expect(file.parseMd("_testing italics_")).toBe("<i>testing italics</i>");
  });

  test("return is del for ~~", () => {
    expect(file.parseMd("~~testing del~~")).toBe("<del>testing del</del>");
  });

  test("return is a for []() links", () => {
    expect(
      file.parseMd(
        "[MDN WebDocs](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)"
      )
    ).toBe(
      "<a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang'>MDN WebDocs</a>"
    );
  });

  test("return is a for <> links", () => {
    expect(
      file.parseMd(
        "<https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang>"
      )
    ).toBe(
      "<a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang'>https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang</a>"
    );
  });

  test("return is code for >", () => {
    expect(file.parseMd("> testing code")).toBe("<code>testing code</code>");
  });
});
