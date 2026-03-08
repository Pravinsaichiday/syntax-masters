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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          badge_key: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_key: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_key?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      discussions: {
        Row: {
          content: string
          created_at: string
          id: string
          likes: number
          parent_id: string | null
          problem_id: string
          user_id: string
          username: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          likes?: number
          parent_id?: string | null
          problem_id: string
          user_id: string
          username?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          likes?: number
          parent_id?: string | null
          problem_id?: string
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discussions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      dsa_progress: {
        Row: {
          code: string | null
          completed: boolean
          created_at: string
          id: string
          language: string | null
          problem_id: string
          topic_id: string
          used_solution: boolean | null
          user_id: string
        }
        Insert: {
          code?: string | null
          completed?: boolean
          created_at?: string
          id?: string
          language?: string | null
          problem_id: string
          topic_id: string
          used_solution?: boolean | null
          user_id: string
        }
        Update: {
          code?: string | null
          completed?: boolean
          created_at?: string
          id?: string
          language?: string | null
          problem_id?: string
          topic_id?: string
          used_solution?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      notebook_entries: {
        Row: {
          attachments: Json | null
          category: string
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          attachments?: Json | null
          category?: string
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          attachments?: Json | null
          category?: string
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      problem_notes: {
        Row: {
          approach_brute: string | null
          approach_optimized: string | null
          created_at: string
          edge_cases: string | null
          id: string
          problem_id: string
          revision_notes: string | null
          space_complexity: string | null
          time_complexity: string | null
          understanding: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          approach_brute?: string | null
          approach_optimized?: string | null
          created_at?: string
          edge_cases?: string | null
          id?: string
          problem_id: string
          revision_notes?: string | null
          space_complexity?: string | null
          time_complexity?: string | null
          understanding?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          approach_brute?: string | null
          approach_optimized?: string | null
          created_at?: string
          edge_cases?: string | null
          id?: string
          problem_id?: string
          revision_notes?: string | null
          space_complexity?: string | null
          time_complexity?: string | null
          understanding?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          daily_time: string | null
          default_language: string | null
          id: string
          language: string | null
          last_solved_at: string | null
          level: string | null
          name: string
          onboarded: boolean
          rank: number
          solved_count: number
          streak: number
          updated_at: string
          user_id: string
          username: string | null
          xp: number
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          daily_time?: string | null
          default_language?: string | null
          id?: string
          language?: string | null
          last_solved_at?: string | null
          level?: string | null
          name: string
          onboarded?: boolean
          rank?: number
          solved_count?: number
          streak?: number
          updated_at?: string
          user_id: string
          username?: string | null
          xp?: number
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          daily_time?: string | null
          default_language?: string | null
          id?: string
          language?: string | null
          last_solved_at?: string | null
          level?: string | null
          name?: string
          onboarded?: boolean
          rank?: number
          solved_count?: number
          streak?: number
          updated_at?: string
          user_id?: string
          username?: string | null
          xp?: number
        }
        Relationships: []
      }
      python_progress: {
        Row: {
          code: string | null
          completed: boolean
          created_at: string
          difficulty: string
          id: string
          question_id: string
          topic_id: string
          user_id: string
        }
        Insert: {
          code?: string | null
          completed?: boolean
          created_at?: string
          difficulty: string
          id?: string
          question_id: string
          topic_id: string
          user_id: string
        }
        Update: {
          code?: string | null
          completed?: boolean
          created_at?: string
          difficulty?: string
          id?: string
          question_id?: string
          topic_id?: string
          user_id?: string
        }
        Relationships: []
      }
      submissions: {
        Row: {
          code: string
          created_at: string
          execution_time_ms: number | null
          id: string
          language: string
          memory_mb: number | null
          output: string | null
          problem_id: string
          test_cases_passed: number | null
          test_cases_total: number | null
          time_taken_seconds: number | null
          user_id: string
          verdict: string
        }
        Insert: {
          code: string
          created_at?: string
          execution_time_ms?: number | null
          id?: string
          language: string
          memory_mb?: number | null
          output?: string | null
          problem_id: string
          test_cases_passed?: number | null
          test_cases_total?: number | null
          time_taken_seconds?: number | null
          user_id: string
          verdict: string
        }
        Update: {
          code?: string
          created_at?: string
          execution_time_ms?: number | null
          id?: string
          language?: string
          memory_mb?: number | null
          output?: string | null
          problem_id?: string
          test_cases_passed?: number | null
          test_cases_total?: number | null
          time_taken_seconds?: number | null
          user_id?: string
          verdict?: string
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
