
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { StudyPlan } from "@/components/StudyPlan";
import { PlanForm } from "@/components/PlanForm";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getStudyPlans } from "@/lib/api";
import { StudyPlan as StudyPlanType } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const { user, loading } = useAuth();
  const [plans, setPlans] = useState<StudyPlanType[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<StudyPlanType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
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
          setFilteredPlans(data);
        } catch (error) {
          console.error("Error fetching study plans:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPlans();
  }, [user]);

  useEffect(() => {
    // Apply filters
    let result = [...plans];
    
    // Search term filter
    if (searchTerm) {
      result = result.filter(
        (plan) =>
          plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (plan.description && plan.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((plan) => plan.status === statusFilter);
    }
    
    // Priority filter
    if (priorityFilter !== "all") {
      result = result.filter((plan) => plan.priority === priorityFilter);
    }
    
    setFilteredPlans(result);
  }, [plans, searchTerm, statusFilter, priorityFilter]);

  const refreshPlans = async () => {
    if (user) {
      try {
        setIsLoading(true);
        const data = await getStudyPlans();
        setPlans(data);
        setFilteredPlans(data);
      } catch (error) {
        console.error("Error refreshing study plans:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddSuccess = () => {
    setIsFormOpen(false);
    refreshPlans();
  };

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
              Study Plans
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Manage and organize your study activities
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full hover-lift">
                  Add New Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <PlanForm onSuccess={handleAddSuccess} />
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>

        <motion.div
          className="mb-8 glass-card p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={priorityFilter}
                onValueChange={setPriorityFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading study plans...</p>
          </div>
        ) : (
          <>
            {filteredPlans.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No study plans found.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsFormOpen(true)}
                >
                  Create your first plan
                </Button>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {filteredPlans.map((plan) => (
                    <StudyPlan key={plan.id} plan={plan} onUpdate={refreshPlans} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Plans;
