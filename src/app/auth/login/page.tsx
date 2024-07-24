
import { LoginForm } from './ui/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <>
      <div className={`px-6 py-6 w-full h-screen overflow-hidden bg-colorPrimary uppercase`}>
        <div className="w-full h-full p-3 flex flex-col lg:flex-row rounded-brImg shadow-customBS border-customBC border-2 bg-colorSecondary">
          <div className="hidden lg:flex relative flex-col justify-center items-center w-1/2 h-full rounded-brImg shadow-customBS">
            <Image 
              src="/gridimg/6.jpg" 
              alt="Marca" 
              width={2000} 
              height={2000} 
              className="absolute w-auto h-full object-cover rounded-brImg" 
              priority
            />
          </div>
          <div className="flex flex-col justify-center items-center w-full lg:w-1/2 h-full hmovileS:py-12 hmovileM:py-16 hmovileL:py-28 htablet:py-40 hlaptop:py-80 hdesktop:py-96 movileS:px-4 movileM:px-8 movileL:px-10         tablet:px-40 laptop:px-20 desktop:px-20">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
