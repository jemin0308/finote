"use client";

import { useState } from 'react';

export default function InquiryModal({
    isOpen,
    onClose
}: {
    isOpen: boolean,
    onClose: () => void
}) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Construct mailto link
        // Replace 'your-email@gmail.com' with the actual user email if known, or leave as placeholder
        const recipient = "finote.official@gmail.com";
        const subject = `[Finote VIP 문의] ${formData.name}님의 샘플 신청`;
        const body = `성함/회사명: ${formData.name}\n연락처: ${formData.phone}\n이메일: ${formData.email}\n\n문의내용:\n${formData.message}`;

        const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open email client in a new tab/window for better stability
        window.open(mailtoUrl, '_blank');

        setStatus('success');

        // Optional: Close after a delay
        setTimeout(() => {
            onClose();
            setStatus('idle');
            setFormData({ name: '', phone: '', email: '', message: '' });
        }, 3000);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }} onClick={onClose}>
            <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: 'var(--radius-lg)',
                width: '100%',
                maxWidth: '500px',
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>

                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer'
                }}>×</button>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>✉️</div>
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>문의가 신청되었습니다!</h3>
                        <p style={{ color: 'var(--text-muted)' }}>이메일 클라이언트가 열리지 않았다면,<br />직접 finote.official@gmail.com으로 연락주세요.</p>
                    </div>
                ) : (
                    <>
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-primary)' }}>
                            B2B 파트너십 문의
                        </h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                            설계사/공인중개사 전용 영업 자료 샘플을 보내드립니다.<br />
                            정보를 남겨주시면 담당자가 메일로 연락드립니다.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <input
                                type="text"
                                placeholder="성함 (또는 회사명)"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                style={{ padding: '12px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                            />
                            <input
                                type="tel"
                                placeholder="연락처 (010-0000-0000)"
                                required
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                style={{ padding: '12px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                            />
                            <input
                                type="email"
                                placeholder="이메일 주소"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                style={{ padding: '12px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                            />

                            <textarea
                                placeholder="문의 내용 (예: 동네 부동산 리포트 샘플 보고 싶습니다)"
                                rows={4}
                                required
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                style={{ padding: '12px', borderRadius: '4px', border: '1px solid #e2e8f0', resize: 'none' }}
                            ></textarea>

                            <button type="submit" className="btn btn-gold" style={{ marginTop: '8px' }}>
                                VIP 샘플 신청 (메일 보내기)
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
