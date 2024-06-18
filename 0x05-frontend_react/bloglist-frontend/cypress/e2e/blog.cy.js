/* end to end tests for the application */

describe("Blog list", function () {
  const user = {
    username: "@foss",
    password: "secure3",
    name: "Itsfoss0 Actual",
  };

  const newBlog = {
    title: "Fullstackopen",
    author: "Engineer",
    link: "https://fullstackopen.com",
  };
  beforeEach(() => {
    cy.resetBackend();
    cy.register(user);
    cy.visit("");
  });

  it("shows the login component by default", function () {
    cy.contains("Login to the application");
  });

  describe("login", function () {
    it("succeeds with the correct credentials", function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("#submit").click();
      cy.contains("successfully");
    });

    it("fails with the wrong credentials", function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type("wrong username");
      cy.get("#submit").click();
      cy.contains("Invalid username or password");
    });
  });

  describe("blogs", function () {
    beforeEach(() => {
      cy.login(user);
      cy.contains("New").click();
      cy.get("#title").type(newBlog.title);
      cy.get("#author").type(newBlog.author);
      cy.get("#link").type(newBlog.link);
      cy.get("#new-blog").click();
    });
    it("can be created when user is logged in", function () {
      cy.contains("Added New blog");
      cy.contains("Cancel").click();
      cy.visit("");
    });
    it("can be liked", function () {
      cy.visit("");
      cy.contains("View").click();
      cy.contains("Like").click();
      cy.visit("");
      cy.contains("View").click();
      cy.contains("Likes: 1");
    });

    it("can be deleted", function () {
      cy.visit("");
      cy.contains("View").click();
      cy.contains("Delete").click();
    });
  });
});
