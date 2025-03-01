
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { StudyPlan } from "@/components/StudyPlan";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStudyPlans } from "@/lib/api";
import { StudyPlan as StudyPlanType } from "@/lib/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [plans, setPlans] = useState<StudyPlanType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchPlans = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const data = await getStudyPlans();
          setPlans(data);
        } catch (error) {
          console.error("Error fetching study plans:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPlans();
  }, [user]);

  const refreshPlans = async () => {
    if (user) {
      try {
        setIsLoading(true);
        const data = await getStudyPlans();
        setPlans(data);
      } catch (error) {
        console.error("Error refreshing study plans:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const countByStatus = {
    total: plans.length,
    completed: plans.filter((plan) => plan.status === "completed").length,
    inProgress: plans.filter((plan) => plan.status === "in-progress").length,
    notStarted: plans.filter((plan) => plan.status === "not-started").length,
  };

  const recentPlans = [...plans].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  }).slice(0, 3);

  const priorityPlans = [...plans].filter((plan) => plan.priority === "high" && plan.status !== "completed").slice(0, 3);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <motion.h1
              className="text-3xl font-bold tracking-tight"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Dashboard
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Welcome back, {user?.email?.split('@')[0] || 'User'}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link to="/plans">
              <Button className="rounded-full hover-lift">
                Manage Plans
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="glass-card rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Total Plans</h3>
            <p className="text-2xl font-bold mt-1">{countByStatus.total}</p>
          </div>
          <div className="glass-card rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Completed</h3>
            <p className="text-2xl font-bold mt-1">{countByStatus.completed}</p>
          </div>
          <div className="glass-card rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">In Progress</h3>
            <p className="text-2xl font-bold mt-1">{countByStatus.inProgress}</p>
          </div>
          <div className="glass-card rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Not Started</h3>
            <p className="text-2xl font-bold mt-1">{countByStatus.notStarted}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Tabs defaultValue="recent" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="recent">Recent Plans</TabsTrigger>
              <TabsTrigger value="priority">High Priority</TabsTrigger>
            </TabsList>
            <TabsContent value="recent" className="space-y-4">
              {recentPlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentPlans.map((plan) => (
                    <StudyPlan key={plan.id} plan={plan} onUpdate={refreshPlans} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No recent plans found.</p>
                  <Link to="/plans" className="mt-4 inline-block">
                    <Button variant="outline">Create your first plan</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            <TabsContent value="priority" className="space-y-4">
              {priorityPlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {priorityPlans.map((plan) => (
                    <StudyPlan key={plan.id} plan={plan} onUpdate={refreshPlans} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No high priority plans found.</p>
                  <Link to="/plans" className="mt-4 inline-block">
                    <Button variant="outline">Create a high priority plan</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
