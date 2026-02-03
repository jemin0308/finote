"use client";

import { createClient } from "@/utils/supabase/client";

export default function LoginButton() {
    const supabase = createClient();

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <button
            onClick={handleLogin}
            className="btn btn-primary"
            style={{ padding: '8px 20px', fontSize: '14px' }}
        >
            Google로 시작하기
        </button>
    );
}
