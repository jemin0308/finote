"use client";

import { useState } from 'react';

export default function EmailForm({
    placeholder = "이메일 주소를 입력하세요",
    buttonText = "무료 리포트 받기",
    isMinimal = false
}: {
    placeholder?: string,
    buttonText?: string,
    isMinimal?: boolean
}) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call to Stibee/Newsletter Service
        setTimeout(() => {
            console.log(`Subscribed: ${email}`);
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div style={{
                color: 'var(--color-secondary)',
                fontWeight: 'bold',
                padding: '12px',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
            }}>
                🎉 감사합니다! 매일 오전 7시에 메일함으로 찾아가겠습니다.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: isMinimal ? 'row' : 'column',
            gap: '10px',
            maxWidth: '400px',
            margin: '0 auto'
        }}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    fontSize: '16px',
                    outline: 'none'
                }}
            />
            <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'loading'}
                style={{
                    whiteSpace: 'nowrap',
                    opacity: status === 'loading' ? 0.7 : 1
                }}
            >
                {status === 'loading' ? '처리 중...' : buttonText}
            </button>
        </form>
    );
}
