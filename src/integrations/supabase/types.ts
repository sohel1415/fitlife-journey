export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      exercises: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty: string
          duration_seconds: number | null
          equipment: string | null
          id: string
          image_url: string | null
          instructions: string[] | null
          name: string
          reps: number | null
          sets: number | null
          target_muscles: string[] | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          difficulty: string
          duration_seconds?: number | null
          equipment?: string | null
          id?: string
          image_url?: string | null
          instructions?: string[] | null
          name: string
          reps?: number | null
          sets?: number | null
          target_muscles?: string[] | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty?: string
          duration_seconds?: number | null
          equipment?: string | null
          id?: string
          image_url?: string | null
          instructions?: string[] | null
          name?: string
          reps?: number | null
          sets?: number | null
          target_muscles?: string[] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          activity_level: string | null
          age: number | null
          created_at: string | null
          fitness_goal: string | null
          full_name: string | null
          gender: string | null
          height_cm: number | null
          id: string
          units_preference: string | null
          updated_at: string | null
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          created_at?: string | null
          fitness_goal?: string | null
          full_name?: string | null
          gender?: string | null
          height_cm?: number | null
          id?: string
          units_preference?: string | null
          updated_at?: string | null
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          created_at?: string | null
          fitness_goal?: string | null
          full_name?: string | null
          gender?: string | null
          height_cm?: number | null
          id?: string
          units_preference?: string | null
          updated_at?: string | null
          user_id?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      weight_logs: {
        Row: {
          body_fat_percentage: number | null
          id: string
          logged_at: string | null
          notes: string | null
          user_id: string
          weight_kg: number
        }
        Insert: {
          body_fat_percentage?: number | null
          id?: string
          logged_at?: string | null
          notes?: string | null
          user_id: string
          weight_kg: number
        }
        Update: {
          body_fat_percentage?: number | null
          id?: string
          logged_at?: string | null
          notes?: string | null
          user_id?: string
          weight_kg?: number
        }
        Relationships: []
      }
      workout_logs: {
        Row: {
          calories_burned: number | null
          completed_at: string | null
          duration_seconds: number | null
          exercises_completed: string[] | null
          id: string
          notes: string | null
          user_id: string
          workout_plan_id: string | null
        }
        Insert: {
          calories_burned?: number | null
          completed_at?: string | null
          duration_seconds?: number | null
          exercises_completed?: string[] | null
          id?: string
          notes?: string | null
          user_id: string
          workout_plan_id?: string | null
        }
        Update: {
          calories_burned?: number | null
          completed_at?: string | null
          duration_seconds?: number | null
          exercises_completed?: string[] | null
          id?: string
          notes?: string | null
          user_id?: string
          workout_plan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_logs_workout_plan_id_fkey"
            columns: ["workout_plan_id"]
            isOneToOne: false
            referencedRelation: "workout_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_plans: {
        Row: {
          created_at: string | null
          days_per_week: number | null
          description: string | null
          difficulty: string
          duration_weeks: number | null
          estimated_duration_mins: number | null
          exercises: string[]
          id: string
          name: string
          target_muscles: string[] | null
        }
        Insert: {
          created_at?: string | null
          days_per_week?: number | null
          description?: string | null
          difficulty: string
          duration_weeks?: number | null
          estimated_duration_mins?: number | null
          exercises: string[]
          id?: string
          name: string
          target_muscles?: string[] | null
        }
        Update: {
          created_at?: string | null
          days_per_week?: number | null
          description?: string | null
          difficulty?: string
          duration_weeks?: number | null
          estimated_duration_mins?: number | null
          exercises?: string[]
          id?: string
          name?: string
          target_muscles?: string[] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
