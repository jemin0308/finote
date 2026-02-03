export default function Footer() {
    return (
        <footer style={{ backgroundColor: 'var(--color-primary)', color: '#fff', padding: '60px 0' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
                    <div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>
                            Finote
                        </div>
                        <p style={{ lineHeight: '1.6', fontSize: '14px', maxWidth: '300px' }}>
                            데이터로 증명하는 금융의 미래.<br />
                            AI가 분석한 가장 완벽한 리포트를 만나보세요.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '60px' }}>
                        <div>
                            <h4 style={{ fontWeight: 'bold', marginBottom: '20px', color: 'var(--color-gold)' }}>Service</h4>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}>
                                <li><a href="#" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Morning Report</a></li>
                                <li><a href="#" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Global Analysis</a></li>
                                <li><a href="#" style={{ color: '#cbd5e1', textDecoration: 'none' }}>B2B Solution</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 'bold', marginBottom: '20px', color: 'var(--color-gold)' }}>Contact</h4>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}>
                                <li>hello@finote.com</li>
                                <li>02-1234-5678</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                    <div>© 2026 Finote. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
