import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [adminUsername, setAdminUsername] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("admin123");
  const [userUsername, setUserUsername] = useState("user");
  const [userPassword, setUserPassword] = useState("user123");
  const { login, isAuthenticated, user } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to={user?.role === "admin" ? "/admin" : "/user"} />;
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(adminUsername, adminPassword);
  };

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(userUsername, userPassword);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Choose your login type below
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User Login</TabsTrigger>
            <TabsTrigger value="admin">Admin Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user">
            <form onSubmit={handleUserLogin}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="user-username">Username</Label>
                  <Input
                    id="user-username"
                    type="text"
                    value={userUsername}
                    onChange={(e) => setUserUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-password">Password</Label>
                  <Input
                    id="user-password"
                    type="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="text-xs text-gray-500">
                  <p>Demo credentials:</p>
                  <p>Username: user, Password: user123</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Login as User</Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="admin">
            <form onSubmit={handleAdminLogin}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-username">Username</Label>
                  <Input
                    id="admin-username"
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="Enter admin username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                <div className="text-xs text-gray-500">
                  <p>Demo credentials:</p>
                  <p>Username: admin, Password: admin123</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Login as Admin</Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}