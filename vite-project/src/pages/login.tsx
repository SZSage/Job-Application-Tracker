import { useForm, SubmitHandler } from "react-hook-form"
import { Navigate, redirect, useNavigate, useNavigation } from "react-router";
import  { SubmitButton } from "@/components/ui/button-outline"
import { userLogin } from "@/api/applications-api"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useState, useEffect } from 'react';

// Form validation
const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
})

interface loginForm {
  email: string,
  password: string
}

function SessionStorage() {
  const [name, setName] = useState(() => {
    return sessionStorage.getItem('token') || '';
  });
}

export default function Login() {

  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm<loginForm>({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  })
  let navigate = useNavigate()

  // TODO: Request a new token shortly before expiring
  // TODO: Check if token is expired before using it

  const onSubmit: SubmitHandler<loginForm> = (response: any) => {
    console.log("Data: " + response)
    // api call
    userLogin(response).then(response => {
      // extract token from response and add to sessionStorage
      const token = response.token;
      const userId = response.userId;
      sessionStorage.setItem("token", token)
      sessionStorage.setItem("userId", userId)
      console.log("Sign-in successful. Redirecting to dashboard.", response)
      navigate("/dashboard")
    })
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-gray-800/50 backdrop-blur-2xl p-8 rounded-md shadow-slate-700/50 shadow-lg w-full max-w-md  border-gray-700 border">
        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit) } className="space-y-6">
            <h1 className="flex justify-center text-2xl font-medium text-gray-300">Login</h1>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                {...register("email")}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:dark:border-sidebar-ring"
                placeholder="your@email.com"
              />
              {isSubmitted && errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
                {...register("password")}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:dark:border-sidebar-ring"
                placeholder="password"
              />
              {isSubmitted && errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div className="flex justify-center">
              <SubmitButton></SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
