"use client";

import { useState, useEffect, useRef } from 'react';
import InquiryModal from './ui/InquiryModal';
import EmailForm from './ui/EmailForm';
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";

const TOSS_CLIENT_KEY = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq"; // Test Key
const TOSS_CUSTOMER_KEY = "YW5vbnltb3Vz"; // Anonymous customer key

export default function Pricing({ country = 'KR' }: { country?: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance | null>(null);
    const [isPaying, setIsPaying] = useState(false);
    const [isWidgetReady, setIsWidgetReady] = useState(false);
    const [isRendering, setIsRendering] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const isKR = country === 'KR';
    const basicPrice = isKR ? "9,900원" : "$9.99";
    const basicLink = isKR ? "#" : "https://lemonsqueezy.com/";

    // Phase 1: Pre-load the script only
    useEffect(() => {
        if (isKR && !paymentWidget) {
            loadPaymentWidget(TOSS_CLIENT_KEY, TOSS_CUSTOMER_KEY).then(setPaymentWidget);
        }
    }, [isKR, paymentWidget]);

    // Phase 2: Render UI components ONLY when isPaying is active and and divs are visible
    useEffect(() => {
        if (isPaying && paymentWidget && !isWidgetReady && !isRendering) {
            const renderWidget = async () => {
                setIsRendering(true);
                try {
                    // Ensure divs are rendered by React before calling this (small delay for DOM sync)
                    await new Promise(resolve => setTimeout(resolve, 100));

                    await Promise.all([
                        paymentWidget.renderPaymentMethods("#payment-method", { value: 9900 }),
                        paymentWidget.renderAgreement("#agreement")
                    ]);

                    setIsWidgetReady(true);
                    setErrorMessage("");
                } catch (err: any) {
                    console.error("Widget render failed:", err);
                    setErrorMessage("결제 시스템 로딩 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
                } finally {
                    setIsRendering(false);
                }
            };
            renderWidget();
        }
    }, [isPaying, paymentWidget, isWidgetReady, isRendering]);

    const handleTossPayment = async () => {
        if (!paymentWidget || !isWidgetReady) return;

        setErrorMessage("");
        try {
            await paymentWidget.requestPayment({
                orderId: `ORDER-${new Date().getTime()}`,
                orderName: "Finote Basic Subscription",
                customerName: "Anonymous User",
                successUrl: `${window.location.origin}/success`,
                failUrl: `${window.location.origin}/fail`,
            });
        } catch (err: any) {
            console.error("Payment failed:", err);
            // If rendering error occurs during request, force re-render
            if (err.message?.includes("렌더링")) {
                setIsWidgetReady(false);
                setErrorMessage("결제 UI 로딩이 지연되고 있습니다. 잠시만 기다려주세요.");
            } else {
                setErrorMessage(err.message || "결제 중 오류가 발생했습니다.");
            }
        }
    };

    const cards = [
        {
            title: "Free",
            price: "0원",
            period: "/ 평생 무료",
            desc: "매일 아침 7시, 꼭 읽어야 할 시장 요약.",
            features: [
                "🇺🇸🇰🇷 매일 아침 7시 요약 메일",
                "주요 경제 일정 캘린더",
                "광고 포함"
            ],
            cta: "무료로 시작하기",
            isPrimary: false,
            isVip: false
        },
        {
            title: "Basic",
            price: basicPrice,
            period: "/ 월",
            desc: "오전 7시, 깊이가 다른 인사이트",
            features: [
                "모든 Free 기능 포함",
                "📂 주간 심층 리포트 (PDF)",
                "🇺🇸 월가 헤지펀드 동향 분석",
                "🇰🇷 산업별(반도체/2차전지) 심층 분석",
                "광고 제거"
            ],
            cta: "지금 구독 시작하기",
            isPrimary: true,
            isVip: false
        },
        {
            title: "VIP (B2B)",
            price: "문의",
            period: "/ 별도 협의",
            desc: "전문가를 위한 강력한 영업 무기",
            features: [
                "모든 Basic 기능 포함",
                "👔 내 이름/로고가 박힌 리포트 생성",
                "🏠 동네 부동산 맞춤형 분석 자료",
                "설계사/공인중개사 전용 대시보드",
                "주 1회 1:1 마케팅 컨설팅"
            ],
            cta: "샘플 신청하기",
            isPrimary: false,
            isVip: true
        }
    ];

    return (
        <section id="pricing" className="section" style={{ backgroundColor: 'var(--bg-page)' }}>
            <div className="container" style={{ position: 'relative' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--color-primary)' }}>
                        성공의 기준을 바꾸는 데이터 인사이트
                    </h2>
                    <p style={{ fontSize: '18px', color: 'var(--text-muted)' }}>
                        매일 오전 7시, 당신의 메일함으로 가장 완벽한 금융 리포트가 찾아갑니다.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px'
                }}>
                    {cards.map((card, index) => (
                        <div key={index} style={{
                            backgroundColor: card.isVip ? 'var(--bg-vip)' : '#fff',
                            color: card.isVip ? '#fff' : 'var(--text-main)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '40px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            border: card.isPrimary ? '2px solid var(--color-primary)' : '1px solid var(--border-light)',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {card.isPrimary && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'var(--color-primary)',
                                    color: '#fff',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>
                                    MOST POPULAR
                                </div>
                            )}

                            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{card.title}</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '20px' }}>
                                <span style={{ fontSize: '36px', fontWeight: '800' }}>{card.price}</span>
                                <span style={{ fontSize: '14px', color: card.isVip ? '#94a3b8' : 'var(--text-muted)', marginLeft: '8px' }}>{card.period}</span>
                            </div>
                            <p style={{ marginBottom: '30px', fontSize: '15px', color: card.isVip ? '#cbd5e1' : 'var(--text-muted)' }}>
                                {card.desc}
                            </p>

                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', flex: 1 }}>
                                {card.features.map((feature, i) => (
                                    <li key={i} style={{
                                        marginBottom: '12px',
                                        fontSize: '15px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}>
                                        <span style={{ color: card.isVip ? 'var(--color-secondary)' : 'var(--color-primary)' }}>✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {card.isVip ? (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className='btn btn-gold'
                                    style={{ width: '100%', border: 'none' }}
                                >
                                    {card.cta}
                                </button>
                            ) : card.title === "Free" ? (
                                <EmailForm isMinimal={false} buttonText="무료 구독하기" />
                            ) : (
                                <div style={{ marginTop: 'auto' }}>

                                    {isKR && isPaying && (
                                        <div style={{
                                            backgroundColor: '#f8fafc',
                                            padding: '16px',
                                            borderRadius: '12px',
                                            marginBottom: '20px',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            <div id="payment-method" style={{ minHeight: '300px' }} />
                                            <div id="agreement" />
                                        </div>
                                    )}

                                    {errorMessage && (
                                        <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '10px', textAlign: 'center' }}>
                                            ⚠️ {errorMessage}
                                        </div>
                                    )}

                                    {isKR ? (
                                        <button
                                            onClick={() => {
                                                if (isWidgetReady) {
                                                    handleTossPayment();
                                                } else {
                                                    setIsPaying(true);
                                                }
                                            }}
                                            className='btn btn-primary'
                                            disabled={isPaying && !isWidgetReady}
                                            style={{ width: '100%', border: 'none' }}
                                        >
                                            {isPaying
                                                ? (isWidgetReady ? '결제 요청하기' : '결제 시스템 준비 중...')
                                                : card.cta}
                                        </button>
                                    ) : (
                                        <a
                                            href={basicLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='btn btn-primary'
                                            style={{
                                                width: '100%',
                                                border: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            {card.cta}
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
