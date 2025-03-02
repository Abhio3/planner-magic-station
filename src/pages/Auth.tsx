
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signUpSchema, SignInFormValues, SignUpFormValues } from "@/lib/validators";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Navbar } from "@/components/Navbar";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { signIn, signUp, loading } = useAuth();
  
  // Create separate form instances
  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSignIn = async (data: SignInFormValues) => {
    await signIn(data.email, data.password);
  };

  const onSignUp = async (data: SignUpFormValues) => {
    await signUp(data.email, data.password, data.name);
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    signInForm.reset();
    signUpForm.reset();
  };

  // Helper function to create a basic input field
  const renderField = (form: any, name: string, label: string, type: string, placeholder: string) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input 
                type={type} 
                placeholder={placeholder}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
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
          
          {isSignIn ? (
            <Form {...signInForm}>
              <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-6">
                {renderField(signInForm, "email", "Email", "email", "name@example.com")}
                {renderField(signInForm, "password", "Password", "password", "••••••••")}
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Loading..." : "Sign In"}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-6">
                {renderField(signUpForm, "name", "Full Name", "text", "Your name")}
                {renderField(signUpForm, "email", "Email", "email", "name@example.com")}
                {renderField(signUpForm, "password", "Password", "password", "••••••••")}
                {renderField(signUpForm, "confirmPassword", "Confirm Password", "password", "••••••••")}
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Loading..." : "Sign Up"}
                </Button>
              </form>
            </Form>
          )}
          
          <div className="mt-6 text-center">
            <Button variant="link" onClick={toggleAuthMode} className="text-sm">
              {isSignIn ? "New User? Sign up" : "Existing User? Sign in"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
