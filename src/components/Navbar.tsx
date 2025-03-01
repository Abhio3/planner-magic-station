
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200 dark:border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl font-semibold tracking-tight"
          >
            StudyPlanner
          </motion.div>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary-foreground/80"
          >
            Home
          </Link>
          {user && (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary-foreground/80"
              >
                Dashboard
              </Link>
              <Link
                to="/plans"
                className="text-sm font-medium transition-colors hover:text-primary-foreground/80"
              >
                Plans
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <Button
              variant="ghost"
              onClick={signOut}
              className="rounded-full hover-lift"
            >
              Sign Out
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="secondary" className="rounded-full hover-lift">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
