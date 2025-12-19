"use client";

import { useConvexAuth } from "convex/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import SearchInput from "./SearchInput";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <a href="/" className="text-2xl font-bold">
              Next.js 16
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/create">Create</Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-2">
            <div className="hidden md:block mr-2">
              <SearchInput />
            </div>
            {isLoading ? null : isAuthenticated ? (
              <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        toast.success("You have been signed out.");
                        router.push("/");
                      },
                      onError: (error) => {
                        toast.error(error.error.message);
                      },
                    },
                  })
                }
              >
                Logout
              </Button>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "default" })}
                >
                  Login
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button type="button" onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t flex flex-col">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/create">Create</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
