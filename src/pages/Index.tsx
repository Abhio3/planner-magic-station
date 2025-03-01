
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      title: "Organize Your Studies",
      description: "Create and manage study plans with categories, priorities, and due dates."
    },
    {
      title: "Track Progress",
      description: "Mark tasks as in-progress or completed as you work through your studies."
    },
    {
      title: "Stay Focused",
      description: "Prioritize your tasks and never miss important deadlines."
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted z-0" />
        
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col items-center text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your study plan, <span className="text-foreground/80">simplified.</span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            An elegant, intuitive study planner that helps you organize your learning journey
            and stay on track with your educational goals.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button size="lg" className="rounded-full px-8 hover-lift">
                {user ? "Go to Dashboard" : "Get Started"}
              </Button>
            </Link>
            {!user && (
              <Link to="/auth">
                <Button size="lg" variant="outline" className="rounded-full px-8 hover-lift">
                  Sign In
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>
      
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                className="glass-card rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="md:w-1/2 order-2 md:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Why Study Planner?</h2>
            <p className="text-muted-foreground mb-4">
              In the modern world of education, staying organized is key to success.
              Our study planner provides a clean, distraction-free environment
              to help you focus on what matters most: learning effectively.
            </p>
            <p className="text-muted-foreground mb-6">
              With intuitive tools to create, organize, and track your study plans,
              you'll never lose sight of your educational goals.
            </p>
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button className="rounded-full hover-lift">
                {user ? "View Your Plans" : "Start Planning Now"}
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 order-1 md:order-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
              {/* Placeholder for app screenshot/illustration */}
              <div className="bg-muted aspect-video flex items-center justify-center">
                <p className="text-muted-foreground">Study Planner Dashboard</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <footer className="bg-secondary/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2023 Study Planner. All rights reserved.</p>
          <p className="mt-2">A minimalist study planning tool for organized learners.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
