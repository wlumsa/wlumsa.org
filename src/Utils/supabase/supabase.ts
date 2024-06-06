export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      emails: {
        Row: {
          content: Json | null
          created_at: string
          email: string
          hash: string | null
          id: number
          lock_until: string | null
          login_attempts: number | null
          published: Database["public"]["Enums"]["enum_emails_published"] | null
          reset_password_expiration: string | null
          reset_password_token: string | null
          salt: string | null
          subject: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          email: string
          hash?: string | null
          id?: number
          lock_until?: string | null
          login_attempts?: number | null
          published?:
            | Database["public"]["Enums"]["enum_emails_published"]
            | null
          reset_password_expiration?: string | null
          reset_password_token?: string | null
          salt?: string | null
          subject?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          email?: string
          hash?: string | null
          id?: number
          lock_until?: string | null
          login_attempts?: number | null
          published?:
            | Database["public"]["Enums"]["enum_emails_published"]
            | null
          reset_password_expiration?: string | null
          reset_password_token?: string | null
          salt?: string | null
          subject?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      emails_rels: {
        Row: {
          id: number
          media_id: number | null
          order: number | null
          parent_id: number
          path: string
        }
        Insert: {
          id?: number
          media_id?: number | null
          order?: number | null
          parent_id: number
          path: string
        }
        Update: {
          id?: number
          media_id?: number | null
          order?: number | null
          parent_id?: number
          path?: string
        }
        Relationships: [
          {
            foreignKeyName: "emails_rels_media_fk"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emails_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "emails"
            referencedColumns: ["id"]
          },
        ]
      }
      footer: {
        Row: {
          created_at: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      footer_items: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          label: string
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          label: string
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          label?: string
        }
        Relationships: [
          {
            foreignKeyName: "footer_items_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "footer"
            referencedColumns: ["id"]
          },
        ]
      }
      footer_rels: {
        Row: {
          id: number
          link_id: number | null
          order: number | null
          parent_id: number
          path: string
        }
        Insert: {
          id?: number
          link_id?: number | null
          order?: number | null
          parent_id: number
          path: string
        }
        Update: {
          id?: number
          link_id?: number | null
          order?: number | null
          parent_id?: number
          path?: string
        }
        Relationships: [
          {
            foreignKeyName: "footer_rels_link_fk"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "link"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "footer_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "footer"
            referencedColumns: ["id"]
          },
        ]
      }
      instagram: {
        Row: {
          created_at: string
          id: number
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      link: {
        Row: {
          created_at: string
          id: number
          title: string | null
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          title?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          title?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          alt: string
          caption: Json | null
          created_at: string
          filename: string | null
          filesize: number | null
          focal_x: number | null
          focal_y: number | null
          height: number | null
          id: number
          mime_type: string | null
          prefix: string | null
          thumbnail_u_r_l: string | null
          updated_at: string
          url: string | null
          width: number | null
        }
        Insert: {
          alt: string
          caption?: Json | null
          created_at?: string
          filename?: string | null
          filesize?: number | null
          focal_x?: number | null
          focal_y?: number | null
          height?: number | null
          id?: number
          mime_type?: string | null
          prefix?: string | null
          thumbnail_u_r_l?: string | null
          updated_at?: string
          url?: string | null
          width?: number | null
        }
        Update: {
          alt?: string
          caption?: Json | null
          created_at?: string
          filename?: string | null
          filesize?: number | null
          focal_x?: number | null
          focal_y?: number | null
          height?: number | null
          id?: number
          mime_type?: string | null
          prefix?: string | null
          thumbnail_u_r_l?: string | null
          updated_at?: string
          url?: string | null
          width?: number | null
        }
        Relationships: []
      }
      members: {
        Row: {
          created_at: string
          first_name: string | null
          id: number
          last_name: string | null
          mylaurier_email: string
          newsletter: boolean | null
          student_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          mylaurier_email: string
          newsletter?: boolean | null
          student_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          mylaurier_email?: string
          newsletter?: boolean | null
          student_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      nav: {
        Row: {
          created_at: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      nav_items: {
        Row: {
          _order: number
          _parent_id: number
          id: string
          label: string
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          label: string
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          label?: string
        }
        Relationships: [
          {
            foreignKeyName: "nav_items_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "nav"
            referencedColumns: ["id"]
          },
        ]
      }
      nav_rels: {
        Row: {
          id: number
          link_id: number | null
          order: number | null
          parent_id: number
          path: string
        }
        Insert: {
          id?: number
          link_id?: number | null
          order?: number | null
          parent_id: number
          path: string
        }
        Update: {
          id?: number
          link_id?: number | null
          order?: number | null
          parent_id?: number
          path?: string
        }
        Relationships: [
          {
            foreignKeyName: "nav_rels_link_fk"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "link"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nav_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "nav"
            referencedColumns: ["id"]
          },
        ]
      }
      payload_migrations: {
        Row: {
          batch: number | null
          created_at: string
          id: number
          name: string | null
          updated_at: string
        }
        Insert: {
          batch?: number | null
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string
        }
        Update: {
          batch?: number | null
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      payload_preferences: {
        Row: {
          created_at: string
          id: number
          key: string | null
          updated_at: string
          value: Json | null
        }
        Insert: {
          created_at?: string
          id?: number
          key?: string | null
          updated_at?: string
          value?: Json | null
        }
        Update: {
          created_at?: string
          id?: number
          key?: string | null
          updated_at?: string
          value?: Json | null
        }
        Relationships: []
      }
      payload_preferences_rels: {
        Row: {
          emails_id: number | null
          id: number
          order: number | null
          parent_id: number
          path: string
          users_id: number | null
        }
        Insert: {
          emails_id?: number | null
          id?: number
          order?: number | null
          parent_id: number
          path: string
          users_id?: number | null
        }
        Update: {
          emails_id?: number | null
          id?: number
          order?: number | null
          parent_id?: number
          path?: string
          users_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payload_preferences_rels_emails_fk"
            columns: ["emails_id"]
            isOneToOne: false
            referencedRelation: "emails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_preferences_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "payload_preferences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_preferences_rels_users_fk"
            columns: ["users_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          created_at: string
          id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      resources_rels: {
        Row: {
          id: number
          link_id: number | null
          order: number | null
          parent_id: number
          path: string
        }
        Insert: {
          id?: number
          link_id?: number | null
          order?: number | null
          parent_id: number
          path: string
        }
        Update: {
          id?: number
          link_id?: number | null
          order?: number | null
          parent_id?: number
          path?: string
        }
        Relationships: [
          {
            foreignKeyName: "resources_rels_link_fk"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "link"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resources_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      socials: {
        Row: {
          created_at: string
          icon: string
          id: number
          link_id: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          icon: string
          id?: number
          link_id: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: number
          link_id?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "socials_link_id_link_id_fk"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "link"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          hash: string | null
          id: number
          lock_until: string | null
          login_attempts: number | null
          mylaurier_email: string | null
          name: string | null
          phone_number: number | null
          reset_password_expiration: string | null
          reset_password_token: string | null
          salt: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          hash?: string | null
          id?: number
          lock_until?: string | null
          login_attempts?: number | null
          mylaurier_email?: string | null
          name?: string | null
          phone_number?: number | null
          reset_password_expiration?: string | null
          reset_password_token?: string | null
          salt?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          hash?: string | null
          id?: number
          lock_until?: string | null
          login_attempts?: number | null
          mylaurier_email?: string | null
          name?: string | null
          phone_number?: number | null
          reset_password_expiration?: string | null
          reset_password_token?: string | null
          salt?: string | null
          updated_at?: string
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
      enum_emails_published: "Yes" | "No"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
