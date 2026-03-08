import { createContext, useContext, useState, ReactNode, useCallback, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

export type Profile = {
  id: string;
  user_id: string;
  name: string;
  username: string | null;
  avatar_url: string | null;
  language: string | null;
  level: string | null;
  daily_time: string | null;
  onboarded: boolean;
  xp: number;
  rank: number;
  streak: number;
  solved_count: number;
  created_at: string;
  updated_at: string;
};

type AuthContextType = {
  user: SupabaseUser | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
  isNewLogin: boolean;
  setIsNewLogin: (v: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewLogin, setIsNewLogin] = useState(false);
  const isSessionRestoredRef = useRef(false);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (data) setProfile(data as Profile);
    return data as Profile | null;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  const applySession = useCallback((session: Session | null) => {
    const nextUser = session?.user ?? null;
    setUser(nextUser);

    if (nextUser) {
      void fetchProfile(nextUser.id);
    } else {
      setProfile(null);
    }
  }, [fetchProfile]);

  useEffect(() => {
    let isMounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted || !isSessionRestoredRef.current) return;
      applySession(session);
    });

    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      applySession(session);
      isSessionRestoredRef.current = true;
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [applySession]);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: error.message };
    setIsNewLogin(true);
    return { ok: true };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, []);

  const updateProfile = useCallback(async (data: Partial<Profile>) => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update(data)
      .eq("user_id", user.id);
    if (!error) {
      setProfile((prev) => prev ? { ...prev, ...data } : prev);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        refreshProfile,
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
