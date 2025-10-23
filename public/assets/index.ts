// Asset imports for easy access throughout the application

// Icons
export { default as MenuIcon } from './icons/menu.svg';
export { default as CloseIcon } from './icons/close.svg';
export { default as StudentIcon } from './icons/student.svg';

// Illustrations
export { default as FrameIllustration } from './illustrations/Frame.svg';

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
