import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  username?: string;
  avatar?: string;
  language?: string;
  level?: string;
  dailyTime?: string;
  onboarded?: boolean;
  xp: number;
  rank: number;
  streak: number;
  solvedCount: number;
  joinedAt: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  isNewLogin: boolean;
  setIsNewLogin: (v: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<string, { password: string; user: User }> = {};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("codeforge_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isNewLogin, setIsNewLogin] = useState(false);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const id = crypto.randomUUID();
    const newUser: User = {
      id,
      name,
      email,
      xp: 0,
      rank: 0,
      streak: 0,
      solvedCount: 0,
      joinedAt: new Date().toISOString(),
      onboarded: false,
    };
    MOCK_USERS[email] = { password, user: newUser };
    return true;
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    const entry = MOCK_USERS[email];
    if (!entry) {
      // Demo: create a demo user on first login attempt
      const demoUser: User = {
        id: crypto.randomUUID(),
        name: email.split("@")[0],
        email,
        xp: 1250,
        rank: 342,
        streak: 7,
        solvedCount: 47,
        joinedAt: new Date().toISOString(),
        onboarded: false,
      };
      setUser(demoUser);
      localStorage.setItem("codeforge_user", JSON.stringify(demoUser));
      setIsNewLogin(true);
      return true;
    }
    setUser(entry.user);
    localStorage.setItem("codeforge_user", JSON.stringify(entry.user));
    setIsNewLogin(!entry.user.onboarded);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("codeforge_user");
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem("codeforge_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        isNewLogin,
        setIsNewLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
