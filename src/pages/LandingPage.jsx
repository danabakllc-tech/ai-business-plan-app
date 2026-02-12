import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)

  const handleGetStarted = (plan) => {
    // Store selected plan and go to questionnaire
    localStorage.setItem('selectedPlan', plan)
    navigate('/start')
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/90 backdrop-blur-lg border-b border-dark-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-dark-950 font-bold text-sm">AI</span>
            </div>
            <span className="font-bold text-lg">Business Plan Advisor</span>
          </div>
          <button 
            onClick={() => handleGetStarted('standard')}
            className="btn-primary text-sm py-2 px-6"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
            <span className="text-primary-400 text-sm font-medium">AI-Powered Analysis</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Know If Your Business Idea Will Work — 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600"> Before You Invest</span>
          </h1>
          
          <p className="text-xl text-dark-400 mb-8 max-w-2xl mx-auto">
            AI-powered analysis with real market research. Get your success probability score and a professional business plan in minutes, not weeks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={() => handleGetStarted('standard')}
              className="btn-primary text-lg py-4 px-10"
            >
              Get Your Business Analysis →
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-dark-400">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Real Market Data
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Conservative Scoring
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              10-Minute Process
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Money-Back Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-dark-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">Most Business Ideas Fail. Yours Doesn't Have To.</h2>
          <p className="text-dark-400 text-lg mb-8">
            <span className="text-red-400 font-bold">90% of startups fail</span> — often because founders skip proper market research and planning.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="card">
              <div className="text-red-400 text-4xl font-bold mb-2">$2K-$10K</div>
              <p className="text-dark-400">Traditional business plan cost from consultants</p>
            </div>
            <div className="card">
              <div className="text-red-400 text-4xl font-bold mb-2">2-4 Weeks</div>
              <p className="text-dark-400">Time to complete traditional planning</p>
            </div>
          </div>
          <p className="text-xl text-dark-300 mt-8">
            What if you could know your odds <span className="text-primary-400 font-semibold">before</span> you invest your savings?
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">AI That Researches Your Market — Then Tells You The Truth</h2>
          <p className="section-subtitle mx-auto mb-12">
            Our AI does what a $10,000 consultant does — but in minutes.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="card hover:border-primary-500/30 transition-colors">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Researches Your Actual Market</h3>
              <p className="text-dark-400">Live web search for current data about your industry, location, and competition.</p>
            </div>
            <div className="card hover:border-primary-500/30 transition-colors">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Analyzes Real Competitors</h3>
              <p className="text-dark-400">Identifies competitors in your space, their pricing, and market position.</p>
            </div>
            <div className="card hover:border-primary-500/30 transition-colors">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Conservative Success Score</h3>
              <p className="text-dark-400">Honest 1-100% probability — we don't sugarcoat your chances.</p>
            </div>
            <div className="card hover:border-primary-500/30 transition-colors">
              <div className="text-3xl mb-4">📄</div>
              <h3 className="text-xl font-bold mb-2">Professional Business Plan</h3>
              <p className="text-dark-400">Complete, investor-ready plan you can use immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-dark-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">3 Simple Steps to Clarity</h2>
          <p className="section-subtitle text-center mx-auto mb-12">From idea to actionable insights in minutes.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-dark-950">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Answer Questions</h3>
              <p className="text-dark-400">10-15 minutes of strategic questions adapted to your industry.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-dark-950">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Researches</h3>
              <p className="text-dark-400">Real-time market research, competitor analysis, and benchmarking.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-dark-950">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Your Score</h3>
              <p className="text-dark-400">Success probability, detailed analysis, and professional plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Score Explanation */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">Your Success Probability Score</h2>
          <p className="section-subtitle text-center mx-auto mb-12">Conservative scoring based on 7 key factors.</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card border-green-500/30 bg-green-500/5">
              <div className="text-4xl font-bold text-green-500 mb-2">75%+</div>
              <h3 className="text-lg font-bold text-green-400 mb-2">Good Probability</h3>
              <p className="text-dark-400 text-sm">Strong potential. Move forward with confidence.</p>
            </div>
            <div className="card border-yellow-500/30 bg-yellow-500/5">
              <div className="text-4xl font-bold text-yellow-500 mb-2">50-74%</div>
              <h3 className="text-lg font-bold text-yellow-400 mb-2">Moderate Risk</h3>
              <p className="text-dark-400 text-sm">Potential exists but challenges need addressing.</p>
            </div>
            <div className="card border-red-500/30 bg-red-500/5">
              <div className="text-4xl font-bold text-red-500 mb-2">&lt;50%</div>
              <h3 className="text-lg font-bold text-red-400 mb-2">High Risk</h3>
              <p className="text-dark-400 text-sm">Significant adjustments recommended.</p>
            </div>
          </div>
          
          <div className="card bg-primary-500/5 border-primary-500/20 text-center">
            <p className="text-lg">
              <span className="text-primary-400 font-semibold">Not above 75%?</span> No problem. We'll show you exactly what to change to get there.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-dark-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">Choose Your Plan</h2>
          <p className="section-subtitle text-center mx-auto mb-12">One-time payment. No subscription. Yours forever.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard Plan */}
            <div className="card hover:border-dark-600 transition-colors">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Standard</h3>
                <div className="text-4xl font-bold text-white mb-2">$149</div>
                <p className="text-dark-400 text-sm">Best for validating your idea</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Complete market analysis',
                  'Competitor research',
                  'Success probability score',
                  'Risk assessment',
                  'Improvement recommendations',
                  'Standard Business Plan (9 sections)',
                  'PDF Download',
                  '30-Day Money-Back Guarantee'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-dark-300">
                    <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handleGetStarted('standard')}
                className="btn-secondary w-full"
              >
                Get Standard Plan
              </button>
            </div>
            
            {/* Pro Plan */}
            <div className="card border-primary-500/50 bg-gradient-to-b from-primary-500/10 to-transparent relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary-500 text-dark-950 text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold text-primary-400 mb-2">$199</div>
                <p className="text-dark-400 text-sm">For serious founders ready to execute</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Standard',
                  'Deeper competitor benchmarking',
                  '3 growth scenarios',
                  'Advanced financial projections',
                  'Scaling roadmap',
                  '90-day action plan',
                  'Priority support'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-dark-300">
                    <svg className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handleGetStarted('pro')}
                className="btn-primary w-full"
              >
                Get Pro Plan
              </button>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-dark-400">
              💯 <span className="text-white font-medium">30-Day Money-Back Guarantee</span> — Not satisfied? Full refund, no questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <p className="section-subtitle text-center mx-auto mb-12">Everything you need to know.</p>
          
          <div className="space-y-4">
            {[
              {
                q: "How accurate is the success probability score?",
                a: "Our score is a conservative estimate based on publicly available market data, competitor analysis, and your inputs. It's designed to under-promise rather than over-promise. A 70% score indicates relatively favorable conditions — always validate with real customers before major investments."
              },
              {
                q: "What if my score is below 50%?",
                a: "That's valuable information! We'll show you exactly why your score is low and provide specific recommendations to improve it. Many businesses can move from 'high risk' to 'good probability' with the right adjustments."
              },
              {
                q: "How is this different from a template business plan?",
                a: "Templates are generic. Our AI actually researches YOUR market, YOUR competitors, and YOUR location in real-time. Every analysis is custom to your specific business idea."
              },
              {
                q: "How long does it take?",
                a: "About 10-15 minutes to answer the questions. The AI analysis and plan generation happens in real-time — you'll have your results immediately."
              },
              {
                q: "What industries do you support?",
                a: "We support 50+ industries including e-commerce, restaurants, SaaS, consulting, service businesses, retail, content creation, and more. Select 'Other' if your industry isn't listed."
              },
              {
                q: "Can I use this plan for investors?",
                a: "Yes! The business plan is professionally formatted and includes all sections typically required by investors and lenders."
              },
              {
                q: "What's your refund policy?",
                a: "30-day money-back guarantee. If you're not satisfied, contact us for a full refund. No questions asked."
              },
              {
                q: "Is this financial or legal advice?",
                a: "No. This is an informational tool for business planning purposes. For financial, legal, or tax decisions, please consult qualified professionals."
              }
            ].map((faq, i) => (
              <div key={i} className="card">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="font-semibold pr-4">{faq.q}</span>
                  <svg 
                    className={`w-5 h-5 text-dark-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <p className="mt-4 text-dark-400 animate-fade-in">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-dark-900/50 to-dark-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title">Ready to Know Your Odds?</h2>
          <p className="text-xl text-dark-400 mb-8">Stop guessing. Start with clarity.</p>
          
          <div className="card bg-dark-800/50 mb-8">
            <p className="text-lg text-dark-300 mb-4">In the next 15 minutes, you could know:</p>
            <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto">
              <div className="flex items-center gap-2 text-dark-300">
                <span className="text-primary-500">✓</span> Your realistic success probability
              </div>
              <div className="flex items-center gap-2 text-dark-300">
                <span className="text-primary-500">✓</span> Who your real competitors are
              </div>
              <div className="flex items-center gap-2 text-dark-300">
                <span className="text-primary-500">✓</span> Whether your budget is enough
              </div>
              <div className="flex items-center gap-2 text-dark-300">
                <span className="text-primary-500">✓</span> Exactly what to improve
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => handleGetStarted('standard')}
            className="btn-primary text-lg py-4 px-10"
          >
            Get Your Business Analysis — $149 →
          </button>
          
          <p className="text-dark-500 text-sm mt-4">
            ✓ 30-day money-back guarantee · ✓ Instant results · ✓ One-time payment
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-dark-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-dark-950 font-bold text-sm">AI</span>
              </div>
              <span className="font-bold">Business Plan Advisor</span>
            </div>
            <div className="flex gap-6 text-dark-400 text-sm">
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="mailto:support@danabak.com" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          
          <div className="text-dark-500 text-xs leading-relaxed">
            <p className="mb-4">
              <strong>Disclaimer:</strong> AI Business Plan Advisor provides informational analysis for business planning purposes only. 
              This is not financial, legal, tax, or investment advice. Success probability scores are conservative estimates based on 
              publicly available data and user-provided inputs. Market conditions, competition, and economic factors change over time. 
              You are responsible for all business decisions. We recommend consulting with qualified professionals before making 
              significant financial commitments.
            </p>
            <p>© {new Date().getFullYear()} AI Business Plan Advisor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
