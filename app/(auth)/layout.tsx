import React from 'react'
import AuthImage from '@/components/auth/AuthImage';

const AuthLayout = async ({children} : {children : React.ReactNode}) => {
  return (
    <div className="flex h-[calc(100vh-100px)] overflow-hidden bg-auth-bg">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full mt-5 lg:w-1/2 p-6 md:p-12 flex  justify-center bg-auth-bg">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
        <div className="hidden lg:flex w-full lg:w-1/2 relative overflow-hidden">
          <AuthImage/>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout