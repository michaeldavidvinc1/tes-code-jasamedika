import { useEffect, useState } from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Link } from '@inertiajs/react';

const Navbar = ({ auth }) => {

    const [header, setHeader] = useState(false);

    useEffect(() => {
        const scrollYPos = window.addEventListener('scroll', () => {
            window.scrollY > 50 ? setHeader(true) : setHeader(false);
        });
        return () => window.removeEventListener('scroll', scrollYPos)
    })

    return (
        <header className={`${header ? 'py-4 bg-white shadow-lg dark:bg-accent' : 'py-6 bg-gray-100'} sticky top-0 z-30 transition-all`}>
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <Logo />
                    <Nav auth={auth} />
                    <div>
                        {auth ? (
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
                                        {auth && auth.role === "ADMIN" && (
                                            <DropdownMenuItem>
                                                <Link href={route("admin.page")}>
                                                    Admin Page
                                                </Link>
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>History</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link method="post" href={route('logout')}>
                                                Logout
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Button variant="secondary" size="sm">
                                    <Link href={route("login")}>
                                        Login
                                    </Link>
                                </Button>
                                <Button size="sm">
                                    <Link href={route("register")}>
                                        Register
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;