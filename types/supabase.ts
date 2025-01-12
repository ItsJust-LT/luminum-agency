export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          created_at?: string
        }
      }
      websites: {
        Row: {
          id: string
          name: string
          url: string
          status: string
          visits: number
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          url: string
          status?: string
          visits?: number
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          url?: string
          status?: string
          visits?: number
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      website_features: {
        Row: {
          id: string
          website_id: string
          feature_type: string
          enabled: boolean
          config: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          website_id: string
          feature_type: string
          enabled?: boolean
          config?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          website_id?: string
          feature_type?: string
          enabled?: boolean
          config?: Json
          created_at?: string
          updated_at?: string
        }
      }
      website_forms: {
        Row: {
          id: string
          website_id: string
          form_type: string
          form_data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          website_id: string
          form_type: string
          form_data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          website_id?: string
          form_type?: string
          form_data?: Json
          created_at?: string
          updated_at?: string
        }
      }
      website_blogs: {
        Row: {
          id: string
          website_id: string
          slug: string
          title: string
          content: string
          metadata: Json
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          website_id: string
          slug: string
          title: string
          content: string
          metadata?: Json
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          website_id?: string
          slug?: string
          title?: string
          content?: string
          metadata?: Json
          published?: boolean
          created_at?: string
          updated_at?: string
        }
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
  }
}