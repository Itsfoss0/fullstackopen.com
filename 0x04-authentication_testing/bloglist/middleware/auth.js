#!/usr/bin/env node

/* user auth middleware, to restrict unauthorized access to protected endpoints */

const requireAuth = (error, request, response, next) => {
  if (error) return response.status(400).json({ error: "bad request" });
};

module.exports = requireAuth;
