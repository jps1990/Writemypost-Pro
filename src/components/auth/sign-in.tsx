import { Link } from 'react-router-dom';
import { AuthForm } from './auth-form';
import { SEO } from '@/components/seo';

export function SignIn() {
  return (
    <>
      <SEO 
        title="Connexion - WriteMyPost.pro"
        description="Connectez-vous à votre compte WriteMyPost.pro pour créer du contenu optimisé pour vos réseaux sociaux."
      />
      <div className="container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            WriteMyPost.pro
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <AuthForm mode="signin" />
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="underline hover:text-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}