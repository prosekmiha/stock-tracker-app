'use client'

import { NAV_ITEMS } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import SearchDialog from "./SearchDialog"

const NavItems = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map((item) => (
        <li key={item.label}>
          {item.label === 'Search' ? (
            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:text-yellow-500 transition-colors">
                  {item.label}
                </button>
              </DialogTrigger>

              <SearchDialog />
            </Dialog>
          ) : (
            <Link
              href={item.href!}
              className={`hover:text-yellow-500 transition-colors ${
                isActive(item.href!) ? 'text-gray-100' : ''
              }`}
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

export default NavItems
