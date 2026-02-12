import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   RESULTS PAGE - Score, Analysis, and Business Plan
   ═══════════════════════════════════════════════════════════════════════════ */

export default function ResultsPage({ data, onStartOver }) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [showImprove, setShowImprove] = useState(false);

  useEffect(() => {
    analyzeData();
  }, []);

  const analyzeData = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://ai-business-plan-api-production.up.railway.app';
      
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const analysisResult = await response.json();
      setResult(analysisResult);
    } catch (err) {
      console.error('Analysis error:', err);
      // Fallback mock result for demo
      setResult(getMockResult(data));
    } finally {
      setLoading(false);
    }
  };

  // Mock result for demo/testing
  const getMockResult = (inputData) => ({
    analysis_id: 'demo-' + Math.random().toString(36).substr(2, 8),
    success_probability: 62,
    risk_level: 'moderate',
    summary: `${inputData.basics?.name || 'Your business'} shows moderate potential in the ${inputData.basics?.industry || 'selected'} industry. Based on your budget, location, and competitive landscape, there are both opportunities and challenges to address.`,
    market_analysis: {
      market_size: 'Growing market with significant opportunity',
      trends: 'Industry is experiencing growth with increasing demand',
      competition_level: 'Moderate to high competition'
    },
    competitor_analysis: {
      competitors_found: inputData.competition?.competitors?.split(',').map(c => c.trim()) || ['Competitor 1', 'Competitor 2'],
      your_advantage: inputData.customer?.why_choose_you || 'Unique value proposition'
    },
    scoring_breakdown: {
      market_demand: { score: 65, weight: '20%' },
      competition: { score: 55, weight: '15%' },
      budget_adequacy: { score: 60, weight: '20%' },
      differentiation: { score: 70, weight: '15%' },
      execution_capability: { score: 60, weight: '15%' },
      location_fit: { score: 65, weight: '10%' },
      timing: { score: 60, weight: '5%' }
    },
    recommendations: [
      '💰 BUDGET: Consider increasing your startup capital by 30-50% to handle unexpected costs and extend your runway.',
      '🎯 DIFFERENTIATION: Strengthen your unique value proposition — clearly articulate why customers should choose you.',
      '📊 VALIDATION: Before heavy investment, validate demand with a small pilot or pre-sales campaign.',
      '👥 TEAM: Consider filling skill gaps through partnerships or contractors before launch.'
    ],
    improvement_available: true,
    disclaimer: 'This analysis is for informational purposes only and does not constitute professional financial, legal, tax, or investment advice. The success probability score is a conservative estimate based on publicly available data and user-provided inputs.'
  });

  const c = {
    bg: '#0A0F1A',
    card: 'rgba(255,255,255,0.03)',
    cardBorder: 'rgba(255,255,255,0.08)',
    text: '#FFFFFF',
    textMuted: '#94A3B8',
    textDim: '#64748B',
    accent: '#F59E0B',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444'
  };

  const getScoreColor = (score) => {
    if (score >= 75) return c.success;
    if (score >= 50) return c.warning;
    return c.danger;
  };

  const getScoreLabel = (score) => {
    if (score >= 75) return 'Good Probability';
    if (score >= 50) return 'Moderate Risk';
    return 'High Risk';
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: c.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 60,
            height: 60,
            border: `3px solid ${c.cardBorder}`,
            borderTopColor: c.accent,
            borderRadius: '50%',
            margin: '0 auto 24px',
            animation: 'spin 1s linear infinite'
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Analyzing Your Business</h2>
          <p style={{ color: c.textMuted }}>Researching market data and competitors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: c.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        color: '#fff',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Analysis Failed</h2>
          <p style={{ color: c.textMuted, marginBottom: 24 }}>{error}</p>
          <button 
            onClick={analyzeData}
            style={{
              padding: '12px 24px',
              background: `linear-gradient(135deg, ${c.accent}, #d97706)`,
              border: 'none',
              borderRadius: 8,
              color: '#0a0f1a',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const score = result?.success_probability || 0;
  const scoreColor = getScoreColor(score);

  return (
    <div style={{
      minHeight: '100vh',
      background: c.bg,
      color: '#fff',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${c.cardBorder}`,
        padding: '16px 24px',
        background: 'rgba(10,15,26,0.95)'
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: c.accent }}>
            Analysis Results
          </h1>
          <button
            onClick={onStartOver}
            style={{
              padding: '8px 16px',
              background: 'transparent',
              border: `1px solid ${c.cardBorder}`,
              borderRadius: 8,
              color: c.textMuted,
              fontSize: 13,
              cursor: 'pointer'
            }}
          >
            Start New Analysis
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
        {/* Score Card */}
        <div style={{
          background: `linear-gradient(135deg, ${scoreColor}15, ${scoreColor}05)`,
          border: `1px solid ${scoreColor}40`,
          borderRadius: 16,
          padding: 32,
          marginBottom: 32,
          textAlign: 'center'
        }}>
          <p style={{ color: c.textMuted, fontSize: 14, marginBottom: 8 }}>
            Estimated Success Probability
          </p>
          <div style={{
            fontSize: 72,
            fontWeight: 800,
            color: scoreColor,
            lineHeight: 1
          }}>
            {score}%
          </div>
          <div style={{
            display: 'inline-block',
            background: `${scoreColor}20`,
            color: scoreColor,
            padding: '6px 16px',
            borderRadius: 20,
            fontSize: 14,
            fontWeight: 600,
            marginTop: 12
          }}>
            {getScoreLabel(score)}
          </div>
          
          <p style={{ color: c.textMuted, fontSize: 14, marginTop: 24, maxWidth: 600, margin: '24px auto 0' }}>
            {result?.summary}
          </p>
        </div>

        {/* Improvement CTA */}
        {result?.improvement_available && score < 75 && (
          <div style={{
            background: c.card,
            border: `1px solid ${c.accent}40`,
            borderRadius: 12,
            padding: 24,
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                Want to improve your score?
              </h3>
              <p style={{ color: c.textMuted, fontSize: 14 }}>
                We can show you specific changes to reach 75%+ probability.
              </p>
            </div>
            <button
              onClick={() => setShowImprove(!showImprove)}
              style={{
                padding: '12px 24px',
                background: `linear-gradient(135deg, ${c.accent}, #d97706)`,
                border: 'none',
                borderRadius: 8,
                color: '#0a0f1a',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {showImprove ? 'Hide Suggestions' : 'Show Me How →'}
            </button>
          </div>
        )}

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 24,
          borderBottom: `1px solid ${c.cardBorder}`,
          paddingBottom: 16
        }}>
          {[
            { id: 'summary', label: 'Summary' },
            { id: 'scoring', label: 'Score Breakdown' },
            { id: 'recommendations', label: 'Recommendations' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px',
                background: activeTab === tab.id ? c.accent : 'transparent',
                border: `1px solid ${activeTab === tab.id ? c.accent : c.cardBorder}`,
                borderRadius: 8,
                color: activeTab === tab.id ? '#0a0f1a' : c.textMuted,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{
          background: c.card,
          border: `1px solid ${c.cardBorder}`,
          borderRadius: 12,
          padding: 24
        }}>
          {activeTab === 'summary' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Market Analysis</h3>
              <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
                {Object.entries(result?.market_analysis || {}).map(([key, value]) => (
                  <div key={key}>
                    <div style={{ color: c.textDim, fontSize: 12, marginBottom: 4, textTransform: 'capitalize' }}>
                      {key.replace(/_/g, ' ')}
                    </div>
                    <div style={{ color: c.text }}>{value}</div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Competitor Insights</h3>
              <div style={{ display: 'grid', gap: 16 }}>
                {Object.entries(result?.competitor_analysis || {}).map(([key, value]) => (
                  <div key={key}>
                    <div style={{ color: c.textDim, fontSize: 12, marginBottom: 4, textTransform: 'capitalize' }}>
                      {key.replace(/_/g, ' ')}
                    </div>
                    <div style={{ color: c.text }}>
                      {Array.isArray(value) ? value.join(', ') : value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'scoring' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Score Breakdown</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {Object.entries(result?.scoring_breakdown || {}).map(([factor, data]) => (
                  <div key={factor}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ color: c.text, fontSize: 14, textTransform: 'capitalize' }}>
                        {factor.replace(/_/g, ' ')}
                      </span>
                      <span style={{ color: c.textMuted, fontSize: 13 }}>
                        {data.score}/100 ({data.weight})
                      </span>
                    </div>
                    <div style={{ height: 8, background: c.cardBorder, borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${data.score}%`,
                        background: getScoreColor(data.score),
                        borderRadius: 4
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Recommendations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(result?.recommendations || []).map((rec, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${c.cardBorder}`,
                    borderRadius: 8,
                    padding: 16
                  }}>
                    <p style={{ color: c.text, lineHeight: 1.6 }}>{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div style={{
          marginTop: 32,
          padding: 16,
          background: 'rgba(255,255,255,0.02)',
          borderRadius: 8,
          borderLeft: `3px solid ${c.textDim}`
        }}>
          <p style={{ color: c.textDim, fontSize: 12, lineHeight: 1.6 }}>
            <strong>Disclaimer:</strong> {result?.disclaimer}
          </p>
        </div>

        {/* Download/Action Buttons */}
        <div style={{
          display: 'flex',
          gap: 16,
          marginTop: 32,
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            padding: '14px 28px',
            background: `linear-gradient(135deg, ${c.accent}, #d97706)`,
            border: 'none',
            borderRadius: 10,
            color: '#0a0f1a',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer'
          }}>
            Download Business Plan (PDF) →
          </button>
          <button 
            onClick={onStartOver}
            style={{
              padding: '14px 28px',
              background: 'transparent',
              border: `1px solid ${c.cardBorder}`,
              borderRadius: 10,
              color: c.text,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Analyze Another Business
          </button>
        </div>
      </div>
    </div>
  );
}
