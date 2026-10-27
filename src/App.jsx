import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ImpactMetricStrip from './components/landing/ImpactMetricStrip'
import ProblemSolutionSection from './components/landing/ProblemSolutionSection'
import AiArchitectureSection from './components/landing/AiArchitectureSection'
import LifecycleStepperSection from './components/landing/LifecycleStepperSection'
import ThreeTierArchitectureSection from './components/landing/ThreeTierArchitectureSection'
import DepartmentDirectorySection from './components/landing/DepartmentDirectorySection'
import FaqSection from './components/landing/FaqSection'
import BottomBanner from './components/BottomBanner'
import ReportIssueModal from './components/ReportIssueModal'
import TrackReportModal from './components/TrackReportModal'
import AuthModal from './components/AuthModal'
import RoleDashboardModal from './components/RoleDashboardModal'
import DashboardView from './components/dashboard/DashboardView'
import { AuthProvider } from './context/AuthContext'
import { ReportsProvider } from './context/ReportsContext'

function MainLayout() {
  const [currentView, setCurrentView] = useState('landing') // 'landing' | 'dashboard'
  const [targetDepartment, setTargetDepartment] = useState('All Departments')
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [trackModalOpen, setTrackModalOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [roleDashboardOpen, setRoleDashboardOpen] = useState(false)

  const handleOpenDepartmentInDashboard = (dept) => {
    setTargetDepartment(dept)
    setCurrentView('dashboard')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {currentView === 'dashboard' ? (
        <DashboardView 
          onBackToHome={() => setCurrentView('landing')}
          onOpenReportModal={() => setReportModalOpen(true)}
          initialDepartment={targetDepartment}
        />
      ) : (
        <>
          {/* Navigation */}
          <Navbar 
            onOpenReportModal={() => setReportModalOpen(true)}
            onOpenTrackModal={() => setTrackModalOpen(true)}
            onOpenAuthModal={() => setAuthModalOpen(true)}
            onOpenRoleDashboard={() => setRoleDashboardOpen(true)}
            onNavigateToDashboard={() => setCurrentView('dashboard')}
          />

          {/* Main Landing Page Content */}
          <main className="flex-1">
            {/* 1. Hero Section */}
            <Hero 
              onOpenReportModal={() => setReportModalOpen(true)}
              onOpenTrackModal={() => setTrackModalOpen(true)}
              onNavigateToDashboard={() => setCurrentView('dashboard')}
            />

            {/* 2. Real-Time National Impact Metric Strip */}
            <ImpactMetricStrip />

            {/* 3. Problem Statement vs CivicPulse Innovation (Section 2 & 3) */}
            <ProblemSolutionSection 
              onOpenReportModal={() => setReportModalOpen(true)} 
            />

            {/* 4. Multi-Modal AI Severity Architecture (Section 7: CNN-RNN + SVM-NLP) */}
            <AiArchitectureSection />

            {/* 5. 6-Stage Transparent Governance Lifecycle (Section 8.2) */}
            <LifecycleStepperSection 
              onOpenTrackModal={() => setTrackModalOpen(true)} 
            />

            {/* 6. Three-Tier Municipal Governance Model (Section 6 & 8.1) */}
            <ThreeTierArchitectureSection 
              onNavigateToDashboard={() => setCurrentView('dashboard')}
              onOpenReportModal={() => setReportModalOpen(true)}
            />

            {/* 7. Department Directory & Citizen Charter SLAs */}
            <DepartmentDirectorySection 
              onNavigateToDepartment={handleOpenDepartmentInDashboard}
            />

            {/* 8. Frequently Asked Questions */}
            <FaqSection />
          </main>

          {/* 9. Official Modern Government Footer */}
          <div id="contact">
            <BottomBanner 
              onOpenReportModal={() => setReportModalOpen(true)}
              onNavigateToDashboard={handleOpenDepartmentInDashboard}
            />
          </div>
        </>
      )}

      {/* Interactive Modals */}
      <ReportIssueModal 
        isOpen={reportModalOpen} 
        onClose={() => setReportModalOpen(false)} 
        onNavigateToDepartment={handleOpenDepartmentInDashboard}
      />

      <TrackReportModal 
        isOpen={trackModalOpen} 
        onClose={() => setTrackModalOpen(false)} 
      />

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />

      <RoleDashboardModal 
        isOpen={roleDashboardOpen} 
        onClose={() => setRoleDashboardOpen(false)} 
      />

    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ReportsProvider>
        <MainLayout />
      </ReportsProvider>
    </AuthProvider>
  )
}
