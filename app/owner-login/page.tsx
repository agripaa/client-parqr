"use client"
import * as React from "react";
import { Logo } from "@/components/icons";
import parqrLogo from "@/assets/LOGO PARQR.png";
import { useRouter } from "next/navigation";
import { loginOwner } from "@/services/api";

export default function OwnerLogin() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [userNotFound, setUserNotFound] = React.useState('');
  const [passwordIncorrect, setPasswordIncorrect] = React.useState('');
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');  
    setUserNotFound('');
    setPasswordIncorrect('');

    try {
      const response = await loginOwner({ email , password }, router);
      if (response && response.access_token) {
        document.cookie = `token=${response.access_token}; path=/`;
        router.push('/otp');
      }

      if (response.response.status === 401) {
        setLoading(false);
        setPasswordIncorrect('Password is incorrect');
      } else if (response.response.status === 404) {
        setLoading(false);
        setUserNotFound('User not found');
      } else {
        setLoading(false);
        setError('An unexpected error occurred');
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen gap-3 md:py-2">
      <div className="flex flex-col w-5/12 h-auto p-6 rounded-md bg-neutral-100">
        <div className="flex items-center w-full">
          <Logo src={parqrLogo} width={50} height={50} />
          <h2 className="ml-1 font-semibold text-xl">ParQR</h2>
        </div>
        {error && <p className="text-red-500 text-center mt-1">{error}</p>}
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <label className="font-medium">Email</label>
            <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="example@gmail.com" className="p-3 rounded-md text-lg mt-1 mb-4" />
            {userNotFound && <p className="text-red-500">{userNotFound}</p>}
            <label className="font-medium">Kata Sandi</label>
            <input onChange={e => setPassword(e.target.value)} value={password} type="text" placeholder="Masukkan Kata Sandi" className="p-3 rounded-md text-lg mt-1 mb-4" />
            {passwordIncorrect && <p className="text-red-500">{passwordIncorrect}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`bg-primary-500 text-neutral-50 p-4 mt-4 rounded-lg font-semibold ${loading ? 'bg-primary-300' : 'hover:bg-primary-600'} duration-700`}
            >
              {loading ? 'Loading...' : 'Masuk'}
            </button>
          </form>
        </div>
        <div className="text-center mt-6 font-medium text-sm ">
            <p>Kamu bukan owner? <a href="/" className="text-primary-500 hover:text-primary-600" >Masuk Sebagai Operator</a></p>
        </div>
      </div>
    </section>
  );
}
