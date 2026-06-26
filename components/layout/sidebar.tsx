"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Missions", href: "/dashboard/missions" },
  { name: "Goals", href: "/dashboard/goals" },
  { name: "Projects", href: "/dashboard/projects" },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (
    <aside className="w-64 border-r min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">
        Rairgniser
      </h1>

      <nav className="space-y-2">
        {links.map((link : any) => (
          <Link
            key={link.href}
            href={link.href}
            className={`
              block rounded-lg px-3 py-2 transition
              ${
                pathname.startsWith(link.href)
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }
              `}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}