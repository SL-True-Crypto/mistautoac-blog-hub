import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  category: string
  readTime?: string
  read_time?: string
  views?: number
  created_at?: string
  updated_at?: string
}

export interface Comment {
  id: number
  post_id: number
  name: string
  email: string
  content: string
  created_at: string
}

export interface PostView {
  id: number
  post_id: number
  ip_address: string
  created_at: string
}