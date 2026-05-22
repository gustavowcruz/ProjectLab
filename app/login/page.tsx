'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [modo, setModo] = useState<'login' | 'recuperar'>('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-green-400 mb-2">GameLog</h1>

        <p className="text-gray-400 mb-8">
          {modo === 'login'
            ? 'Entre na sua conta para acessar o sistema.'
            : 'Informe seu e-mail para recuperar sua senha.'}
        </p>

        {modo === 'login' ? (
          <form className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">E-mail</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-green-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setModo('recuperar')}
              className="text-sm text-green-400 hover:text-green-300"
            >
              Esqueci minha senha
            </button>

            <button
              type="button"
              className="w-full bg-green-600 hover:bg-green-500 rounded-lg py-3 font-bold transition"
            >
              Entrar
            </button>
          </form>
        ) : (
          <form className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                E-mail cadastrado
              </label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-green-500"
              />
            </div>

            <button
              type="button"
              className="w-full bg-green-600 hover:bg-green-500 rounded-lg py-3 font-bold transition"
            >
              Enviar recuperação
            </button>

            <button
              type="button"
              onClick={() => setModo('login')}
              className="w-full border border-gray-600 hover:border-green-500 rounded-lg py-3 font-bold transition"
            >
              Voltar para login
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
