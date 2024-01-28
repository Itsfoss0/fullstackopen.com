#!/usr/bin/env node

/* entry point */

const app = require('./app');
const { info, error } = require('./utils/logger');
const { PORT } = require('./config/config');

app.listen(PORT, () => {
  info(`API running on ${PORT}`);
});
