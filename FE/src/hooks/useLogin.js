import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { apiClient } from '../lib/apiClient'
import { MEDIA } from '../constants/index'
import { fallbackTranslations } from '../data/translations'

const navItems = ['nav_home', 'nav_order', 'nav_customers', 'nav_about', 'nav_contact']

const languages = [
  { code: 'sv', label: 'Svenska', flag: MEDIA.flags.sv },
  { code: 'en', label: 'English', flag: MEDIA.flags.en },
]

const emptyErrors = { email: '', password: '' }

const useLogin = (navigate) => {
  const [selectedLanguage, setSelectedLanguage] = useState('sv')
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState(emptyErrors)
  const [serverMessage, setServerMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [translationMap, setTranslationMap] = useState(fallbackTranslations)
  const languageMenuRef = useRef(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    let isMounted = true

    apiClient('/translations')
      .then((data) => {
        if (!isMounted || !data?.translations) return
        const map = { ...fallbackTranslations }
        data.translations.forEach(({ key, en, sv }) => {
          map[key] = { en, sv }
        })
        setTranslationMap(map)
      })
      .catch(() => {
        // fallback copy already set
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const handler = (event) => {
      if (!languageMenuRef.current) return
      if (languageMenuRef.current.contains(event.target)) return
      setShowLanguageMenu(false)
    }

    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const sessionMessage = useCallback(
    (profile) => (selectedLanguage === 'sv' ? `Inloggad som ${profile.email}` : `Signed in as ${profile.email}`),
    [selectedLanguage],
  )

  const t = useCallback(
    (key) => translationMap[key]?.[selectedLanguage] ?? fallbackTranslations[key]?.[selectedLanguage] ?? key,
    [selectedLanguage, translationMap],
  )

  const navLinks = useMemo(
    () =>
      navItems.map((key) => ({
        key,
        label: t(key),
      })),
    [t],
  )

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = { ...emptyErrors }
    const emailRegex = /.+@.+\..+/

    if (!emailRegex.test(form.email.trim())) {
      newErrors.email = t('email_error')
    }
    if (!form.password.trim()) {
      newErrors.password = t('password_error')
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const fetchProfile = useCallback(async () => {
    try {
      const { user: profile } = await apiClient('/auth/me')
      if (profile) {
        setUser(profile)
        setServerMessage(sessionMessage(profile))
      }
    } catch {
      setUser(null)
    }
  }, [sessionMessage])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  useEffect(() => {
    if (user) {
      setServerMessage(sessionMessage(user))
    }
  }, [sessionMessage, user])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setServerMessage('')

    if (!validate()) return

    try {
      setIsSubmitting(true)
      const loginResponse = await apiClient('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: form.email.trim(), password: form.password }),
      })

      const profile = loginResponse?.user ?? (await apiClient('/auth/me'))?.user

      if (profile) {
        setUser(profile)
        setServerMessage(sessionMessage(profile))
      } else {
        const successMsg = selectedLanguage === 'sv' ? 'Inloggning lyckades \u2714' : 'Login successful \u2714'
        setServerMessage(successMsg)
      }

      setForm({ email: '', password: '' })
      setErrors(emptyErrors)
      setTimeout(() => navigate('/products', { replace: true }), 1200)
    } catch (error) {
      const fallback =
        selectedLanguage === 'sv'
          ? 'Inloggning misslyckades. Kontrollera uppgifterna.'
          : 'Login failed. Check credentials.'
      setServerMessage(error.message || fallback)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    languages,
    selectedLanguage,
    setSelectedLanguage,
    showLanguageMenu,
    setShowLanguageMenu,
    showPassword,
    setShowPassword,
    form,
    errors,
    serverMessage,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    navLinks,
    t,
    languageMenuRef,
    user,
  }
}

export { useLogin }
