
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { useAuth } from "@/context/AuthContext";

export const AuthCard = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { loading } = useAuth();

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
  };

  return (
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
      
      {isSignIn ? (
        <SignInForm loading={loading} />
      ) : (
        <SignUpForm loading={loading} />
      )}
      
      <div className="mt-6 text-center">
        <Button variant="link" onClick={toggleAuthMode} className="text-sm text-grey-700">
          {isSignIn ? "New User? Sign up" : "Existing User? Sign in"}
        </Button>
      </div>
    </motion.div>
  );
};
