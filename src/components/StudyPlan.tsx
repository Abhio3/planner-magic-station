
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StudyPlan as StudyPlanType } from "@/lib/api";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useState } from "react";
import { updateStudyPlanStatus, deleteStudyPlan } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

interface StudyPlanProps {
  plan: StudyPlanType;
  onUpdate: () => void;
}

export function StudyPlan({ plan, onUpdate }: StudyPlanProps) {
  const [isLoading, setIsLoading] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "not-started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  const handleStatusChange = async (newStatus: 'not-started' | 'in-progress' | 'completed') => {
    try {
      setIsLoading(true);
      await updateStudyPlanStatus(plan.id, newStatus);
      toast({
        title: "Status updated",
        description: `Plan status updated to ${newStatus.replace('-', ' ')}.`,
      });
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update status.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        setIsLoading(true);
        await deleteStudyPlan(plan.id);
        toast({
          title: "Plan deleted",
          description: "The study plan has been deleted.",
        });
        onUpdate();
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to delete plan.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col glass-card overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div>
              <CardTitle className="text-xl line-clamp-1">{plan.title}</CardTitle>
              {plan.dueDate && (
                <CardDescription className="mt-1">
                  Due: {format(new Date(plan.dueDate), "PPP")}
                </CardDescription>
              )}
            </div>
            <div className="flex gap-2">
              <Badge className={`${getPriorityColor(plan.priority)} capitalize`}>
                {plan.priority}
              </Badge>
              <Badge className={`${getStatusColor(plan.status)} capitalize`}>
                {plan.status.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
            {plan.description || "No description provided."}
          </p>
          <Badge variant="outline" className="mt-4 capitalize">
            {plan.category}
          </Badge>
        </CardContent>
        <CardFooter className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-2 items-center">
            {plan.status !== "completed" && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleStatusChange("completed")}
                disabled={isLoading}
              >
                Mark Complete
              </Button>
            )}
            {plan.status === "completed" && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleStatusChange("in-progress")}
                disabled={isLoading}
              >
                Reopen
              </Button>
            )}
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleDelete}
            disabled={isLoading}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
