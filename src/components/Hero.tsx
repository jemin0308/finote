"use client";

import { useState } from 'react';
import InquiryModal from './ui/InquiryModal';

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="section" style={{ paddingBottom: '40px' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '20px', color: 'var(--color-secondary)', fontWeight: '600' }}>
                    AI 기반 초개인화 금융 비서
                </div>
                <h1 style={{
                    fontSize: '48px',
                    fontWeight: '800',
                    marginBottom: '24px',
                    color: 'var(--color-primary)',
                    letterSpacing: '-1px'
                }}>
                    당신의 투자를 지키는<br />
                    <span style={{ color: 'var(--color-accent)' }}>가장 완벽한 리포트</span>
                </h1>
                <p style={{
                    fontSize: '18px',
                    color: 'var(--text-muted)',
                    marginBottom: '40px',
                    maxWidth: '600px',
                    margin: '0 auto 40px'
                }}>
                    매일 쏟아지는 수천 개의 뉴스, AI가 검증하고 요약합니다.<br />
                    미국 월가부터 한국 여의도까지, 3분이면 충분합니다.
                </p>

                {/* Market Split Visual */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginBottom: '60px',
                    flexWrap: 'wrap'
                }}>
                    {/* US Market Card */}
                    <div style={{
                        background: '#fff',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '24px',
                        width: '280px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                        textAlign: 'left'
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🇺🇸</div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>미국 증시 (Wall St.)</h3>
                        <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-muted)' }}>
                            <li>엔비디아/테슬라 실시간 이슈</li>
                            <li>Fed 금리 결정 분석</li>
                            <li>빅테크 실적 요약</li>
                        </ul>
                    </div>

                    {/* KR Market Card */}
                    <div style={{
                        background: '#fff',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '24px',
                        width: '280px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                        textAlign: 'left'
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🇰🇷</div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>한국 증시 (K-Market)</h3>
                        <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-muted)' }}>
                            <li>반도체/2차전지 수급 분석</li>
                            <li>코스피/코스닥 외국인 동향</li>
                            <li>부동산 PF 리스크 점검</li>
                        </ul>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn btn-primary"
                        style={{ padding: '16px 32px', fontSize: '16px' }}
                    >
                        무료 리포트 받아보기
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn btn-gold"
                        style={{ padding: '16px 32px', fontSize: '16px' }}
                    >
                        VIP 영업자료 샘플 신청
                    </button>
                </div>
            </div>

            <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
