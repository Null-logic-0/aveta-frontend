import { twMerge } from "tailwind-merge";
import ImageCarousel from "../UI/ImageCarousel";
import Logo from "../UI/Logo";

type AuthLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <main
      className={twMerge(
        "flex max-lg:flex-col items-center gap-4 justify-center lg:h-screen  p-4",
        className
      )}
    >
      <div className="lg:hidden">
        <Logo />
      </div>
      {children}
      <ImageCarousel />
    </main>
  );
}

export default AuthLayout;
