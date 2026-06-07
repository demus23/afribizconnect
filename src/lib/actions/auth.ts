'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/* ─── LOGIN ─────────────────────────────────────────────── */
export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

/* ─── REGISTER ───────────────────────────────────────────── */
export async function register(formData: FormData) {
  const supabase = await createClient()

  const email    = formData.get('email') as string
  const password = formData.get('password') as string
  const name     = formData.get('name') as string

  console.log('Register attempt:', { email, name, hasPassword: !!password })

  if (!email || !password || !name) {
    return { error: `Missing fields: ${!name?'name ':''} ${!email?'email ':''} ${!password?'password':''}`.trim() }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters.' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    },
  })

  console.log('Supabase signUp result:', { userId: data?.user?.id, error: error?.message })

  if (error) {
    return { error: error.message }
  }

  if (!data.user) {
    return { error: 'Registration failed. Please try again.' }
  }

  // If session exists, email confirmation is off — go straight to dashboard
  if (data.session) {
    revalidatePath('/', 'layout')
    redirect('/dashboard')
  }

  // Email confirmation required
  redirect('/verify?email=' + encodeURIComponent(email))
}

/* ─── GOOGLE OAUTH ───────────────────────────────────────── */
export async function loginWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect(data.url)
}

/* ─── LOGOUT ─────────────────────────────────────────────── */
export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

/* ─── GET CURRENT USER ───────────────────────────────────── */
export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}