import { LoginForm } from "@/components/global/LoginForm";
import { TipsterchatLogoBlack } from "@/components/global/TipsterChatDarkLogo";
import RandomImage from '@/components/RandomImage';

export default function SignIn() {

  const handleGoogleLogin = () => {
    alert('Era mi primerito dia');
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12 h-screen">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 flex items-center justify-center">
            <TipsterchatLogoBlack />
          </div>
          <LoginForm />
        </div>
      </div>

      <div className="hidden lg:block relative">
        <RandomImage />
      </div>
    </div>
  );
}
