
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, AuthFormValues } from "@/lib/validators";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { signIn, signUp, loading } = useAuth();
  
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AuthFormValues) => {
    if (isSignIn) {
      await signIn(data.email, data.password);
    } else {
      await signUp(data.email, data.password);
    }
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center">
      <Navbar />
      <motion.div 
        className="flex-1 w-full flex flex-col items-center justify-center p-4 pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="glass-card w-full max-w-md p-8 rounded-2xl shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" type="email" autoComplete="email" {...field} />
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
                        placeholder="••••••••" 
                        type="password" 
                        autoComplete={isSignIn ? "current-password" : "new-password"} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : isSignIn ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <Button variant="link" onClick={toggleAuthMode} className="text-sm">
              {isSignIn ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
