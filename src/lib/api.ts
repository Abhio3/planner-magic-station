
import { supabase } from './supabase';
import { StudyPlanFormValues } from './validators';

export type StudyPlan = StudyPlanFormValues & {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

// Create a new study plan
export const createStudyPlan = async (plan: StudyPlanFormValues): Promise<StudyPlan> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    throw new Error("You must be logged in to create a study plan");
  }
  
  const { data, error } = await supabase
    .from('study_plans')
    .insert({
      ...plan,
      user_id: userData.user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data as StudyPlan;
};

// Get all study plans for the current user
export const getStudyPlans = async (): Promise<StudyPlan[]> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    throw new Error("You must be logged in to view study plans");
  }
  
  const { data, error } = await supabase
    .from('study_plans')
    .select('*')
    .eq('user_id', userData.user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as StudyPlan[];
};

// Get a single study plan by ID
export const getStudyPlan = async (id: string): Promise<StudyPlan> => {
  const { data, error } = await supabase
    .from('study_plans')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as StudyPlan;
};

// Update a study plan
export const updateStudyPlan = async (id: string, plan: Partial<StudyPlanFormValues>): Promise<StudyPlan> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    throw new Error("You must be logged in to update a study plan");
  }
  
  const { data, error } = await supabase
    .from('study_plans')
    .update({
      ...plan,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as StudyPlan;
};

// Delete a study plan
export const deleteStudyPlan = async (id: string): Promise<void> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    throw new Error("You must be logged in to delete a study plan");
  }
  
  const { error } = await supabase
    .from('study_plans')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Update the status of a study plan
export const updateStudyPlanStatus = async (id: string, status: 'not-started' | 'in-progress' | 'completed'): Promise<StudyPlan> => {
  return updateStudyPlan(id, { status });
};
