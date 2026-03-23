require('@testing-library/jest-dom');
const { cleanup } = require('@testing-library/react');

// 模拟TextEncoder和TextDecoder，用于React Router
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}

if (typeof TextDecoder === 'undefined') {
  global.TextDecoder = require('util').TextDecoder;
}

afterEach(() => {
  cleanup();
});