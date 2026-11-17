# E-commerce QA Automation Framework

A beginner-friendly UI + API automation project built with **JavaScript**, **Playwright Test**, Page Object Model (POM), and GitHub Actions.

> Demo systems: [SauceDemo](https://www.saucedemo.com) for UI testing and [DummyJSON](https://dummyjson.com) for API practice. These are public demo services, not a real store. Do not enter real personal, payment, or confidential data.

## What is included

- 33 UI test cases covering authentication, catalogue, cart, and checkout.
- 10 API test cases covering GET, search, query parameters, POST, PUT, and error handling.
- Page Object Model classes for login, inventory, cart, and checkout.
- Reusable fixtures and helper functions.
- HTML reports, screenshots, traces, and videos on failure.
- GitHub Actions workflow.

## Requirements

- Node.js 20 or later (Node.js 22 LTS recommended)
- VS Code or another editor
- Internet connection to access the demo sites

## Setup

Open a terminal in this project directory:

```bash
npm install
npx playwright install chromium
```

## Run tests

```bash
# Run all UI and API tests
npm test

# Run only UI tests
npm run test:ui

# Run only API tests
npm run test:api

# Run tests with a visible browser
npm run test:headed

# Run in Chromium only
npm run test:chromium

# Open the last HTML report
npm run report
```

## Demo login

SauceDemo standard test account:

- Username: `standard_user`
- Password: `secret_sauce`

The credentials are public demo credentials. Never use them as real credentials.

## Project structure

```text
pages/          Page Object Model classes
fixtures/       Reusable Playwright fixtures
test-data/      Non-secret demo test data
tests/ui/       Browser UI test cases
tests/api/      API test cases
utils/          Shared helper functions
.github/        CI workflow
```

## Understanding the test layers

1. **Test specs** describe the scenario and expected result.
2. **Page objects** contain UI selectors and actions.
3. **Fixtures** create reusable page objects for each test.
4. **Assertions** compare actual behavior with expected behavior.
5. **Reports** help diagnose failed tests.

## Troubleshooting

### Browser executable missing

```bash
npx playwright install chromium
```

### Website or API is unavailable

Check your internet connection and try again later. The demo websites and public API are external dependencies and can change or become unavailable.

### A locator fails

Open the page in a browser, inspect the element, and compare its selector with the Page Object Model. Avoid fixed sleeps; prefer Playwright's auto-waiting and web-first assertions.

### See a detailed failure trace

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

## Important QA notes

- A green test run only proves the tested scenarios passed at that time.
- Public demo websites are not production systems.
- API tests use DummyJSON and are independent of SauceDemo's UI.
- Some public APIs simulate writes; POST/PUT results may not persist.
- Review selectors and expected results if the demo application changes.
- Do not claim a test count, pass rate, or performance improvement on your resume until you have run and measured it.

## Suggested next improvements

- Add data-driven tests and environment configuration.
- Add accessibility checks with `@axe-core/playwright`.
- Add visual regression testing.
- Add a database test layer if you own or have permission to access a test database.
- Add Allure reporting after understanding the built-in HTML report.
