"use client";

import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import { logout } from '@/app/actions/logout';
// @ts-ignore
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

export const UserMenu = () => {
    const [name, setName] = useState('');
    const router = useRouter();

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            const user = JSON.parse(userCookie);
            setName(user.username);
        }
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild
                className="hover:cursor-pointer">
                <div className="flex items-center space-x-2 text-xs text-gray-800">
                    <span>{name}</span>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUser className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="hover:cursor-pointer"
                    onClick={handleLogout}
                >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
