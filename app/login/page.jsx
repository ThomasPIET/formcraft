import { LoginForm } from "@/components/login-form";
import { login } from "@/lib/user-services";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 border-b-gray-300 bg-white border w-full top-0 z-50">
        <div className="mx-10 flex justify-between">
          <p className="text-2xl font-cdbold">FORMCRAFT</p>
        </div>
      </header>
      <div className="flex flex-1 w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm loginAction={login} />
        </div>
      </div>
    </div>
  );
}
