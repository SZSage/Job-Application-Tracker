import { useForm, SubmitHandler } from "react-hook-form"
import  { SubmitButton } from "@/components/ui/button-outline"
import { useNavigate } from "react-router";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { registerUser } from "@/api/applications-api"


const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    repeatPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match")
  })

interface userForm {
  email: string,
  password: string,
  repeatPassword: string
}

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm<userForm>({
    resolver: yupResolver(schema),
    mode: "onSubmit"
  });
  let navigate = useNavigate()

  const onSubmit: SubmitHandler<userForm> = (data: any) => {
    console.log("Form submitted: ", data);

    // api call here and redirect to login page
    registerUser(data)
      .then(data => {
        console.log("User registration info added: ", data)
        navigate("/login")
      })
      .catch(error => {
          console.log("User registration error: ", error)
      })
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-gray-800/50 backdrop-blur-2xl p-8 rounded-md shadow-slate-700/50 shadow-lg w-full max-w-md  border-gray-700 border">
        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit) } className="space-y-6">
            <h1 className="flex justify-center text-2xl font-medium text-gray-300">Register</h1>
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
              <input type="password" {...register("password")}
                className="w-full px-3 py-2 border bg-gray-700 border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:dark:border-sidebar-ring"
                placeholder="password"
              />
              {isSubmitted && errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Repeat password</label>
              <input type="password" {...register("repeatPassword")}
                className="w-full px-3 py-2 border bg-gray-700 border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:dark:border-sidebar-ring"
                placeholder="repeat password"
              />
              {isSubmitted && errors.repeatPassword && <p className="text-red-400 text-sm mt-1">{errors.repeatPassword.message}</p>}
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

