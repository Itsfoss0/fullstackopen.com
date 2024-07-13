// ***********************************************
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add("register", (user) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
});

Cypress.Commands.add("resetBackend", () => {
  cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
});

Cypress.Commands.add("login", (user) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/auth/login`, user).then(
    (resp) => localStorage.setItem("user", JSON.stringify(resp.body))
  );
  cy.visit("")
});

Cypress.Commands.add("createBlog", (blog) => {
  const token = JSON.parse(localStorage.getItem("user")).accessToken;
  cy.request({
    method: "POST",
    url: `${Cypress.env("BACKEND")}/blogs`,
    body: blog,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});
