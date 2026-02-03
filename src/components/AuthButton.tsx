"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function AuthButton() {
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        setUser(null);
    };

    if (loading) {
        return <div className="btn" style={{ visibility: 'hidden' }}>Loading...</div>; // Prevent layout shift
    }

    return user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                {user.user_metadata.full_name || user.email?.split('@')[0]}님
            </span>
            <button
                onClick={handleLogout}
                className="btn"
                style={{ fontSize: '14px', padding: '8px 16px', border: '1px solid var(--border-light)' }}
            >
                로그아웃
            </button>
        </div>
    ) : (
        <button
            onClick={handleLogin}
            className="btn btn-primary"
            style={{ fontSize: '14px', padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
            <span style={{ fontSize: '16px' }}>G</span> Google로 시작하기
        </button>
    );
}
