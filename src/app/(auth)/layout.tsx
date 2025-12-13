import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen max-w-md mx-auto">
      <div className="absolute top-4 left-4 ">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </div>
      {children}
    </div>
  );
}
