async function loginAsStandardUser(loginPage, users) {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
}

module.exports = { loginAsStandardUser };
