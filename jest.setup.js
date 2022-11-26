// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

beforeAll(() => {});

// Mocking problematic libraries
jest.mock('firebase/firestore', () => ({ getFirestore: jest.fn() }));
jest.mock('firebase/app', () => ({ initializeApp: jest.fn() }));
jest.mock('firebase/auth', () => ({ getAuth: jest.fn() }));
jest.mock('nanoid', () => {});
