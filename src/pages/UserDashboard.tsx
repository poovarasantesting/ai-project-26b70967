import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Bell, Clock, FileText } from "lucide-react";

export default function UserDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Protect this route
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.username}</p>
          </div>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Profile Information</CardTitle>
              <User className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Username</p>
                  <p>{user?.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">User ID</p>
                  <p>{user?.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p className="capitalize">{user?.role}</p>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Recent Notifications</CardTitle>
              <Bell className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <NotificationItem 
                  title="System Update" 
                  description="The system will undergo maintenance on Friday" 
                  time="2 hours ago" 
                />
                <NotificationItem 
                  title="New Feature Available" 
                  description="Check out the new dashboard layout" 
                  time="Yesterday" 
                />
                <NotificationItem 
                  title="Welcome!" 
                  description="Thank you for logging in to our system" 
                  time="2 days ago" 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            <Clock className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem 
                icon={<User className="h-4 w-4 text-blue-500" />}
                title="Profile Updated" 
                description="You updated your profile information" 
                time="3 hours ago" 
              />
              <ActivityItem 
                icon={<FileText className="h-4 w-4 text-purple-500" />}
                title="Document Viewed" 
                description="You viewed the user manual" 
                time="Yesterday" 
              />
              <ActivityItem 
                icon={<Bell className="h-4 w-4 text-amber-500" />}
                title="Notification Settings" 
                description="You changed your notification preferences" 
                time="3 days ago" 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function NotificationItem({ title, description, time }: { 
  title: string; 
  description: string; 
  time: string; 
}) {
  return (
    <div className="border-b pb-3 last:border-0 last:pb-0">
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-xs text-gray-400 mt-1">{time}</p>
    </div>
  );
}

function ActivityItem({ icon, title, description, time }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
      <div className="bg-gray-100 p-2 rounded-full">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}