import AuthButton from '@/components/AuthButton';

export default function Header() {
    return (
        <header style={{
            borderBottom: '1px solid var(--border-light)',
            padding: '20px 0',
            backgroundColor: '#fff',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-primary)', letterSpacing: '-0.5px' }}>
                    Finote
                </div>
                <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <a href="/" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: '500' }}>홈</a>
                    <a href="/vip-lounge" style={{ textDecoration: 'none', color: 'var(--color-secondary)', fontWeight: '700' }}>VIP 라운지</a>
                    <AuthButton />
                </nav>
            </div>
        </header>
    );
}
