
import NavLink from "@/Components/NavLink"
import { Avatar, AvatarImage } from "@/Components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Link } from "@inertiajs/react"
import { useEffect, useState } from "react";

export default function AdminLayout({ auth, children }) {

    const [header, setHeader] = useState(false);

    useEffect(() => {
        const scrollYPos = window.addEventListener('scroll', () => {
            window.scrollY > 50 ? setHeader(true) : setHeader(false);
        });
        return () => window.removeEventListener('scroll', scrollYPos)
    })

    return (
        <div className="h-[100%]">
            <header className={`${header ? 'py-4 bg-white shadow-lg dark:bg-accent' : 'py-6'} sticky top-0 z-30 transition-all`}>
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <Link href='/' className='flex gap-2 text-lg font-bold'>
                            <img src='/assets/logo.svg' width={20} />
                            PrimeDriveLux <span className="font-light">Dashboard</span>
                        </Link>
                        <nav className="items-center hidden xl:flex gap-x-8">
                            <NavLink href={route('admin.page')} active={route().current('admin.page')}>
                                Dashboard
                            </NavLink>
                            <NavLink href={route('car.page')} active={route().current('car.page')}>
                                Car
                            </NavLink>
                            <NavLink href={route('transaction.page')} active={route().current('transaction.page')}>
                                Transaction
                            </NavLink>
                            <NavLink href={route('order.page')} active={route().current('order.page')}>
                                Orders
                            </NavLink>
                            <NavLink href={route('user.page')} active={route().current('user.page')}>
                                Users
                            </NavLink>
                        </nav>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src={auth.avatar ? auth.avatar : "/assets/no_avatar.png"} />
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>{auth.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href={route("home")}>
                                            Web Page
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link method="post" href={route('logout')}>
                                            Logout
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>
            {children}
        </div>
    )
}