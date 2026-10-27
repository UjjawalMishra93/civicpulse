import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext(null)

export const ROLES = {
  CITIZEN: 'citizen',
  AUTHORITY: 'authority',
  ADMIN: 'admin'
}

export const DEPARTMENTS = [
  'Roads & Infrastructure',
  'Solid Waste & Sanitation',
  'Water Supply & Drainage',
  'Streetlighting & Electrical',
  'Public Works',
  'General Administration'
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch or build user profile
  const fetchProfile = async (sessionUser) => {
    if (!sessionUser) {
      setProfile(null)
      return
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sessionUser.id)
        .maybeSingle()

      if (data && !error) {
        setProfile(data)
      } else {
        // Fallback to metadata from auth
        const meta = sessionUser.user_metadata || {}
        setProfile({
          id: sessionUser.id,
          email: sessionUser.email,
          full_name: meta.full_name || sessionUser.email?.split('@')[0] || 'Civic User',
          role: meta.role || ROLES.CITIZEN,
          department: meta.department || null,
          phone: meta.phone || '',
          avatar_url: meta.avatar_url || meta.picture || null
        })
      }
    } catch (err) {
      console.warn('Profile fetch note:', err.message)
      const meta = sessionUser.user_metadata || {}
      setProfile({
        id: sessionUser.id,
        email: sessionUser.email,
        full_name: meta.full_name || sessionUser.email?.split('@')[0] || 'Civic User',
        role: meta.role || ROLES.CITIZEN,
        department: meta.department || null,
        phone: meta.phone || '',
        avatar_url: meta.avatar_url || meta.picture || null
      })
    }
  }

  // Monitor Supabase Auth state changes
  useEffect(() => {
    let mounted = true

    async function initAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (mounted) {
          if (session?.user) {
            setUser(session.user)
            await fetchProfile(session.user)
          } else {
            // Check for saved demo session in localStorage if no active Supabase session
            const demoSession = localStorage.getItem('civicpulse_demo_user')
            if (demoSession) {
              try {
                const parsed = JSON.parse(demoSession)
                setUser(parsed.user)
                setProfile(parsed.profile)
              } catch (e) {
                localStorage.removeItem('civicpulse_demo_user')
              }
            }
          }
        }
      } catch (err) {
        console.warn('Auth init note:', err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return
      if (session?.user) {
        localStorage.removeItem('civicpulse_demo_user')
        setUser(session.user)
        await fetchProfile(session.user)
      } else {
        const demoSession = localStorage.getItem('civicpulse_demo_user')
        if (!demoSession) {
          setUser(null)
          setProfile(null)
        }
      }
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [])

  // Sign up with Email + Password & metadata (Role, Full Name, Department)
  const signUpWithEmail = async ({ email, password, fullName, role = ROLES.CITIZEN, department = null, phone = '' }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
          department: department,
          phone: phone
        }
      }
    })

    if (error) throw error

    if (data?.user) {
      setUser(data.user)
      // Attempt to upsert to profiles table if table exists
      try {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: data.user.email,
          full_name: fullName,
          role: role,
          department: department,
          phone: phone
        })
      } catch (e) {
        console.warn('Profile upsert note:', e.message)
      }

      await fetchProfile(data.user)
    }

    return data
  }

  // Sign in with Email + Password
  const signInWithEmail = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    if (data?.user) {
      setUser(data.user)
      await fetchProfile(data.user)
    }
    return data
  }

  // Sign in with Google OAuth
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
    if (error) throw error
    return data
  }

  // Sign Out
  const signOut = async () => {
    localStorage.removeItem('civicpulse_demo_user')
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.warn('Sign out note:', err.message)
    }
    setUser(null)
    setProfile(null)
  }

  // Fast switch for quick presentation/testing of all three roles
  const loginAsDemoRole = (role, customDept = null) => {
    const demoProfiles = {
      [ROLES.CITIZEN]: {
        id: 'demo-citizen-01',
        email: 'priya.sharma@example.com',
        full_name: 'Priya Sharma',
        role: ROLES.CITIZEN,
        department: null,
        phone: '+91 98765 43210',
        avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
      },
      [ROLES.AUTHORITY]: {
        id: 'demo-authority-01',
        email: 'officer.rajesh@municipal.gov.in',
        full_name: 'Rajesh Verma (AE)',
        role: ROLES.AUTHORITY,
        department: customDept || 'Roads & Infrastructure',
        phone: '+91 98111 22334',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
      },
      [ROLES.ADMIN]: {
        id: 'demo-admin-01',
        email: 'commissioner.admin@delhicivic.gov.in',
        full_name: 'Dr. Anita Desai (Municipal Commissioner)',
        role: ROLES.ADMIN,
        department: 'General Administration',
        phone: '+91 98222 55667',
        avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
      }
    }

    const selectedProfile = demoProfiles[role] || demoProfiles[ROLES.CITIZEN]
    const demoUser = {
      id: selectedProfile.id,
      email: selectedProfile.email,
      user_metadata: {
        full_name: selectedProfile.full_name,
        role: selectedProfile.role,
        department: selectedProfile.department
      }
    }

    localStorage.setItem('civicpulse_demo_user', JSON.stringify({ user: demoUser, profile: selectedProfile }))
    setUser(demoUser)
    setProfile(selectedProfile)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isConfigured: isSupabaseConfigured,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        signOut,
        loginAsDemoRole,
        refreshProfile: () => fetchProfile(user)
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
