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
                    <a href="#" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: '500' }}>뉴스레터</a>
                    <a href="#" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: '500' }}>VIP 솔루션</a>
                    <AuthButton />
                </nav>
            </div>
        </header>
    );
}
