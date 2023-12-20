import { Signal, signal } from "@preact/signals-react";

type User = {
  username: string,
  email: string
}

export type AuthenticatedUser = User | null;

export const isAuthenticated: Signal<boolean> = signal(false);
export const authenticatedUser: Signal<AuthenticatedUser> = signal(null);
export const isConnected: Signal<boolean> = signal(false);
export const connections: Signal<string[]> = signal([]);