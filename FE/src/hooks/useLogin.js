import { useEffect, useRef, useState } from 'react'
import { apiClient } from '../lib/apiClient'
import { MEDIA } from '../constants/index'
import { fallbackTranslations } from '../data/translations'

const navItems = ['nav_home', 'nav_order', 'nav_customers', 'nav_about', 'nav_contact']

const languages = [
  { code: 'sv', label: 'Svenska', flag: MEDIA.flags.sv },
  { code: 'en', label: 'English', flag: MEDIA.flags.en },
]

const emptyErrors = { email: '', password: '' }
const emptyTouched = { email: false, password: false }

const useLogin = (navigate) => {
  const [selectedLanguage, setSelectedLanguage] = useState('sv')
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState(emptyErrors)
  const [, setTouched] = useState(emptyTouched)
  const [serverMessage, setServerMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [translationMap, setTranslationMap] = useState(fallbackTranslations)
  const languageMenuRef = useRef(null)
  const [user, setUser] = useState(null)

  const t = (key) => translationMap[key]?.[selectedLanguage] ?? fallbackTranslations[key]?.[selectedLanguage] ?? key

  const navLinks = navItems.map((key) => ({
    key,
    label: t(key),
  }))

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
        // keep fallback map
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const closeLanguageMenu = (event) => {
      if (!languageMenuRef.current) return
      if (languageMenuRef.current.contains(event.target)) return
      setShowLanguageMenu(false)
    }

    document.addEventListener('click', closeLanguageMenu)
    return () => document.removeEventListener('click', closeLanguageMenu)
  }, [])

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { user: profile } = await apiClient('/auth/me')
        if (!profile) return

        setUser(profile)
      } catch {
        setUser(null)
      }
    }

    loadProfile()
  }, [])

  useEffect(() => {
    if (!user) return

    const message = selectedLanguage === 'sv' ? `Inloggad som ${user.email}` : `Signed in as ${user.email}`
    setServerMessage(message)
  }, [selectedLanguage, user])

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode)
    setShowLanguageMenu(false)
  }

  const validateField = (name, value) => {
    if (name === 'email') {
      const emailRegex = /.+@.+\..+/
      return emailRegex.test(String(value).trim()) ? '' : t('email_error')
    }

    if (name === 'password') {
      return String(value).trim() ? '' : t('password_error')
    }

    return ''
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleFieldFocus = (event) => {
    const { name } = event.target
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleFieldBlur = (event) => {
    const { name, value } = event.target

    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }))
  }

  const validate = () => {
    const nextErrors = {
      email: validateField('email', form.email),
      password: validateField('password', form.password),
    }

    setTouched({ email: true, password: true })
    setErrors(nextErrors)
    return !nextErrors.email && !nextErrors.password
  }

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
      }

      setForm({ email: '', password: '' })
      setTouched(emptyTouched)
      setErrors(emptyErrors)
      setIsRedirecting(true)
      setServerMessage(selectedLanguage === 'sv' ? 'Omdirigerar...' : 'Redirecting...')

      setTimeout(() => {
        navigate('/products', { replace: true })
      }, 1200)
    } catch (error) {
      const fallback =
        selectedLanguage === 'sv'
          ? 'Inloggning misslyckades. Kontrollera uppgifterna.'
          : 'Login failed. Check credentials.'

      setServerMessage(error.message || fallback)
      setIsRedirecting(false)
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
    isRedirecting,
    handleInputChange,
    handleFieldBlur,
    handleFieldFocus,
    handleSubmit,
    handleLanguageSelect,
    navLinks,
    t,
    languageMenuRef,
  }
}

export { useLogin }
