-- Matrimony Connect - Authentication Module Migration
-- Location: supabase/migrations/20250720120418_matrimony_auth_module.sql

-- 1. Types and Enums
CREATE TYPE public.user_role AS ENUM ('admin', 'premium', 'member');
CREATE TYPE public.profile_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE public.marital_status AS ENUM ('single', 'divorced', 'widowed');
CREATE TYPE public.religion_type AS ENUM ('hindu', 'muslim', 'christian', 'sikh', 'buddhist', 'jain', 'other');

-- 2. Core user profiles table (✅ Reference from public schema)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'member'::public.user_role,
    profile_status public.profile_status DEFAULT 'active'::public.profile_status,
    
    -- Basic Details
    age INTEGER,
    gender TEXT CHECK (gender IN ('male', 'female')),
    marital_status public.marital_status,
    height INTEGER, -- in cms
    weight INTEGER, -- in kgs
    
    -- Contact Information
    phone TEXT,
    location TEXT,
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'India',
    
    -- Religious & Cultural
    religion public.religion_type,
    caste TEXT,
    subcaste TEXT,
    mother_tongue TEXT,
    
    -- Professional
    education TEXT,
    profession TEXT,
    annual_income INTEGER,
    company_name TEXT,
    
    -- Profile Media
    avatar TEXT,
    profile_images TEXT[] DEFAULT '{}',
    
    -- Preferences & Settings
    looking_for TEXT,
    about_me TEXT,
    family_details TEXT,
    
    -- Status Fields
    is_premium BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    is_online BOOLEAN DEFAULT false,
    profile_completed BOOLEAN DEFAULT false,
    last_seen TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Essential Indexes
CREATE INDEX idx_user_profiles_id ON public.user_profiles(id);
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_location ON public.user_profiles(city, state);
CREATE INDEX idx_user_profiles_religion_caste ON public.user_profiles(religion, caste);
CREATE INDEX idx_user_profiles_age_gender ON public.user_profiles(age, gender);
CREATE INDEX idx_user_profiles_active ON public.user_profiles(profile_status) WHERE profile_status = 'active';

-- 4. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 5. Helper Functions for RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
)
$$;

CREATE OR REPLACE FUNCTION public.is_profile_owner(profile_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = profile_id AND up.id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_view_profile(profile_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = profile_id 
    AND up.profile_status = 'active'::public.profile_status
    AND (
        up.id = auth.uid() OR 
        public.is_admin() OR
        auth.role() = 'authenticated'
    )
)
$$;

-- Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'member'::public.user_role)
  );  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- Trigger for updating updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. RLS Policies
CREATE POLICY "users_view_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (public.is_profile_owner(id));

CREATE POLICY "admin_view_all_profiles"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "authenticated_view_active_profiles"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (profile_status = 'active'::public.profile_status);

CREATE POLICY "users_update_own_profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (public.is_profile_owner(id))
WITH CHECK (public.is_profile_owner(id));

CREATE POLICY "admin_manage_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 7. Complete Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    user1_uuid UUID := gen_random_uuid();
    user2_uuid UUID := gen_random_uuid();
    user3_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@matrimony.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user1_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'priya.sharma@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Priya Sharma"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user2_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'rahul.kumar@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Rahul Kumar"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user3_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'user@matrimony.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Test User"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Update user profiles with detailed matrimonial data
    UPDATE public.user_profiles 
    SET 
        age = 28,
        gender = 'female',
        marital_status = 'single'::public.marital_status,
        height = 165,
        weight = 55,
        phone = '+91-9876543210',
        location = 'Mumbai, Maharashtra',
        city = 'Mumbai',
        state = 'Maharashtra',
        religion = 'hindu'::public.religion_type,
        caste = 'Brahmin',
        mother_tongue = 'Hindi',
        education = 'MBA Finance',
        profession = 'Software Engineer',
        annual_income = 1200000,
        company_name = 'Tech Solutions Pvt Ltd',
        avatar = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
        looking_for = 'Life partner with similar values and education',
        about_me = 'Family-oriented, career-focused professional looking for meaningful relationship',
        is_premium = true,
        is_verified = true,
        profile_completed = true,
        is_online = true
    WHERE email = 'priya.sharma@example.com';

    UPDATE public.user_profiles 
    SET 
        age = 30,
        gender = 'male',
        marital_status = 'single'::public.marital_status,
        height = 175,
        weight = 70,
        phone = '+91-9876543211',
        location = 'Delhi, Delhi',
        city = 'Delhi',
        state = 'Delhi',
        religion = 'hindu'::public.religion_type,
        caste = 'Kshatriya',
        mother_tongue = 'Hindi',
        education = 'BE Computer Science',
        profession = 'Senior Developer',
        annual_income = 1500000,
        company_name = 'IT Corp Ltd',
        avatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        looking_for = 'Understanding life partner who values family',
        about_me = 'Tech professional with traditional values seeking long-term relationship',
        is_premium = false,
        is_verified = true,
        profile_completed = true,
        is_online = false
    WHERE email = 'rahul.kumar@example.com';

    UPDATE public.user_profiles 
    SET 
        age = 26,
        gender = 'female',
        marital_status = 'single'::public.marital_status,
        height = 160,
        weight = 50,
        phone = '+91-9876543212',
        location = 'Bangalore, Karnataka',
        city = 'Bangalore',
        state = 'Karnataka',
        religion = 'hindu'::public.religion_type,
        caste = 'Vaishya',
        mother_tongue = 'Kannada',
        education = 'B.Tech IT',
        profession = 'Software Developer',
        annual_income = 800000,
        avatar = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        looking_for = 'Caring and supportive life partner',
        about_me = 'Simple, down-to-earth person looking for genuine connection',
        is_premium = false,
        is_verified = false,
        profile_completed = true,
        is_online = true
    WHERE email = 'user@matrimony.com';

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;

-- 8. Cleanup function for test data
CREATE OR REPLACE FUNCTION public.cleanup_matrimony_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs first
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email LIKE '%@example.com' OR email LIKE '%@matrimony.com';

    -- Delete user profiles first
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);

    -- Delete auth users last
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;