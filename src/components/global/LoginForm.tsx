"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SpinnerLoader } from "@/components/global/Spinner";

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true); // Set loading to true

        try {
            const basicToken = btoa(`${username}:${password}`);

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ basicToken })
            });

            if (response.ok) {
                router.push('/dashboard');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
                setLoading(false); // Set loading to false on error
            }
        } catch (error) {
            setError('An unexpected error occurred');
            setLoading(false); // Set loading to false on error
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="tipster@tipsterchat.com"
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                    <div className="flex space-x-2 items-center justify-center">
                        <span>Loading...</span>
                        <SpinnerLoader />
                    </div>
                ) : (
                    'Login'
                )}
            </Button>
        </form>
    );
}
