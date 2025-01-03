export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          id: string;
          user_id: string | null;
          file_path: string;
          file_type: string;
          analysis: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          file_path: string;
          file_type: string;
          analysis?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          file_path?: string;
          file_type?: string;
          analysis?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      content_generations: {
        Row: {
          id: string;
          user_id: string | null;
          image_id: string | null;
          content_type: string;
          platform: string | null;
          generated_content: Json | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          image_id?: string | null;
          content_type: string;
          platform?: string | null;
          generated_content?: Json | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          image_id?: string | null;
          content_type?: string;
          platform?: string | null;
          generated_content?: Json | null;
          metadata?: Json | null;
          created_at?: string;
        };
      };
      api_usage: {
        Row: {
          id: string;
          user_id: string | null;
          api_calls_count: number;
          quota_limit: number;
          reset_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          api_calls_count?: number;
          quota_limit?: number;
          reset_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          api_calls_count?: number;
          quota_limit?: number;
          reset_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Functions: {
      process_image_with_gpt4o: {
        Args: {
          p_image_id: string;
          p_user_id: string;
        };
        Returns: Json;
      };
    };
  };
}