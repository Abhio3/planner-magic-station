
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { AuthCard } from "@/components/auth/AuthCard";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center">
      <Navbar />
      <motion.div 
        className="flex-1 w-full flex flex-col items-center justify-center p-4 pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AuthCard />
      </motion.div>
    </div>
  );
};

export default Auth;
