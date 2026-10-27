import React, { useState } from 'react'
import { 
  MapPin, ChevronDown, ArrowRight, Menu, X, User, 
  LogOut, ShieldCheck, HardHat, Sparkles, LayoutDashboard 
} from 'lucide-react'
import { useAuth, ROLES } from '../context/AuthContext'

export default function Navbar({ onOpenReportModal, onOpenTrackModal, onOpenAuthModal, onOpenRoleDashboard, onNavigateToDashboard }) {
  const [selectedCity, setSelectedCity] = useState('New Delhi')
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { user, profile, signOut, loginAsDemoRole } = useAuth()

  const cities = [
    'New Delhi',
    'Mumbai',
    'Bengaluru',
    'Pune',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Ahmedabad'
  ]

  const getRoleBadge = (role, dept) => {
    switch (role) {
      case ROLES.ADMIN:
        return { label: 'Admin', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: ShieldCheck }
      case ROLES.AUTHORITY:
        return { label: dept ? dept.split(' ')[0] : 'Officer', color: 'bg-amber-100 text-amber-800 border-amber-200', icon: HardHat }
      case ROLES.CITIZEN:
      default:
        return { label: 'Citizen', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: User }
    }
  }

  const roleBadge = getRoleBadge(profile?.role, profile?.department)
  const RoleIcon = roleBadge.icon

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0d8a55] to-[#10b981] flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
              <svg 
                className="w-5 h-5 text-white" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Civic<span className="text-[#0d8a55]">Pulse</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="#home" 
              className="relative text-sm font-semibold text-slate-900 hover:text-[#0d8a55] transition-colors py-1 group"
            >
              Home
              <span className="absolute -bottom-1.5 left-0 w-full h-[2.5px] bg-[#0d8a55] rounded-full"></span>
            </a>

            <button 
              onClick={onNavigateToDashboard}
              className="text-sm font-bold text-slate-800 hover:text-[#0d8a55] transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-1 bg-emerald-50/70 hover:bg-emerald-100/70 rounded-full border border-emerald-200"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#0d8a55]" />
              <span>Civic Dashboard</span>
            </button>

            <button 
              onClick={onOpenReportModal} 
              className="text-sm font-medium text-slate-600 hover:text-[#0d8a55] transition-colors cursor-pointer"
            >
              Report Issue
            </button>
            <button 
              onClick={onOpenTrackModal} 
              className="text-sm font-medium text-slate-600 hover:text-[#0d8a55] transition-colors cursor-pointer"
            >
              Track Issue
            </button>

            <a 
              href="#features" 
              className="text-sm font-medium text-slate-600 hover:text-[#0d8a55] transition-colors"
            >
              Architecture
            </a>
          </nav>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* City Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#0d8a55]" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Select Your City
                  </div>
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city)
                        setIsCityDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs font-medium flex items-center justify-between hover:bg-emerald-50 hover:text-[#0d8a55] transition-colors ${
                        selectedCity === city ? 'text-[#0d8a55] font-semibold bg-emerald-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a55]"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Authentication Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all shadow-2xs group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0d8a55] text-white flex items-center justify-center font-bold text-xs shadow-inner uppercase overflow-hidden">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      (profile?.full_name || 'U').charAt(0)
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-800 leading-none">
                      {profile?.full_name?.split(' ')[0] || 'User'}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-sm border ${roleBadge.color}`}>
                        {roleBadge.label}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 ml-0.5" />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900">{profile?.full_name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{profile?.email}</div>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${roleBadge.color}`}>
                          {profile?.role?.toUpperCase()}
                        </span>
                        {profile?.department && (
                          <span className="text-[10px] text-slate-500 truncate">
                            {profile.department}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Open Full Dashboard shortcut */}
                    <div className="p-1.5">
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false)
                          onNavigateToDashboard()
                        }}
                        className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0d8a55] flex items-center justify-between transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <LayoutDashboard className="w-4 h-4 text-[#0d8a55]" />
                          <span>Open Role Dashboard</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Officer / Admin Portal shortcut */}
                    {(profile?.role === ROLES.ADMIN || profile?.role === ROLES.AUTHORITY) && (
                      <div className="px-1.5 pb-1">
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false)
                            onOpenRoleDashboard()
                          }}
                          className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 flex items-center justify-between transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-amber-700" />
                            <span>{profile.role === ROLES.ADMIN ? 'Admin Triage Modal' : 'Officer Field Queue'}</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Switch Persona for Evaluation */}
                    <div className="px-3 py-2 border-t border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        Switch Role Persona:
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          onClick={() => { loginAsDemoRole(ROLES.CITIZEN); setIsProfileDropdownOpen(false) }}
                          className="px-2 py-1 text-[10px] font-bold rounded-lg border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 transition-colors"
                        >
                          Citizen
                        </button>
                        <button
                          onClick={() => { loginAsDemoRole(ROLES.AUTHORITY, 'Roads & Infrastructure'); setIsProfileDropdownOpen(false) }}
                          className="px-2 py-1 text-[10px] font-bold rounded-lg border border-slate-200 hover:bg-amber-50 hover:border-amber-300 text-slate-700 transition-colors"
                        >
                          Officer
                        </button>
                        <button
                          onClick={() => { loginAsDemoRole(ROLES.ADMIN); setIsProfileDropdownOpen(false) }}
                          className="px-2 py-1 text-[10px] font-bold rounded-lg border border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 text-slate-700 transition-colors"
                        >
                          Admin
                        </button>
                      </div>
                    </div>

                    <div className="pt-1 border-t border-slate-100 px-1.5">
                      <button
                        onClick={() => {
                          signOut()
                          setIsProfileDropdownOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onOpenAuthModal}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Report Grievance CTA */}
            <button 
              onClick={onOpenReportModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#0d8a55] hover:bg-[#096d43] active:scale-95 transition-all shadow-md shadow-emerald-700/20 cursor-pointer"
            >
              <span>Report Issue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3">
          <a 
            href="#home" 
            className="block px-3 py-2 rounded-lg text-base font-semibold text-[#0d8a55] bg-emerald-50/70"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </a>
          <button 
            onClick={() => { onNavigateToDashboard(); setMobileMenuOpen(false) }}
            className="w-full text-left px-3 py-2 rounded-lg text-base font-bold text-[#0d8a55] bg-emerald-50 flex items-center justify-between"
          >
            <span>Civic Dashboard</span>
            <LayoutDashboard className="w-4 h-4" />
          </button>
          <button 
            onClick={() => { onOpenReportModal(); setMobileMenuOpen(false) }}
            className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Report Issue
          </button>
          <button 
            onClick={() => { onOpenTrackModal(); setMobileMenuOpen(false) }}
            className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Track Issue
          </button>

          {user ? (
            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <div className="text-xs font-bold text-slate-900">{profile?.full_name}</div>
              <div className="text-xs text-slate-500">{profile?.email} ({profile?.role})</div>
              {(profile?.role === ROLES.ADMIN || profile?.role === ROLES.AUTHORITY) && (
                <button
                  onClick={() => { onOpenRoleDashboard(); setMobileMenuOpen(false) }}
                  className="w-full py-2 px-3 rounded-lg bg-amber-500 text-white text-xs font-bold"
                >
                  Open {profile.role === ROLES.ADMIN ? 'Admin Portal' : 'Officer Queue'}
                </button>
              )}
              <button
                onClick={() => { signOut(); setMobileMenuOpen(false) }}
                className="w-full py-2 px-3 text-xs font-bold text-rose-600 bg-rose-50 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={() => { onOpenAuthModal(); setMobileMenuOpen(false) }}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
            >
              Sign In / Register
            </button>
          )}

          <div className="pt-2 border-t border-slate-100">
            <button 
              onClick={() => { onOpenReportModal(); setMobileMenuOpen(false) }}
              className="w-full py-3 rounded-full text-sm font-bold text-white bg-[#0d8a55] flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Report Civic Grievance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
