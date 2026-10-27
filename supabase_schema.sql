-- ==============================================================================
-- CivicPulse: Supabase Database Schema
-- Run this in your Supabase Project -> SQL Editor to initialize your backend
-- ==============================================================================

-- 1. Enable PostGIS extension for spatial queries and duplicate detection
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. User Profiles Table (Citizen, Authority/Department, Municipal Admin)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'citizen' CHECK (role IN ('citizen', 'authority', 'admin')),
    department TEXT CHECK (department IS NULL OR department IN (
        'Roads & Infrastructure',
        'Solid Waste & Sanitation',
        'Water Supply & Drainage',
        'Streetlighting & Electrical',
        'Public Works',
        'General Administration'
    )),
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create a profile automatically when a user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role, department, phone, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'citizen'),
        NEW.raw_user_meta_data->>'department',
        NEW.raw_user_meta_data->>'phone',
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role,
        department = EXCLUDED.department,
        avatar_url = EXCLUDED.avatar_url,
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT OR UPDATE ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Create Reports / Complaints Table
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'Road & Potholes',
        'Garbage Overflow',
        'Water Leakage',
        'Streetlight Outage',
        'Open Manhole',
        'Damaged Infrastructure',
        'Other'
    )),
    description TEXT NOT NULL,
    image_url TEXT,
    resolution_proof_url TEXT,
    
    -- Geolocation details
    address TEXT,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    geom GEOGRAPHY(Point, 4326),

    -- Multi-Modal AI Severity Scoring
    visual_severity TEXT DEFAULT 'Moderate' CHECK (visual_severity IN ('Low', 'Moderate', 'High', 'Severe')),
    visual_score FLOAT DEFAULT 0.5,
    text_urgency TEXT DEFAULT 'Standard' CHECK (text_urgency IN ('Low', 'Standard', 'Urgent', 'Critical')),
    text_score FLOAT DEFAULT 0.5,
    priority_score FLOAT DEFAULT 0.5, -- Computed Priority Rank P

    -- 6-Stage Governance Lifecycle
    status TEXT NOT NULL DEFAULT 'Reported' CHECK (status IN (
        'Reported',
        'Approved / Verified',
        'Assigned',
        'In Progress',
        'Resolved',
        'Closed'
    )),

    -- Department Assignment
    assigned_department TEXT,
    assigned_officer TEXT,

    -- Citizen & Metadata
    citizen_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    citizen_name TEXT,
    citizen_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Automatically populate PostGIS point geometry on insert/update
CREATE OR REPLACE FUNCTION update_report_geom()
RETURNS TRIGGER AS $$
BEGIN
    NEW.geom := ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_report_geom
BEFORE INSERT OR UPDATE ON public.reports
FOR EACH ROW
EXECUTE FUNCTION update_report_geom();

-- 4. Create Audit Trail & Status History Table
CREATE TABLE IF NOT EXISTS public.status_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
    previous_status TEXT,
    new_status TEXT NOT NULL,
    remarks TEXT,
    updated_by TEXT DEFAULT 'System Admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Fast Spatial Index for Deduplication Queries
CREATE INDEX IF NOT EXISTS idx_reports_geom ON public.reports USING GIST(geom);
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_priority ON public.reports(priority_score DESC);

-- 6. Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.status_logs ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Reports Policies
CREATE POLICY "Public can view reported civic issues"
ON public.reports FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Public and authenticated can insert civic reports"
ON public.reports FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users and officers can update reports"
ON public.reports FOR UPDATE
TO authenticated
USING (true);

-- Status Logs Policies
CREATE POLICY "Public can view status logs"
ON public.status_logs FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Authenticated can insert status logs"
ON public.status_logs FOR INSERT
TO authenticated
WITH CHECK (true);
