/**
 * test scenarios
 *
 * - LoginInput component
 *  - should handle username typing correctly
 *  - should handle password typing correctly
 *  - should call login function when login button is clicked
 */

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle username typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const usernameInput = screen.getByPlaceholderText('Username');

    // action
    await userEvent.type(usernameInput, 'usernametest');

    // assert
    expect(usernameInput).toHaveValue('usernametest');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'passwordtest');

    // assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const usernameInput = screen.getByPlaceholderText('Username');
    await userEvent.type(usernameInput, 'usernametest');
    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      id: 'usernametest',
      password: 'passwordtest',
    });
  });
});
