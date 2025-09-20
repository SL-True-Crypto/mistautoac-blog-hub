import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client if Supabase is not configured
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    // Return a mock client for development when Supabase is not configured
    const mockQueryBuilder = {
      select: function() { return this },
      insert: function() { return this },
      update: function() { return this },
      delete: function() { return this },
      eq: function() { return this },
      order: function() { return this },
      single: function() { return { data: null, error: new Error('Supabase not configured') } },
      gte: function() { return this },
      then: function(resolve: any) { 
        resolve({ data: [], error: new Error('Supabase not configured') })
      }
    }

    return {
      from: () => mockQueryBuilder,
      rpc: () => ({ data: null, error: new Error('Supabase not configured') })
    }
  }
  return createClient(supabaseUrl, supabaseKey)
}

export const supabase = createSupabaseClient() as any

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