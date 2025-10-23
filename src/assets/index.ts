// Asset imports for easy access throughout the application


// Re-export for convenience

// Export everything only if the modules exist
try {
  // @ts-ignore
  module.exports = {
    ...module.exports,
    ...require('./icons')
  };
} catch (e) {
  // Module './icons' does not exist, skip re-exporting
}
try {
  // @ts-ignore
  module.exports = {
    ...module.exports,
    ...require('./illustrations')
  };
} catch (e) {
  // Module './illustrations' does not exist, skip re-exporting
}
