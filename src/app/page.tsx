import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";

import { headers } from "next/headers";

export default async function Home() {
  const headersList = await headers();
  const country = headersList.get('x-user-country') || 'KR';

  return (
    <>
      <Hero />

      {/* Features Section (Inline) */}
      <section id="features" className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--color-primary)' }}>
              금융 리포트, 어떻게 만들어지나요?
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--text-muted)' }}>
              전 세계 10만 개 뉴스를 분석해 가장 완벽한 한 장의 리포트로 만듭니다.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            textAlign: 'left'
          }}>
            {/* Step 1 */}
            <div style={{ padding: '24px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'rgba(59, 130, 246, 0.1)',
                color: 'var(--color-accent)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom: '20px'
              }}>1</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Global Data 수집</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                블룸버그, 로이터, 네이버 금융 등 전 세계 주요 뉴스를
                실시간으로 수집합니다. (API 연동)
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ padding: '24px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'rgba(212, 175, 55, 0.1)',
                color: 'var(--color-secondary)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom: '20px'
              }}>2</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>NotebookLM 분석</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                구글의 초거대 AI가 방대한 데이터를 읽고,
                핵심만 뽑아내어 요약하고 정리합니다.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ padding: '24px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'rgba(15, 23, 42, 0.1)',
                color: 'var(--color-primary)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom: '20px'
              }}>3</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Premium 리포트 생성</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                보기 편한 PDF로 자동 변환되어 매일 아침
                당신의 메일함으로 배달됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Pricing country={country} />
    </>
  );
}
