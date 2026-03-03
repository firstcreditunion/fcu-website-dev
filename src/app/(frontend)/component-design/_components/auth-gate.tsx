'use client'

import * as React from 'react'
import { loginUser, registerUser, validateUser } from '../_actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LockKeyhole, Loader2, UserPlus } from 'lucide-react'

const STORAGE_KEY = 'fcu-ds-auth'

interface AuthData {
  email: string
  pin: string
}

interface AuthContextValue {
  email: string
  pin: string
}

const AuthContext = React.createContext<AuthContextValue>({ email: '', pin: '' })

export function useAuth() {
  return React.useContext(AuthContext)
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = React.useState<AuthData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [mode, setMode] = React.useState<'login' | 'register'>('login')

  const [email, setEmail] = React.useState('')
  const [pin, setPin] = React.useState('')
  const [displayName, setDisplayName] = React.useState('')
  const [error, setError] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: AuthData = JSON.parse(stored)
        validateUser(parsed.email, parsed.pin).then((valid) => {
          if (valid) {
            setAuth(parsed)
          } else {
            localStorage.removeItem(STORAGE_KEY)
          }
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    } catch {
      setLoading(false)
    }
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const result = await loginUser(email, pin)
    if (result.success) {
      const data: AuthData = { email: email.toLowerCase(), pin }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      setAuth(data)
    } else {
      setError(result.message)
    }
    setSubmitting(false)
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const result = await registerUser(email, pin, displayName)
    if (result.success) {
      const data: AuthData = { email: email.toLowerCase(), pin }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      setAuth(data)
    } else {
      setError(result.message)
    }
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className='flex min-h-[50vh] items-center justify-center'>
        <Loader2 className='size-6 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (!auth) {
    const isLogin = mode === 'login'

    return (
      <div className='flex min-h-[50vh] items-center justify-center'>
        <div className='w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg'>
          <div className='mb-6 flex flex-col items-center gap-3'>
            <div className='flex size-12 items-center justify-center rounded-full bg-muted'>
              {isLogin ? (
                <LockKeyhole className='size-5 text-muted-foreground' />
              ) : (
                <UserPlus className='size-5 text-muted-foreground' />
              )}
            </div>
            <div className='text-center'>
              <h2 className='text-lg font-semibold text-foreground'>
                {isLogin ? 'Sign In' : 'Create Account'}
              </h2>
              <p className='mt-1 text-sm text-muted-foreground'>
                {isLogin
                  ? 'Enter your email and PIN to access the design system.'
                  : 'Register to edit component configurations.'}
              </p>
            </div>
          </div>

          <form
            onSubmit={isLogin ? handleLogin : handleRegister}
            className='space-y-4'
          >
            {!isLogin && (
              <div className='space-y-2'>
                <Label htmlFor='displayName'>Name</Label>
                <Input
                  id='displayName'
                  type='text'
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder='Your name'
                />
              </div>
            )}

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='you@firstcu.co.nz'
                autoFocus
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='pin'>PIN</Label>
              <Input
                id='pin'
                type='password'
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder={isLogin ? 'Enter your PIN' : 'Choose a PIN (4+ characters)'}
                minLength={4}
                required
              />
            </div>

            {error && (
              <p className='text-xs font-medium text-destructive'>{error}</p>
            )}

            <Button
              type='submit'
              className='w-full'
              disabled={submitting || !email || !pin}
            >
              {submitting ? (
                <>
                  <Loader2 className='size-4 animate-spin' />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className='mt-4 text-center'>
            <button
              type='button'
              onClick={() => {
                setMode(isLogin ? 'register' : 'login')
                setError('')
              }}
              className='text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline'
            >
              {isLogin
                ? "Don't have an account? Register"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <AuthContext value={auth}>{children}</AuthContext>
}
