"use client";

import logo from "@/../public/logo-blog.png";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useAuthStore } from "@/store/auth.store";
import Image from "next/image";
import Link from "next/link";
import {
  FaPen,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaUserCircle,
} from "react-icons/fa";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { logoutUser } from "@/lib/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { name: "Food", href: "/?cat=food" },
  { name: "Design", href: "/?cat=design" },
  { name: "Cinema", href: "/?cat=cinema" },
  { name: "Science", href: "/?cat=science" },
  { name: "Art", href: "/?cat=art" },
  { name: "Tech", href: "/?cat=technology" },
];

const navLinkClasses =
  "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors text-sm md:text-base";

export function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  // TODO: Implement actual logout logic
  const handleLogout = async () => {
    try {
      // Add logout logic here
      await logoutUser();
      logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to logout";
      toast.error(message);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Blog Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2 md:gap-2 flex-wrap mx-4">
            <NavigationMenu className="md:hidden">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm px-2 hover:cursor-pointer font-normal text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col p-4 gap-2 rounded-md">
                    {CATEGORIES.map((category) => (
                      <Link
                        href={category.href}
                        key={category.href}
                        className={`${navLinkClasses}`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="hidden md:flex items-center gap-2 border-r border-gray-200 dark:border-gray-700 pr-2">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className={navLinkClasses}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            {isAuthenticated ? (
              <>
                <Link
                  href="/write"
                  className={`flex items-center ${navLinkClasses}`}
                  title="Write a post"
                >
                  <FaPen className="mr-1" />
                  Write
                </Link>
                <Link
                  href="/dashboard"
                  className={`flex items-center ${navLinkClasses}`}
                  title="Go to dashboard"
                >
                  <FaUserCircle className="mr-1" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className={`flex items-center ${navLinkClasses} cursor-pointer`}
                  title="Logout"
                >
                  <FaSignOutAlt className="mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`flex items-center ${navLinkClasses}`}
                  title="Login"
                >
                  <FaSignInAlt className="mr-1" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`flex items-center ${navLinkClasses}`}
                  title="Register"
                >
                  <FaUserPlus className="mr-1" />
                  Register
                </Link>
              </>
            )}
            <div className="border-l border-gray-200 dark:border-gray-700 pl-2 md:pl-4 ml-2 md:ml-4">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
