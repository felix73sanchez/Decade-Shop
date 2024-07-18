import { logoFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className={`px-6 py-7  w-full h-screen overflow-hidden bg-colorPrimary`}>
      <div className="w-full h-full p-3 flex flex-col lg:flex-row rounded-brImg shadow-customBS border-customBC border-2 bg-colorSecondary">
        <div className="hidden lg:flex relative flex-col justify-center items-center w-1/2 h-full rounded-brImg shadow-customBS ">
          <img src="/gridimg/6.jpg" alt="Marca" className="absolute w-full h-full object-cover  rounded-brImg "/>
        </div>
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 h-full lg:h-screen ">
          <div className="relative z-10 flex flex-col justify-center items-center -top-12 w-full">
            <h1 className={`${logoFont.className} font-fw9 italic text-5xl text-colorPrimary `}>DECAVENTURE</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
