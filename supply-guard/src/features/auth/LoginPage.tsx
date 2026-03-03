import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { loginApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react"; 

const LoginPage = () => {
  // 👇 FIX 1: Pre-fill the correct password so you don't have to type it
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log("🚀 1. Attempting Login..."); 

    try {
      // Step A: Call API
      const data = await loginApi(username, password);
      console.log("✅ 2. API Success:", data); 

      // Step B: Save to Store
      login(data.user, data.token);
      console.log("💾 3. Saved to Store");
      
      // Step C: Check Store (Verification)
      const currentToken = useAuthStore.getState().token;
      console.log("🔍 4. Token in Store:", currentToken);

      // Step D: Redirect
      console.log("🔄 5. Navigating to Dashboard..."); 
      navigate("/dashboard");
      
    } catch (err: any) {
      console.error("❌ Login Failed:", err); 
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">SupplyGuard</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-lg text-muted-foreground">
          Protected by SupplyGuard Auth
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;