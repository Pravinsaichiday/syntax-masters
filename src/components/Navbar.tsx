import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, Trophy, Code2, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { profile, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
          <Code2 className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight">Syntax<span className="text-gradient-gold">Masters</span></span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link>
              <Link to="/problems" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Problems</Link>
              <Link to="/leaderboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Leaderboard</Link>
              <Link to="/dsa" className="text-sm text-muted-foreground transition-colors hover:text-foreground">DSA Roadmap</Link>
              <Link to={`/profile/${profile?.username || profile?.user_id}`} className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                <User className="h-4 w-4" />{profile?.name}
              </Link>
              <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }}><LogOut className="h-4 w-4" /></Button>
            </>
          ) : (
            <>
              <Link to="/problems" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Problems</Link>
              <Link to="/leaderboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Leaderboard</Link>
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Log In</Button>
              <Button size="sm" onClick={() => navigate("/signup")} className="bg-gradient-gold font-semibold">Sign Up</Button>
            </>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground">Dashboard</Link>
                <Link to="/problems" onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground">Problems</Link>
                <Link to="/leaderboard" onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground">Leaderboard</Link>
                <Link to="/dsa" onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground">DSA Roadmap</Link>
                <Link to={`/profile/${profile?.username || profile?.user_id}`} onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground">Profile</Link>
                <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); setMenuOpen(false); }}>Log Out</Button>
              </>
            ) : (
              <>
                <Link to="/problems" onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground">Problems</Link>
                <Link to="/leaderboard" onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground">Leaderboard</Link>
                <Button variant="ghost" size="sm" onClick={() => { navigate("/login"); setMenuOpen(false); }}>Log In</Button>
                <Button size="sm" onClick={() => { navigate("/signup"); setMenuOpen(false); }} className="bg-gradient-gold font-semibold">Sign Up</Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
