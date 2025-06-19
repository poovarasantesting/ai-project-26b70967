import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  username: string;
  role: "admin" | "user";
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Test credentials
const TEST_CREDENTIALS = {
  admin: { id: "admin-123", username: "admin", password: "admin123", role: "admin" as const },
  user: { id: "user-456", username: "user", password: "user123", role: "user" as const },
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    console.log("Login attempt:", username);
    
    // Check admin credentials
    if (username === TEST_CREDENTIALS.admin.username && 
        password === TEST_CREDENTIALS.admin.password) {
      const adminUser = {
        id: TEST_CREDENTIALS.admin.id,
        username: TEST_CREDENTIALS.admin.username,
        role: TEST_CREDENTIALS.admin.role
      };
      setUser(adminUser);
      toast({
        title: "Login successful",
        description: "Welcome, Admin!",
      });
      navigate("/admin");
      return;
    }
    
    // Check user credentials
    if (username === TEST_CREDENTIALS.user.username && 
        password === TEST_CREDENTIALS.user.password) {
      const regularUser = {
        id: TEST_CREDENTIALS.user.id,
        username: TEST_CREDENTIALS.user.username,
        role: TEST_CREDENTIALS.user.role
      };
      setUser(regularUser);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate("/user");
      return;
    }
    
    // Invalid credentials
    toast({
      title: "Login failed",
      description: "Invalid username or password.",
      variant: "destructive",
    });
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}