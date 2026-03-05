import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './useAuthStore';

describe('Auth Store', () => {
  // Clear the store before each test runs
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('should start with no user and no token', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('should save user and token on login', () => {
    const mockUser = {
      id: 1, username: 'emilys', email: 'emilys@test.com',
      firstName: 'Emily', lastName: 'Smith', gender: 'female', image: ''
    };
    const mockToken = 'fake-jwt-token';

    // Perform a fake login
    useAuthStore.getState().login(mockUser, mockToken, 'fake-refresh-token');

    // Check if it saved correctly
    const state = useAuthStore.getState();
    expect(state.user?.username).toBe('emilys');
    expect(state.token).toBe('fake-jwt-token');
  });

  it('should clear everything on logout', () => {
    // 1. Login
    useAuthStore.getState().login({ id: 1 } as any, 'token', 'refresh');
    
    // 2. Logout
    useAuthStore.getState().logout();

    // 3. Verify it is completely empty
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });
});