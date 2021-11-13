# Contributing

Suggestions and pull requests are highly encouraged! Have a look at the [open issues](https://github.com/ritikbheda/commandline-ssg/issues).

## Requirements

[Node.js](https://nodejs.org/en/download/) version 16 or later is required.

## Workflow

First clone:

```sh
git clone https://github.com/ritikbheda/commandline-ssg
cd commandline-ssg
npm install
```

When working on the tool, use this to link your command for development:

```sh
npm link
```

## Testing Your Changes

- This tool uses a framework called Jest for testing.
- To write additional tests, look for files ending in `.test.js` and find the `describe()` suite that matches the task you want to test.
- When creating a new test or test suite, please add to the `describe()` or `test()` method what the purpose of the test is.
- To run all the test suites, type `npm run test` in the command line.
- To exclude a test, you may go into the test file and change `test()` to `test.skip()` to exclude a single test.
- To exclude all tests/suites except one, add the `only()` method to `describe()` or `it()` to run that test suite or individual test.
