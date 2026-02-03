import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function VipLoungePage() {
    const supabase = await createClient();

    // (1) Check session
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user || authError) {
        // If not logged in, redirect to home or login
        redirect("/");
    }

    // (2) Check subscription status in profiles table
    const { data: profile, error: dbError } = await supabase
        .from("profiles")
        .select("is_subscribed")
        .eq("id", user.id)
        .single();

    if (dbError || !profile?.is_subscribed) {
        // If not subscribed, redirect to pricing
        redirect("/#pricing");
    }

    // (3) If authorized, show the premium content
    return (
        <div className="container" style={{ padding: '80px 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <span style={{
                    backgroundColor: 'var(--color-secondary)',
                    color: '#000',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    display: 'inline-block'
                }}>VIP LOUNGE</span>
                <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px' }}>
                    당신만을 위한 프리미엄 인사이트
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-muted)' }}>
                    Finote Basic 구독자 회원님, 환영합니다. 오늘자 심층 리포트를 확인하세요.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px'
            }}>
                {/* Mock Premium Reports */}
                {[
                    { date: "2026.02.04", title: "[심층] 엔비디아 실적 발표 대기, 반도체 섹터 전략", type: "PDF Report" },
                    { date: "2026.02.03", title: "[주간] 2월 1주차 글로벌 거시경제 전망", type: "Analysis" },
                    { date: "2026.02.02", title: "[섹터] 국내 부동산 PF 리스크와 금융권 영향 분석", type: "PDF Report" }
                ].map((report, i) => (
                    <div key={i} style={{
                        backgroundColor: '#fff',
                        padding: '30px',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <span style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: '600' }}>{report.date}</span>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '12px 0' }}>{report.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{report.type}</p>
                        </div>
                        <button className="btn btn-primary" style={{ marginTop: '20px', width: '100%' }}>
                            다운로드 (PDF)
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
