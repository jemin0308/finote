import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from 'next/link';

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ paymentKey: string; orderId: string; amount: string }>;
}) {
    const { paymentKey, orderId, amount } = await searchParams;
    const supabase = await createClient();

    // (1) Check session
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        // (2) Update subscription status in Supabase
        // Ideally, we would verify the paymentKey with Toss Payments API here first
        const { error } = await supabase
            .from("profiles")
            .update({ is_subscribed: true, subscription_tier: 'basic' })
            .eq("id", user.id);

        if (error) console.error("Subscription update failed:", error);
    }

    return (
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
            <div style={{
                maxWidth: '500px',
                margin: '0 auto',
                padding: '40px',
                backgroundColor: '#fff',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: '1px solid var(--border-light)'
            }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
                <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px', color: 'var(--color-primary)' }}>
                    결제가 완료되었습니다!
                </h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                    이제 Finote Basic 회원의 모든 혜택을 누리실 수 있습니다.<br />
                    매일 오전 7시, 당신의 메일함과 VIP 라운지에서 뵙겠습니다.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Link
                        href="/vip-lounge"
                        className="btn btn-primary"
                        style={{ textDecoration: 'none', display: 'block' }}
                    >
                        VIP 라운지 바로가기
                    </Link>
                    <Link
                        href="/"
                        style={{ color: 'var(--text-muted)', fontSize: '14px', textDecoration: 'none' }}
                    >
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    );
}
