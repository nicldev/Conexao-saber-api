'use client'

import { Header } from '@/components/Header'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { User, Target, Edit, Loader2, Lock, Trash2, AlertTriangle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { authService } from '@/lib/api/auth'

export default function Perfil() {
  const router = useRouter()
  const { user, isAuthenticated, loading: authLoading, refreshUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [school, setSchool] = useState('')
  const [grade, setGrade] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // Estados para alteração de senha
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [changingPassword, setChangingPassword] = useState(false)
  
  // Estados para exclusão de conta
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [deletingAccount, setDeletingAccount] = useState(false)

  // Redirecionar se não estiver autenticado
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [authLoading, isAuthenticated, router])

  // Carregar dados do usuário
  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
      setSchool(user.school || '')
      setGrade(user.grade || '')
    }
  }, [user])

  const getUserInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSaving(true)

    try {
      await authService.updateProfile({
        name: name || undefined,
        school: school || undefined,
        grade: grade || undefined,
      })
      setSuccess('Perfil atualizado com sucesso!')
      await refreshUser()
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar perfil')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validações
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (newPassword.length < 8) {
      setError('A nova senha deve ter no mínimo 8 caracteres')
      return
    }

    setChangingPassword(true)

    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
      })
      setSuccess('Senha alterada com sucesso!')
      setShowChangePassword(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      setError(err.message || 'Erro ao alterar senha')
    } finally {
      setChangingPassword(false)
    }
  }

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!deletePassword) {
      setError('Por favor, confirme sua senha para excluir a conta')
      return
    }

    setDeletingAccount(true)

    try {
      await authService.deleteAccount(deletePassword)
      setSuccess('Conta excluída com sucesso. Redirecionando...')
      setTimeout(() => {
        authService.logout()
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir conta')
    } finally {
      setDeletingAccount(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen pt-20 transition-colors duration-300">
      <Header isInternal={true} />
      <ThemeToggle />
      
      <div className="max-w-notion mx-auto px-6 py-12">
        <Heading level={2} className="mb-8">Perfil</Heading>

        {error && (
          <Card className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="small text-red-600 dark:text-red-400">{error}</p>
          </Card>
        )}

        {success && (
          <Card className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <p className="small text-green-600 dark:text-green-400">{success}</p>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Foto e informações básicas */}
          <Card>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {getUserInitial(user.name)}
              </div>
              <h3 className="font-sans text-xl font-semibold mb-2">{user.name}</h3>
              <p className="text-secondary dark:text-[#A9A9A9] small mb-6 transition-colors duration-300">
                {user.school || 'Estudante'}
              </p>
              <Button variant="outline" className="w-full" onClick={() => document.getElementById('form')?.scrollIntoView()}>
                <Edit className="w-4 h-4 inline mr-2" />
                Editar perfil
              </Button>
            </div>
          </Card>

          {/* Dados básicos */}
          <Card className="md:col-span-2">
            <Heading level={3} className="mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              Dados básicos
            </Heading>
            <form id="form" onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="small text-secondary dark:text-[#A9A9A9] mb-1 block transition-colors duration-300">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-border dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#202020] text-primary dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-300"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="small text-secondary dark:text-[#A9A9A9] mb-1 block transition-colors duration-300">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-2 border border-border dark:border-[#2A2A2A] rounded-md bg-gray-100 dark:bg-[#2A2A2A] text-secondary dark:text-[#A9A9A9] cursor-not-allowed transition-colors duration-300"
                />
                <p className="small text-secondary dark:text-[#A9A9A9] mt-1">
                  O email não pode ser alterado
                </p>
              </div>
              <div>
                <label className="small text-secondary dark:text-[#A9A9A9] mb-1 block transition-colors duration-300">
                  Escola
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-4 py-2 border border-border dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#202020] text-primary dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-300"
                  placeholder="Nome da sua escola"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="small text-secondary dark:text-[#A9A9A9] mb-1 block transition-colors duration-300">
                  Série
                </label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2 border border-border dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#202020] text-primary dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-300"
                  placeholder="Ex: 3º Ano"
                  disabled={saving}
                />
              </div>
              <div className="pt-4">
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    'Salvar alterações'
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Alteração de Senha */}
        <Card className="mt-6">
          <Heading level={3} className="mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Alterar senha
          </Heading>
          {!showChangePassword ? (
            <Button
              variant="outline"
              onClick={() => setShowChangePassword(true)}
            >
              Alterar senha
            </Button>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="small text-secondary dark:text-[#A9A9A9] mb-1 block transition-colors duration-300">
                  Senha atual
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-border dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#202020] text-primary dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-300"
                  disabled={changingPassword}
                />
              </div>
              <div>
                <label className="small text-secondary dark:text-[#A9A9A9] mb-1 block transition-colors duration-300">
                  Nova senha
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border border-border dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#202020] text-primary dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-300"
                  disabled={changingPassword}
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
              <div>
                <label className="small text-secondary dark:text-[#A9A9A9] mb-1 block transition-colors duration-300">
                  Confirmar nova senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 border border-border dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#202020] text-primary dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-300"
                  disabled={changingPassword}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={changingPassword}>
                  {changingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
                      Alterando...
                    </>
                  ) : (
                    'Salvar nova senha'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowChangePassword(false)
                    setCurrentPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                    setError(null)
                  }}
                  disabled={changingPassword}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </Card>

        {/* Exclusão de Conta */}
        <Card className="mt-6 border-red-200 dark:border-red-800">
          <Heading level={3} className="mb-6 flex items-center gap-2 text-red-600 dark:text-red-400">
            <Trash2 className="w-5 h-5" />
            Zona de perigo
          </Heading>
          {!showDeleteAccount ? (
            <div>
              <p className="small text-secondary dark:text-[#A9A9A9] mb-4">
                Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
              </p>
              <Button
                variant="outline"
                className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => setShowDeleteAccount(true)}
              >
                <Trash2 className="w-4 h-4 inline mr-2" />
                Excluir conta
              </Button>
            </div>
          ) : (
            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <p className="small font-semibold text-red-800 dark:text-red-300 mb-1">
                      Atenção: Esta ação é irreversível
                    </p>
                    <p className="small text-red-700 dark:text-red-400">
                      Todos os seus dados, incluindo redações e estatísticas, serão permanentemente excluídos.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="small text-secondary dark:text-[#A9A9A9] mb-1 block transition-colors duration-300">
                  Confirme sua senha para excluir a conta
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-red-300 dark:border-red-700 rounded-md bg-white dark:bg-[#202020] text-primary dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300"
                  disabled={deletingAccount}
                  placeholder="Digite sua senha"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={deletingAccount}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {deletingAccount ? (
                    <>
                      <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
                      Excluindo...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 inline mr-2" />
                      Confirmar exclusão
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowDeleteAccount(false)
                    setDeletePassword('')
                    setError(null)
                  }}
                  disabled={deletingAccount}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}
