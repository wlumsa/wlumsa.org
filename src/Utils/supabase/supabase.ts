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
      categories: {
        Row: {
          created_at: string
          id: number
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
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
      execs: {
        Row: {
          city: string | null
          created_at: string
          department:
            | Database["public"]["Enums"]["enum_execs_department"]
            | null
          email: string
          hash: string | null
          id: number
          lock_until: string | null
          login_attempts: number | null
          major: string | null
          mylaurier_email: string | null
          name: string | null
          phone_number: number | null
          position: Database["public"]["Enums"]["enum_execs_position"] | null
          reset_password_expiration: string | null
          reset_password_token: string | null
          roles: Database["public"]["Enums"]["enum_execs_roles"] | null
          salt: string | null
          student_id: number | null
          updated_at: string
          year: number | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          department?:
            | Database["public"]["Enums"]["enum_execs_department"]
            | null
          email: string
          hash?: string | null
          id?: number
          lock_until?: string | null
          login_attempts?: number | null
          major?: string | null
          mylaurier_email?: string | null
          name?: string | null
          phone_number?: number | null
          position?: Database["public"]["Enums"]["enum_execs_position"] | null
          reset_password_expiration?: string | null
          reset_password_token?: string | null
          roles?: Database["public"]["Enums"]["enum_execs_roles"] | null
          salt?: string | null
          student_id?: number | null
          updated_at?: string
          year?: number | null
        }
        Update: {
          city?: string | null
          created_at?: string
          department?:
            | Database["public"]["Enums"]["enum_execs_department"]
            | null
          email?: string
          hash?: string | null
          id?: number
          lock_until?: string | null
          login_attempts?: number | null
          major?: string | null
          mylaurier_email?: string | null
          name?: string | null
          phone_number?: number | null
          position?: Database["public"]["Enums"]["enum_execs_position"] | null
          reset_password_expiration?: string | null
          reset_password_token?: string | null
          roles?: Database["public"]["Enums"]["enum_execs_roles"] | null
          salt?: string | null
          student_id?: number | null
          updated_at?: string
          year?: number | null
        }
        Relationships: []
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
          label: string | null
        }
        Insert: {
          _order: number
          _parent_id: number
          id: string
          label?: string | null
        }
        Update: {
          _order?: number
          _parent_id?: number
          id?: string
          label?: string | null
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
      nav_items_links: {
        Row: {
          _order: number
          _parent_id: string
          id: string
          title: string | null
          url: string
        }
        Insert: {
          _order: number
          _parent_id: string
          id: string
          title?: string | null
          url: string
        }
        Update: {
          _order?: number
          _parent_id?: string
          id?: string
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "nav_items_links_parent_id_fk"
            columns: ["_parent_id"]
            isOneToOne: false
            referencedRelation: "nav_items"
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
          execs_id: number | null
          id: number
          order: number | null
          parent_id: number
          path: string
        }
        Insert: {
          emails_id?: number | null
          execs_id?: number | null
          id?: number
          order?: number | null
          parent_id: number
          path: string
        }
        Update: {
          emails_id?: number | null
          execs_id?: number | null
          id?: number
          order?: number | null
          parent_id?: number
          path?: string
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
            foreignKeyName: "payload_preferences_rels_execs_fk"
            columns: ["execs_id"]
            isOneToOne: false
            referencedRelation: "execs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_preferences_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "payload_preferences"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: Json | null
          created_at: string
          description: string | null
          id: number
          published_at: string | null
          status: Database["public"]["Enums"]["enum_posts_status"] | null
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          description?: string | null
          id?: number
          published_at?: string | null
          status?: Database["public"]["Enums"]["enum_posts_status"] | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          description?: string | null
          id?: number
          published_at?: string | null
          status?: Database["public"]["Enums"]["enum_posts_status"] | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      posts_rels: {
        Row: {
          categories_id: number | null
          execs_id: number | null
          id: number
          media_id: number | null
          order: number | null
          parent_id: number
          path: string
          tags_id: number | null
        }
        Insert: {
          categories_id?: number | null
          execs_id?: number | null
          id?: number
          media_id?: number | null
          order?: number | null
          parent_id: number
          path: string
          tags_id?: number | null
        }
        Update: {
          categories_id?: number | null
          execs_id?: number | null
          id?: number
          media_id?: number | null
          order?: number | null
          parent_id?: number
          path?: string
          tags_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_rels_categories_fk"
            columns: ["categories_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_rels_execs_fk"
            columns: ["execs_id"]
            isOneToOne: false
            referencedRelation: "execs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_rels_media_fk"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_rels_tags_fk"
            columns: ["tags_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          desc: string
          id: number
          name: string
          price: number
          quantity: number | null
          sizes_id: number | null
          tags_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          desc: string
          id?: number
          name: string
          price: number
          quantity?: number | null
          sizes_id?: number | null
          tags_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          desc?: string
          id?: number
          name?: string
          price?: number
          quantity?: number | null
          sizes_id?: number | null
          tags_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_sizes_id_sizes_id_fk"
            columns: ["sizes_id"]
            isOneToOne: false
            referencedRelation: "sizes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_tags_id_tags_id_fk"
            columns: ["tags_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      products_rels: {
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
            foreignKeyName: "products_rels_media_fk"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "products"
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
      sizes: {
        Row: {
          created_at: string
          id: number
          quantity: number
          size: Database["public"]["Enums"]["enum_sizes_size"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          quantity: number
          size: Database["public"]["Enums"]["enum_sizes_size"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          quantity?: number
          size?: Database["public"]["Enums"]["enum_sizes_size"]
          updated_at?: string
        }
        Relationships: []
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
      tags: {
        Row: {
          color: string | null
          created_at: string
          id: number
          title: string | null
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: number
          title?: string | null
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: number
          title?: string | null
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
      enum_execs_department:
        | "marketing"
        | "events_brothers"
        | "events_sisters"
        | "religious_affairs_brothers"
        | "religious_affairs_sisters"
        | "finance"
        | "community_engagement"
        | "operations"
        | "technology"
      enum_execs_position: "vice_president" | "head_director" | "director"
      enum_execs_roles: "admin" | "editor"
      enum_posts_status: "draft" | "published"
      enum_sizes_size: "Small" | "Medium" | "Large"
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
