import SignUpForm from '@/components/auth/SignUpForm'
import Link from 'next/link'

const SignUp = () => {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-2">Get Started Now</h2>
      <p className="text-form-secondary-text mb-6">Create your account to continue</p>
      <SignUpForm />
      <div className="mt-6">
        <div className="flex items-center justify-center my-6">
          <hr className="w-full border-auth-divider" />
          <span className="mx-4 text-auth-divider-text text-sm whitespace-nowrap">Or</span>
          <hr className="w-full border-auth-divider" />
        </div>
      </div>
      <p className="text-center text-form-secondary-text mt-6">
        Already have an account?{' '}
        <Link
          href={"/login"}
          className="text-form-button-bg font-semibold hover:text-form-button-hover disabled:opacity-50"
        >
          Login
        </Link>
      </p>
    </div>
  )
}

export default SignUp