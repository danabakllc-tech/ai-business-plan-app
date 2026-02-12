import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../App'

// Question stages - 9 total
const STAGES = [
  {
    id: "basics",
    title: "Business Basics",
    subtitle: "Tell me about your business",
    questions: [
      { id: "name", label: "What is your business name?", placeholder: "e.g. PawBox, Rug Market, BrewHaus...", type: "text", required: true },
      { id: "industry", label: "What industry best describes your business?", placeholder: "e.g. E-commerce, Restaurant, SaaS, Consulting...", type: "text", required: true },
      { id: "description", label: "Describe what your business does in 1-2 sentences.", placeholder: "e.g. We sell curated monthly subscription boxes for dog owners.", type: "textarea", required: true },
      { id: "stage", label: "What stage is your business in?", type: "select", required: true,
        options: ["Idea stage (haven't started)", "Pre-launch (building)", "Just launched (0-6 months)", "Early stage (6mo - 2yrs)", "Growing (2-5 years)", "Established (5+ years)"]
      },
      { id: "location", label: "Where is your business located?", placeholder: "e.g. Charlotte, NC", type: "text", required: true },
      { id: "founder_story", label: "What's your background? Why are YOU starting this?", placeholder: "Your experience, skills, or connection to this business...", type: "textarea" },
      { id: "service_area", label: "What is your service/selling area?", type: "select", required: true,
        options: ["Local only (one city/region)", "Regional (multiple cities)", "National", "International"]
      },
    ],
  },
  {
    id: "vision",
    title: "Vision & Goals",
    subtitle: "Where are you headed?",
    questions: [
      { id: "primary_goal", label: "What is your primary goal for this business plan?", type: "select", required: true,
        options: ["Launch a new business", "Get funding", "Scale existing business", "Pivot or rebrand", "Improve operations", "Plan an exit"]
      },
      { id: "vision_5yr", label: "Where do you want this business in 5 years?", placeholder: "e.g. $1M+ revenue, national brand, 10,000 customers...", type: "textarea", required: true },
      { id: "goal_12mo", label: "Most important goal for the next 12 months?", placeholder: "e.g. Reach $10K/month, get 500 customers...", type: "text", required: true },
      { id: "biggest_challenge", label: "Biggest challenge or obstacle right now?", placeholder: "e.g. Getting customers, funding, building the product...", type: "textarea", required: true },
      { id: "launch_date", label: "When do you plan to launch (or when did you)?", placeholder: "e.g. March 2026", type: "text" },
    ],
  },
  {
    id: "customer",
    title: "Customer & Market",
    subtitle: "Who are you serving?",
    questions: [
      { id: "ideal_customer", label: "Who is your ideal customer? Be specific.", placeholder: "Age, income, interests, location, business type...", type: "textarea", required: true },
      { id: "problem_solved", label: "What problem do you solve for them?", placeholder: "The painful problem your business addresses...", type: "textarea", required: true },
      { id: "alternatives", label: "How do customers currently solve this (without you)?", placeholder: "Competitors, DIY solutions, doing nothing...", type: "textarea", required: true },
      { id: "why_choose_you", label: "Why would customers choose YOU over alternatives?", placeholder: "Your unique value proposition...", type: "textarea", required: true },
      { id: "existing_customers", label: "Do you have existing customers?", type: "select", required: true,
        options: ["Yes, paying customers", "Yes, a few early users", "No, but validated demand", "No, not yet"]
      },
    ],
  },
  {
    id: "competition",
    title: "Competition",
    subtitle: "Know your battlefield",
    questions: [
      { id: "competitors", label: "Who are your top 3 competitors?", placeholder: "Names or descriptions of main competitors...", type: "textarea", required: true },
      { id: "competitor_strengths", label: "What do they do well?", placeholder: "Their advantages and strengths...", type: "textarea", required: true },
      { id: "competitor_weaknesses", label: "What do they do poorly? (Your opportunity)", placeholder: "Gaps you can exploit...", type: "textarea", required: true },
      { id: "pricing_comparison", label: "How is your pricing vs competitors?", type: "select", required: true,
        options: ["Lower than competitors", "Similar to competitors", "Higher (premium)", "Not sure yet"]
      },
    ],
  },
  {
    id: "resources",
    title: "Resources & Team",
    subtitle: "What are you working with?",
    questions: [
      { id: "budget", label: "Available startup or monthly budget?", type: "select", required: true,
        options: ["Under $1,000", "$1,000 - $5,000", "$5,000 - $20,000", "$20,000 - $50,000", "$50,000 - $100,000", "$100,000+"]
      },
      { id: "funding_source", label: "How are you funding the business?", type: "select", required: true,
        options: ["Personal savings", "Friends & family", "Bank loan", "Credit cards", "Investors", "Revenue", "Grants", "Other"]
      },
      { id: "team", label: "Who is on your team?", type: "select", required: true,
        options: ["Just me (solo)", "Me + partner", "Me + 1-3 employees", "Me + 4-10 employees", "Me + contractors", "10+ employees"]
      },
      { id: "skills", label: "What skills does your team have?", placeholder: "Marketing, design, sales, coding...", type: "text", required: true },
      { id: "missing_skills", label: "What skills are you missing?", placeholder: "Web development, advertising, accounting...", type: "text" },
      { id: "tools", label: "What tools do you already use?", placeholder: "Shopify, Instagram, QuickBooks, ChatGPT...", type: "text" },
    ],
  },
  {
    id: "technology",
    title: "AI & Technology",
    subtitle: "Your digital readiness",
    questions: [
      { id: "tech_level", label: "Current technology setup?", type: "select", required: true,
        options: ["Very basic (no website, manual)", "Basic (website, some tools)", "Moderate (cloud tools, some automation)", "Advanced (AI tools, integrated systems)"]
      },
      { id: "ai_tools", label: "Are you using any AI tools?", type: "select", required: true,
        options: ["Yes, actively using AI", "Tried a few", "No, but interested", "No, not sure where to start"]
      },
      { id: "ai_tools_list", label: "If using AI, which tools?", placeholder: "ChatGPT, Claude, Jasper, Midjourney...", type: "text" },
      { id: "online_presence", label: "Current online presence?", type: "select", required: true,
        options: ["No website/social", "Basic website only", "Website + some social", "Website + active social", "Website + social + email", "Full digital ecosystem"]
      },
      { id: "cybersecurity", label: "Do you have a cybersecurity plan?", type: "select", required: true,
        options: ["Yes, comprehensive", "Yes, basic", "No", "Not sure what I need"]
      },
    ],
  },
  {
    id: "finances",
    title: "Financial Details",
    subtitle: "Let's talk numbers",
    questions: [
      { id: "current_revenue", label: "Current monthly revenue?", type: "select", required: true,
        options: ["$0 (pre-revenue)", "Under $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000 - $25,000", "$25,000 - $50,000", "$50,000 - $100,000", "$100,000+"]
      },
      { id: "target_revenue", label: "Target monthly revenue in 12 months?", placeholder: "e.g. $15,000/month", type: "text", required: true },
      { id: "main_costs", label: "Main costs (or expected costs)?", placeholder: "Inventory $2K, marketing $500, software $200...", type: "textarea", required: true },
      { id: "target_margin", label: "Target profit margin?", placeholder: "e.g. 40%, or 'not sure'", type: "text" },
      { id: "seeking_funding", label: "Looking for outside funding?", type: "select", required: true,
        options: ["No, self-funded", "Bank loan", "Investors", "Grants", "Not sure"]
      },
    ],
  },
  {
    id: "strategy",
    title: "Strategy",
    subtitle: "Your go-to-market approach",
    questions: [
      { id: "marketing_channels", label: "Marketing channels you want to focus on?", placeholder: "Social media, SEO, ads, content, email...", type: "text", required: true },
      { id: "content_strategy", label: "Content strategy?", type: "select", required: true,
        options: ["Already creating content", "Plan to create", "Not planning", "Not sure"]
      },
      { id: "brand_identity", label: "Brand identity status?", type: "select", required: true,
        options: ["Complete (logo, colors, voice)", "Partial (some elements)", "None yet"]
      },
      { id: "sales_process", label: "Sales process?", type: "select", required: true,
        options: ["Inbound (customers come to me)", "Outbound (I reach out)", "Both", "Not defined yet"]
      },
      { id: "partnerships", label: "Potential partnerships that could help?", placeholder: "Influencers, other businesses, platforms...", type: "text" },
      { id: "top_priority", label: "Your #1 priority right now?", placeholder: "The single most important thing...", type: "text", required: true },
    ],
  },
  {
    id: "review",
    title: "Review & Submit",
    subtitle: "Almost done! Review your answers",
    questions: [] // Will show summary
  }
]

export default function Questionnaire() {
  const navigate = useNavigate()
  const topRef = useRef(null)
  const [currentStage, setCurrentStage] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  
  const selectedPlan = localStorage.getItem('selectedPlan') || 'standard'
  const stage = STAGES[currentStage]
  const totalStages = STAGES.length
  const progress = ((currentStage + 1) / totalStages) * 100

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentStage])

  const updateAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [stage.id]: {
        ...prev[stage.id],
        [questionId]: value
      }
    }))
    setError(null)
  }

  const getAnswer = (questionId) => {
    return answers[stage.id]?.[questionId] || ''
  }

  const canProceed = () => {
    if (stage.id === 'review') return true
    const required = stage.questions.filter(q => q.required)
    return required.every(q => getAnswer(q.id)?.trim())
  }

  const nextStage = () => {
    if (!canProceed()) {
      setError('Please fill in all required fields')
      return
    }
    if (currentStage < totalStages - 1) {
      setCurrentStage(currentStage + 1)
    }
  }

  const prevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Format answers for API
      const payload = {
        basics: answers.basics || {},
        vision: answers.vision || {},
        customer: answers.customer || {},
        competition: answers.competition || {},
        resources: answers.resources || {},
        technology: answers.technology || {},
        finances: answers.finances || {},
        strategy: answers.strategy || {},
        plan_type: selectedPlan
      }
      
      // Call API
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.')
      }
      
      const result = await response.json()
      
      // Store result and navigate
      localStorage.setItem('analysisResult', JSON.stringify(result))
      localStorage.setItem('businessInputs', JSON.stringify(payload))
      navigate('/results')
      
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Review page
  if (stage.id === 'review') {
    return (
      <div className="min-h-screen bg-dark-950 py-8 px-4">
        <div ref={topRef} />
        
        {/* Progress Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-dark-400 text-sm font-medium">Review & Submit</span>
            <span className="text-primary-500 text-sm font-bold">100%</span>
          </div>
          <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{stage.title}</h1>
          <p className="text-dark-400 mb-8">{stage.subtitle}</p>
          
          {/* Summary */}
          <div className="space-y-6 mb-8">
            {STAGES.filter(s => s.id !== 'review').map(s => (
              <div key={s.id} className="card">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-primary-400">{s.title}</h3>
                  <button 
                    onClick={() => setCurrentStage(STAGES.findIndex(st => st.id === s.id))}
                    className="text-xs text-dark-400 hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2">
                  {s.questions.slice(0, 3).map(q => {
                    const answer = answers[s.id]?.[q.id]
                    if (!answer) return null
                    return (
                      <div key={q.id} className="text-sm">
                        <span className="text-dark-500">{q.label.split('?')[0]}:</span>
                        <span className="text-dark-300 ml-2">
                          {answer.length > 80 ? answer.slice(0, 80) + '...' : answer}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Plan Selection */}
          <div className="card border-primary-500/30 bg-primary-500/5 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-dark-400 text-sm">Selected Plan</p>
                <p className="text-xl font-bold text-primary-400">
                  {selectedPlan === 'pro' ? 'Pro — $199' : 'Standard — $149'}
                </p>
              </div>
              <button 
                onClick={() => navigate('/#pricing')}
                className="text-sm text-dark-400 hover:text-white transition-colors"
              >
                Change
              </button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 text-red-400 text-sm">
              {error}
            </div>
          )}
          
          {/* Submit Button */}
          <div className="flex gap-4">
            <button onClick={prevStage} className="btn-secondary flex-1">
              ← Back
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Run Analysis →'
              )}
            </button>
          </div>
          
          <p className="text-dark-500 text-xs text-center mt-4">
            By submitting, you agree to our terms and privacy policy.
          </p>
        </div>
      </div>
    )
  }

  // Question form
  return (
    <div className="min-h-screen bg-dark-950 py-8 px-4">
      <div ref={topRef} />
      
      {/* Progress Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-dark-400 text-sm font-medium">
            Stage {currentStage + 1} of {totalStages}: {stage.title}
          </span>
          <span className="text-primary-500 text-sm font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">{stage.title}</h1>
        <p className="text-dark-400 mb-8">{stage.subtitle}</p>
        
        {/* Questions */}
        <div className="space-y-6">
          {stage.questions.map((q, i) => (
            <div key={q.id} className="card">
              <label className="block mb-3">
                <span className="text-primary-500 font-bold mr-2">{i + 1}.</span>
                <span className="font-semibold">{q.label}</span>
                {q.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              
              {q.type === 'select' ? (
                <select
                  value={getAnswer(q.id)}
                  onChange={(e) => updateAnswer(q.id, e.target.value)}
                  className="input-field"
                >
                  <option value="">Select an option...</option>
                  {q.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : q.type === 'textarea' ? (
                <textarea
                  value={getAnswer(q.id)}
                  onChange={(e) => updateAnswer(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  rows={3}
                  className="input-field resize-y"
                />
              ) : (
                <input
                  type="text"
                  value={getAnswer(q.id)}
                  onChange={(e) => updateAnswer(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  className="input-field"
                />
              )}
            </div>
          ))}
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mt-6 text-red-400 text-sm">
            {error}
          </div>
        )}
        
        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <button 
            onClick={prevStage}
            disabled={currentStage === 0}
            className="btn-secondary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          <button 
            onClick={nextStage}
            disabled={!canProceed()}
            className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
        
        {/* Stage dots */}
        <div className="flex justify-center gap-2 mt-8">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStage ? 'w-6 bg-primary-500' : 
                i < currentStage ? 'w-2 bg-green-500' : 'w-2 bg-dark-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
