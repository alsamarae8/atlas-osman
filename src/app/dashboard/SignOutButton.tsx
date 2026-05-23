"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm text-[#4A3728] hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
    >
      <LogOut size={15} />
      Sign Out
    </button>
  );
}
