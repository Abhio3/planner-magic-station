import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signUpSchema } from "@/lib/validators";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Navbar } from "@/components/Navbar";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { signIn, signUp, loading } = useAuth();
  
  // Use a single form instance based on the current mode
  const form = useForm({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
    defaultValues: isSignIn 
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data) => {
    if (isSignIn) {
      await signIn(data.email, data.password);
    } else {
      await signUp(data.email, data.password, data.name);
    }
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-sm bg-white dark:bg-gray-800">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              {isSignIn ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isSignIn ? "Sign in to access your study plans" : "Sign up to start organizing your studies"}
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {!isSignIn && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="Your name"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="name@example.com"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {!isSignIn && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : isSignIn ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <Button variant="link" onClick={toggleAuthMode} className="text-sm text-gray-700">
              {isSignIn ? "New User? Sign up" : "Existing User? Sign in"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;