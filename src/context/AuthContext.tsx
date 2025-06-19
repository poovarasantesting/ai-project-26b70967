import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // In a real app, this would communicate with a backend
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      console.log("Logging in with:", email, password);
      
      // For demo purposes, any non-empty email/password works
      if (email && password) {
        setUser({
          id: "user-1",
          name: email.split("@")[0],
          email,
        });
        
        toast({
          title: "Login successful!",
          description: "Welcome back to our store.",
        });
        
        return true;
      }
      
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Something went wrong",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call
      console.log("Registering:", name, email, password);
      
      if (name && email && password) {
        setUser({
          id: "user-" + Date.now(),
          name,
          email,
        });
        
        toast({
          title: "Registration successful!",
          description: "Your account has been created.",
        });
        
        return true;
      }
      
      toast({
        title: "Registration failed",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "Something went wrong",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}