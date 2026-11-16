export type UserRole    = 'learner' | 'instructor' | 'admin'
export type CourseStatus = 'draft' | 'published' | 'archived'
export type CourseAccess = 'free' | 'paid' | 'preview'
export type LessonAccess = 'free' | 'paid' | 'preview'
export type LessonType   = 'video' | 'text' | 'mixed'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string | null
  academy: string | null
  status: CourseStatus
  access: CourseAccess
  thumbnail_url: string | null
  created_at: string
  updated_at: string
}

export interface Module {
  id: string
  course_id: string
  title: string
  position: number
  created_at: string
  updated_at: string
}

export interface Lesson {
  id: string
  course_id: string
  module_id: string | null
  slug: string
  title: string
  position: number
  lesson_type: LessonType
  access_level: LessonAccess
  youtube_video_id: string | null
  video_duration: string | null
  body: string | null
  takeaway: string | null
  read_time_min: number | null
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  enrolled_at: string
  completed_at: string | null
  payment_verified_at: string | null
  payment_verified_by: string | null
}

export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string  // uuid — FK to lessons.id
  course_id: string
  completed_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
      }
      courses: {
        Row: Course
        Insert: Omit<Course, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Course, 'id' | 'created_at' | 'updated_at'>>
      }
      modules: {
        Row: Module
        Insert: Omit<Module, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Module, 'id' | 'created_at' | 'updated_at'>>
      }
      lessons: {
        Row: Lesson
        Insert: Omit<Lesson, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Lesson, 'id' | 'created_at' | 'updated_at'>>
      }
      enrollments: {
        Row: Enrollment
        Insert: Omit<Enrollment, 'id' | 'payment_verified_at' | 'payment_verified_by'>
          & Partial<Pick<Enrollment, 'payment_verified_at' | 'payment_verified_by'>>
        Update: Partial<Omit<Enrollment, 'id' | 'user_id' | 'course_id'>>
      }
      lesson_progress: {
        Row: LessonProgress
        Insert: Omit<LessonProgress, 'id'>
        Update: Partial<Omit<LessonProgress, 'id'>>
      }
    }
    Views: Record<string, never>
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: UserRole
      }
    }
    Enums: {
      user_role: UserRole
      course_status: CourseStatus
      course_access: CourseAccess
      lesson_access: LessonAccess
      lesson_type: LessonType
    }
  }
}
