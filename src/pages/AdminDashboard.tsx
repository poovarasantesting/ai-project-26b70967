import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Activity, Settings } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Protect this route
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else if (user?.role !== "admin") {
      navigate("/user");
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.username}</p>
          </div>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Users"
            value="324"
            description="Total registered users"
            icon={<Users className="h-8 w-8 text-blue-500" />}
          />
          <DashboardCard
            title="Admins"
            value="8"
            description="System administrators"
            icon={<Shield className="h-8 w-8 text-purple-500" />}
          />
          <DashboardCard
            title="Active Sessions"
            value="42"
            description="Currently active users"
            icon={<Activity className="h-8 w-8 text-green-500" />}
          />
          <DashboardCard
            title="System"
            value="Online"
            description="All systems operational"
            icon={<Settings className="h-8 w-8 text-amber-500" />}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2">
              <Users className="h-5 w-5" />
              <span>Manage Users</span>
            </Button>
            <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2">
              <Settings className="h-5 w-5" />
              <span>System Settings</span>
            </Button>
            <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2">
              <Shield className="h-5 w-5" />
              <span>Security Controls</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, description, icon }: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}