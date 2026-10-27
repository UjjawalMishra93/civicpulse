import React, { useState } from 'react'
import { 
  X, Mail, Lock, User, Phone, ShieldCheck, HardHat, 
  Building2, ArrowRight, Eye, EyeOff, Loader2, AlertCircle, 
  CheckCircle2, Sparkles 
} from 'lucide-react'
import { useAuth, ROLES, DEPARTMENTS } from '../context/AuthContext'

export default function AuthModal({ isOpen, onClose }) {
  const { 
    signInWithEmail, 
    signUpWithEmail, 
    signInWithGoogle, 
    loginAsDemoRole,
    isConfigured 
  } = useAuth()

  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [selectedRole, setSelectedRole] = useState(ROLES.CITIZEN)
  const [selectedDept, setSelectedDept] = useState(DEPARTMENTS[0])

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  if (!isOpen) return null

  const resetForm = () => {
    setErrorMsg('')
    setSuccessMsg('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        if (!fullName.trim()) throw new Error('Please enter your full name.')
        if (password.length < 6) throw new Error('Password must be at least 6 characters.')

        const res = await signUpWithEmail({
          email: email.trim(),
          password,
          fullName: fullName.trim(),
          role: selectedRole,
          department: selectedRole === ROLES.AUTHORITY ? selectedDept : null,
          phone: phone.trim()
        })

        if (res?.user && !res.session) {
          setSuccessMsg('Account created! Please check your email to confirm your account, or use Demo Login below to test instantly.')
        } else {
          setSuccessMsg(`Welcome, ${fullName.trim()}! Logged in successfully.`)
          setTimeout(() => onClose(), 1000)
        }
      } else {
        await signInWithEmail({
          email: email.trim(),
          password
        })
        setSuccessMsg('Signed in successfully!')
        setTimeout(() => onClose(), 700)
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please verify your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setErrorMsg('')
    setSuccessMsg('')
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch (err) {
      setErrorMsg(err.message || 'Google Sign-In failed. Please check your Supabase OAuth settings.')
      setLoading(false)
    }
  }

  const handleQuickDemo = (role, dept) => {
    loginAsDemoRole(role, dept)
    setSuccessMsg(`Switched to demo ${role.toUpperCase()} persona!`)
    setTimeout(() => onClose(), 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0d8a55]/10 text-[#0d8a55] flex items-center justify-center font-bold text-lg shadow-inner">
              CP
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                {mode === 'login' ? 'Welcome back to CivicPulse' : 'Create CivicPulse Account'}
              </h2>
              <p className="text-xs text-slate-500">
                {mode === 'login' 
                  ? 'Sign in to access your civic grievance dashboard' 
                  : 'Join the AI-enabled civic resolution platform'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Login vs Sign Up */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => { setMode('login'); resetForm(); }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'login' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); resetForm(); }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'signup' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-left">
          
          {/* Alerts */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMsg}</div>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-2.5 text-xs text-emerald-800 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{successMsg}</div>
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs group"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider shrink-0">
              or continue with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* If Signup: Role Selector (Synopsis: Citizen, Department Officer, Municipal Admin) */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Select Account Role</span>
                  <span className="text-[10px] text-[#0d8a55] font-normal">3-Tier Governance</span>
                </label>
                
                <div className="grid grid-cols-3 gap-2">
                  {/* Citizen */}
                  <button
                    type="button"
                    onClick={() => setSelectedRole(ROLES.CITIZEN)}
                    className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      selectedRole === ROLES.CITIZEN
                        ? 'border-[#0d8a55] bg-emerald-50/70 text-[#0d8a55] shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-[11px] font-bold leading-tight">Citizen</span>
                  </button>

                  {/* Authority / Officer */}
                  <button
                    type="button"
                    onClick={() => setSelectedRole(ROLES.AUTHORITY)}
                    className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      selectedRole === ROLES.AUTHORITY
                        ? 'border-[#0d8a55] bg-emerald-50/70 text-[#0d8a55] shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <HardHat className="w-4 h-4" />
                    <span className="text-[11px] font-bold leading-tight">Officer</span>
                  </button>

                  {/* Admin */}
                  <button
                    type="button"
                    onClick={() => setSelectedRole(ROLES.ADMIN)}
                    className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      selectedRole === ROLES.ADMIN
                        ? 'border-[#0d8a55] bg-emerald-50/70 text-[#0d8a55] shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[11px] font-bold leading-tight">Admin</span>
                  </button>
                </div>

                {/* If Authority is chosen, show Department selector */}
                {selectedRole === ROLES.AUTHORITY && (
                  <div className="mt-2.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-1.5 animate-in fade-in">
                    <label className="text-[11px] font-bold text-amber-900 block">
                      Assigned Municipal Department
                    </label>
                    <select
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-2 rounded-xl bg-white border border-amber-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0d8a55]"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Full Name (Sign Up only) */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0d8a55] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0d8a55] focus:outline-none"
                />
              </div>
            </div>

            {/* Phone (Signup only) */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Phone (SMS Alerts)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0d8a55] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0d8a55] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0d8a55] hover:bg-[#096d43] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In' : 'Create Civic Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Switcher (Instant test for synopsis roles) */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                1-Click Role Testing (Synopsis)
              </span>
              <span className="text-[10px] text-slate-400">Instant Demo</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo(ROLES.CITIZEN)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 text-left transition-all text-[11px] group"
              >
                <div className="font-bold text-slate-800 group-hover:text-[#0d8a55]">Citizen</div>
                <div className="text-[9px] text-slate-400 truncate">Priya Sharma</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo(ROLES.AUTHORITY, 'Roads & Infrastructure')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 text-left transition-all text-[11px] group"
              >
                <div className="font-bold text-slate-800 group-hover:text-[#0d8a55]">Officer</div>
                <div className="text-[9px] text-slate-400 truncate">Rajesh Verma</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo(ROLES.ADMIN)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 text-left transition-all text-[11px] group"
              >
                <div className="font-bold text-slate-800 group-hover:text-[#0d8a55]">Admin</div>
                <div className="text-[9px] text-slate-400 truncate">Dr. Anita Desai</div>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
