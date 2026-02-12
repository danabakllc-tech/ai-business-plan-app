import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../App'

export default function Results() {
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [showImprove, setShowImprove] = useState(false)
  const [improvements, setImprovements] = useState(null)
  const [loadingImprove, setLoadingImprove] = useState(false)
  const [generatingPlan, setGeneratingPlan] = useState(false)
  const [businessPlan, setBusinessPlan] = useState(null)
  
  useEffect(() => {
    const stored = localStorage.getItem('analysisResult')
    if (stored) {
      setResult(JSON.parse(stored))
    } else {
      navigate('/start')
    }
  }, [navigate])

  const handleGetImprovements = async () => {
    setLoadingImprove(true)
    try {
      const response = await fetch(`${API_URL}/improve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysis_id: result.analysis_id,
          current_score: result.success_probability,
          target_score: 75
        })
      })
      const data = await response.json()
      setImprovements(data)
      setShowImprove(true)
    } catch (err) {
      console.error('Failed to get improvements:', err)
    } finally {
      setLoadingImprove(false)
    }
  }

  const handleGeneratePlan = async () => {
    setGeneratingPlan(true)
    try {
      const inputs = JSON.parse(localStorage.getItem('businessInputs') || '{}')
      const response = await fetch(`${API_URL}/generate-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      })
      const data = await response.json()
      setBusinessPlan(data)
    } catch (err) {
      console.error('Failed to generate plan:', err)
    } finally {
      setGeneratingPlan(false)
    }
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  const score = result.success_probability
  const riskLevel = result.risk_level
  const interpretation = result.scoring_breakdown?.interpretation || {}
  
  // Color based on score
  const getScoreColor = () => {
    if (score >= 75) return 'text-green-500'
    if (score >= 50) return 'text-yellow-500'
    return 'text-red-500'
  }
  
  const getScoreBg = () => {
    if (score >= 75) return 'from-green-500/20 to-green-500/5 border-green-500/30'
    if (score >= 50) return 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30'
    return 'from-red-500/20 to-red-500/5 border-red-500/30'
  }

  const getRiskLabel = () => {
    if (score >= 75) return { label: 'Good Probability', color: 'text-green-400 bg-green-500/10 border-green-500/30' }
    if (score >= 50) return { label: 'Moderate Risk', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' }
    return { label: 'High Risk', color: 'text-red-400 bg-red-500/10 border-red-500/30' }
  }

  const risk = getRiskLabel()

  return (
    <div className="min-h-screen bg-dark-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Score Card */}
        <div className={`card bg-gradient-to-b ${getScoreBg()} mb-8 text-center`}>
          <p className="text-dark-400 text-sm mb-4">Your Success Probability Score</p>
          
          {/* Score Circle */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-dark-800"
              />
              {/* Score circle */}
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className={getScoreColor()}
                strokeDasharray={`${score * 2.83} 283`}
                style={{ transition: 'stroke-dasharray 1.5s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${getScoreColor()}`}>{score}</span>
              <span className="text-dark-400 text-sm">out of 100</span>
            </div>
          </div>
          
          {/* Risk Badge */}
          <div className={`inline-block px-4 py-2 rounded-full border ${risk.color} font-semibold mb-4`}>
            {risk.label}
          </div>
          
          {/* Summary */}
          <p className="text-dark-300 max-w-xl mx-auto">
            {result.summary || interpretation.message || 
              "Based on your inputs and our market research, this is your estimated probability of success."}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="card bg-dark-900/50 border-dark-700 mb-8">
          <p className="text-dark-500 text-xs">
            <strong>Disclaimer:</strong> This score is a conservative estimate based on publicly available 
            market data and your inputs. It does not guarantee success or failure. Market conditions change. 
            Validate with real customers before major investments.
          </p>
        </div>

        {/* Recommendations */}
        {result.recommendations && result.recommendations.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-4">Recommendations</h2>
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3 text-dark-300">
                  <span className="shrink-0">{rec.startsWith('⚠️') || rec.startsWith('💰') || rec.startsWith('📈') ? '' : '•'}</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Scoring Breakdown */}
        {result.scoring_breakdown?.breakdown && (
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-4">Score Breakdown</h2>
            <div className="space-y-4">
              {Object.entries(result.scoring_breakdown.breakdown).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-400 capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="text-dark-300">{value.score}/100 ({value.weight})</span>
                  </div>
                  <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        value.score >= 70 ? 'bg-green-500' : 
                        value.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${value.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Improvement Mode */}
        {result.improvement_available && !showImprove && (
          <div className="card border-primary-500/30 bg-primary-500/5 mb-8 text-center">
            <h3 className="text-lg font-bold mb-2">Want to Improve Your Score?</h3>
            <p className="text-dark-400 mb-4">
              We can suggest specific changes to get your score above 75%.
            </p>
            <button 
              onClick={handleGetImprovements}
              disabled={loadingImprove}
              className="btn-primary"
            >
              {loadingImprove ? 'Analyzing...' : 'Show Me How to Improve →'}
            </button>
          </div>
        )}

        {/* Improvements */}
        {showImprove && improvements && (
          <div className="card border-green-500/30 bg-green-500/5 mb-8">
            <h2 className="text-xl font-bold mb-4 text-green-400">How to Reach 75%+</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-center">
                <p className="text-dark-500 text-xs">Current</p>
                <p className="text-2xl font-bold text-yellow-500">{improvements.current_score}%</p>
              </div>
              <div className="text-dark-600">→</div>
              <div className="text-center">
                <p className="text-dark-500 text-xs">Potential</p>
                <p className="text-2xl font-bold text-green-500">{improvements.estimated_new_score || '75+'}%</p>
              </div>
            </div>
            
            <ul className="space-y-4">
              {improvements.improvements?.suggestions?.map((item, i) => (
                <li key={i} className="card bg-dark-900/50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-green-400">{item.area}</span>
                    <span className="text-xs text-dark-500">{item.potential_impact}</span>
                  </div>
                  <p className="text-dark-300 text-sm">{item.suggestion}</p>
                </li>
              ))}
            </ul>
            
            <p className="text-dark-500 text-xs mt-4">
              {improvements.improvements?.note || "Actual impact varies based on execution."}
            </p>
          </div>
        )}

        {/* Generate Business Plan */}
        {!businessPlan && (
          <div className="card text-center mb-8">
            <h2 className="text-xl font-bold mb-2">Ready for Your Business Plan?</h2>
            <p className="text-dark-400 mb-4">
              Get your complete, professional business plan based on this analysis.
            </p>
            <button 
              onClick={handleGeneratePlan}
              disabled={generatingPlan}
              className="btn-primary"
            >
              {generatingPlan ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Generating Plan...
                </span>
              ) : (
                'Generate My Business Plan →'
              )}
            </button>
          </div>
        )}

        {/* Business Plan Display */}
        {businessPlan && (
          <div className="card mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Business Plan</h2>
              <button className="btn-secondary text-sm py-2 px-4">
                Download PDF
              </button>
            </div>
            
            {/* Plan Sections */}
            <div className="space-y-6">
              {Object.entries(businessPlan.business_plan?.sections || {}).map(([key, section]) => {
                if (key.startsWith('_')) return null
                return (
                  <div key={key} className="border-b border-dark-800 pb-6 last:border-0">
                    <h3 className="text-lg font-bold text-primary-400 mb-3">
                      {section.title || key.replace(/_/g, ' ')}
                    </h3>
                    <div className="text-dark-300 whitespace-pre-wrap">
                      {section.content}
                    </div>
                    {section.key_points?.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {section.key_points.map((point, i) => (
                          <li key={i} className="text-dark-400 text-sm flex gap-2">
                            <span className="text-primary-500">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
            
            {/* Plan Disclaimer */}
            <div className="mt-8 pt-6 border-t border-dark-800">
              <p className="text-dark-500 text-xs whitespace-pre-wrap">
                {businessPlan.disclaimer}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/start')}
            className="btn-secondary flex-1"
          >
            Start New Analysis
          </button>
          <button 
            onClick={() => navigate('/')}
            className="btn-secondary flex-1"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
