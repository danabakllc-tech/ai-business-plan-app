import { useState, useRef, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   QUESTIONNAIRE PAGE - 9-Stage Business Input Form
   ═══════════════════════════════════════════════════════════════════════════ */

const STAGES = [
  {
    id: 'basics',
    title: 'Business Basics',
    subtitle: 'Tell us about your business idea',
    questions: [
      { id: 'name', label: 'What is your business name?', placeholder: 'e.g. PawBox, BrewHaus, TechStart...', type: 'text' },
      { id: 'industry', label: 'What industry best describes your business?', placeholder: 'e.g. E-commerce, Restaurant, SaaS, Consulting...', type: 'text' },
      { id: 'description', label: 'Describe what your business does in 1-2 sentences.', placeholder: 'e.g. We sell curated monthly subscription boxes for dog owners...', type: 'textarea' },
      { id: 'stage', label: 'What stage is your business in?', type: 'select', options: ['Idea stage (haven\'t started yet)', 'Pre-launch (building but not selling)', 'Just launched (0-6 months)', 'Early stage (6 months - 2 years)', 'Growing (2-5 years)', 'Established (5+ years)'] },
      { id: 'location', label: 'Where is your business located?', placeholder: 'e.g. Austin, TX', type: 'text' },
      { id: 'founder_story', label: 'What\'s your background? Why are YOU starting this business?', placeholder: 'e.g. 5 years in retail, know the industry well...', type: 'textarea' },
      { id: 'service_area', label: 'What is your service/selling area?', type: 'select', options: ['Local only (one city/region)', 'Regional (multiple cities/states)', 'National', 'International'] }
    ]
  },
  {
    id: 'vision',
    title: 'Vision & Goals',
    subtitle: 'Where are you headed?',
    questions: [
      { id: 'primary_goal', label: 'What is your primary goal for this business plan?', type: 'select', options: ['Launch a new business', 'Get funding (investors/loans)', 'Scale an existing business', 'Pivot or rebrand', 'Improve operations', 'Integrate AI and modernize'] },
      { id: 'vision_5yr', label: 'Where do you want this business in 5 years?', placeholder: 'e.g. $1M+ revenue, national brand, 10,000 customers...', type: 'textarea' },
      { id: 'goal_12mo', label: 'What is your most important goal for the next 12 months?', placeholder: 'e.g. Reach $10K/month revenue, get 500 customers...', type: 'text' },
      { id: 'biggest_challenge', label: 'What is the biggest challenge you\'re facing right now?', placeholder: 'e.g. Getting customers, funding, building the product...', type: 'textarea' },
      { id: 'launch_date', label: 'When do you plan to launch (or when did you launch)?', placeholder: 'e.g. March 2026', type: 'text' }
    ]
  },
  {
    id: 'customer',
    title: 'Customer & Market',
    subtitle: 'Who are you serving?',
    questions: [
      { id: 'ideal_customer', label: 'Who is your ideal customer? Be specific.', placeholder: 'e.g. Women 28-45, homeowners, income $75K+, interested in home decor...', type: 'textarea' },
      { id: 'problem_solved', label: 'What problem do you solve for your customer?', placeholder: 'e.g. Homeowners can\'t find unique, high-quality products without paying designer prices...', type: 'textarea' },
      { id: 'alternatives', label: 'How does your customer currently solve this problem (without you)?', placeholder: 'e.g. Big-box stores, Etsy, expensive designers...', type: 'textarea' },
      { id: 'why_choose_you', label: 'Why would a customer choose YOU over alternatives?', placeholder: 'e.g. Curated selection, unique designs, better quality at accessible prices...', type: 'textarea' },
      { id: 'existing_customers', label: 'Do you have existing customers?', type: 'select', options: ['Yes, paying customers', 'Yes, a few early users', 'No, but I\'ve validated demand', 'No, not yet'] }
    ]
  },
  {
    id: 'competition',
    title: 'Competition',
    subtitle: 'Know your battlefield',
    questions: [
      { id: 'competitors', label: 'Who are your top 3 competitors?', placeholder: 'e.g. Competitor A, Competitor B, Competitor C...', type: 'textarea' },
      { id: 'competitor_strengths', label: 'What do they do well?', placeholder: 'e.g. Strong brand awareness, large selection, fast shipping...', type: 'textarea' },
      { id: 'competitor_weaknesses', label: 'What do they do poorly? (Your opportunity)', placeholder: 'e.g. Generic products, poor customer service, no personalization...', type: 'textarea' },
      { id: 'pricing_comparison', label: 'How is your pricing compared to competitors?', type: 'select', options: ['Lower than competitors', 'Similar to competitors', 'Higher (premium)', 'Not sure yet'] }
    ]
  },
  {
    id: 'resources',
    title: 'Resources & Team',
    subtitle: 'What are you working with?',
    questions: [
      { id: 'budget', label: 'What is your available startup budget?', type: 'select', options: ['Under $1,000', '$1,000 - $5,000', '$5,000 - $20,000', '$20,000 - $50,000', '$50,000 - $100,000', '$100,000+'] },
      { id: 'funding_source', label: 'How are you funding the business?', type: 'select', options: ['Personal savings', 'Friends & family', 'Bank loan', 'Credit cards', 'Investors', 'Revenue from sales', 'Grants', 'Other'] },
      { id: 'team', label: 'Who is on your team?', type: 'select', options: ['Just me (solo)', 'Me + a partner', 'Me + 1-3 employees', 'Me + 4-10 employees', 'Me + contractors/freelancers', '10+ employees'] },
      { id: 'skills', label: 'What skills does your team have?', placeholder: 'e.g. Marketing, design, sales, operations, coding...', type: 'text' },
      { id: 'missing_skills', label: 'What skills are you missing?', placeholder: 'e.g. Web development, paid advertising, accounting...', type: 'text' },
      { id: 'tools', label: 'What tools/systems do you already use?', placeholder: 'e.g. Shopify, Instagram, QuickBooks, ChatGPT...', type: 'text' }
    ]
  },
  {
    id: 'technology',
    title: 'AI & Technology',
    subtitle: 'Your digital readiness',
    questions: [
      { id: 'tech_level', label: 'How would you rate your current technology setup?', type: 'select', options: ['Very basic (no website, mostly manual)', 'Basic (have a website, use some tools)', 'Moderate (several cloud tools, some automation)', 'Advanced (AI tools, automations, integrated systems)'] },
      { id: 'ai_tools', label: 'Are you currently using any AI tools?', type: 'select', options: ['Yes, actively using AI tools', 'Tried a few but not consistently', 'No, but interested', 'No, not sure where to start'] },
      { id: 'ai_tools_list', label: 'If using AI, which tools?', placeholder: 'e.g. ChatGPT, Claude, Jasper...', type: 'text', optional: true },
      { id: 'online_presence', label: 'What is your current online presence?', type: 'select', options: ['No website or social media', 'Basic website only', 'Website + some social media', 'Website + active social media', 'Website + social + email marketing', 'Full digital ecosystem'] },
      { id: 'cybersecurity', label: 'Do you have a cybersecurity plan?', type: 'select', options: ['Yes, comprehensive', 'Yes, basic (antivirus, strong passwords)', 'No', 'Not sure what I need'] }
    ]
  },
  {
    id: 'finances',
    title: 'Financial Details',
    subtitle: 'Let\'s talk numbers',
    questions: [
      { id: 'current_revenue', label: 'What is your current monthly revenue?', type: 'select', options: ['$0 (pre-revenue)', 'Under $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000 - $50,000', '$50,000 - $100,000', '$100,000+'] },
      { id: 'target_revenue', label: 'What is your target monthly revenue in 12 months?', placeholder: 'e.g. $15,000/month', type: 'text' },
      { id: 'main_costs', label: 'What are your main costs (or expected costs)?', placeholder: 'e.g. Inventory $2K, marketing $500, software $200...', type: 'textarea' },
      { id: 'target_margin', label: 'What is your target profit margin?', placeholder: 'e.g. 40%, or "not sure"', type: 'text' },
      { id: 'seeking_funding', label: 'Are you looking for outside funding?', type: 'select', options: ['No, self-funded', 'Yes, bank loan', 'Yes, investors', 'Yes, grants', 'Not sure yet'] }
    ]
  },
  {
    id: 'strategy',
    title: 'Marketing & Strategy',
    subtitle: 'How will you grow?',
    questions: [
      { id: 'marketing_channels', label: 'What marketing channels do you want to focus on?', placeholder: 'e.g. Social media, SEO, paid ads, content marketing...', type: 'text' },
      { id: 'content_strategy', label: 'What is your content strategy?', type: 'select', options: ['Already creating content regularly', 'Creating some content', 'Plan to start', 'Not planning content', 'Not sure'] },
      { id: 'brand_identity', label: 'Do you have a brand identity?', type: 'select', options: ['Yes, complete (logo, colors, guidelines)', 'Partial (logo only)', 'In progress', 'Not yet'] },
      { id: 'sales_process', label: 'What is your sales process?', type: 'select', options: ['Inbound (customers come to me)', 'Outbound (I reach out)', 'Both', 'Not defined yet'] },
      { id: 'partnerships', label: 'What partnerships could help your business?', placeholder: 'e.g. Influencers, complementary businesses, distributors...', type: 'text', optional: true },
      { id: 'top_priority', label: 'What is your #1 priority right now?', placeholder: 'e.g. Getting first customers, building product, raising money...', type: 'text' }
    ]
  },
  {
    id: 'review',
    title: 'Review & Submit',
    subtitle: 'Confirm your information',
    questions: []
  }
];

export default function QuestionnairePage({ plan, email, onComplete, onBack }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const topRef = useRef(null);

  const stage = STAGES[currentStage];
  const totalStages = STAGES.length;
  const isReviewStage = stage.id === 'review';

  // Colors
  const c = {
    bg: '#0A0F1A',
    card: 'rgba(255,255,255,0.03)',
    cardBorder: 'rgba(255,255,255,0.08)',
    inputBg: 'rgba(255,255,255,0.05)',
    inputBorder: 'rgba(255,255,255,0.1)',
    text: '#FFFFFF',
    textMuted: '#94A3B8',
    textDim: '#64748B',
    accent: '#F59E0B',
    success: '#22C55E'
  };

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentStage]);

  const getAnswer = (questionId) => answers[questionId] || '';
  
  const updateAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setError('');
  };

  const canProceed = () => {
    if (isReviewStage) return true;
    const required = stage.questions.filter(q => !q.optional);
    return required.every(q => getAnswer(q.id).trim() !== '');
  };

  const nextStage = () => {
    if (!canProceed()) {
      setError('Please complete all required fields');
      return;
    }
    if (currentStage < totalStages - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const prevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    // Structure the answers for the API
    const structuredData = {
      basics: {
        name: answers.name || '',
        industry: answers.industry || '',
        description: answers.description || '',
        stage: answers.stage || '',
        location: answers.location || '',
        founder_story: answers.founder_story || '',
        service_area: answers.service_area || ''
      },
      vision: {
        primary_goal: answers.primary_goal || '',
        vision_5yr: answers.vision_5yr || '',
        goal_12mo: answers.goal_12mo || '',
        biggest_challenge: answers.biggest_challenge || '',
        launch_date: answers.launch_date || ''
      },
      customer: {
        ideal_customer: answers.ideal_customer || '',
        problem_solved: answers.problem_solved || '',
        alternatives: answers.alternatives || '',
        why_choose_you: answers.why_choose_you || '',
        existing_customers: answers.existing_customers || ''
      },
      competition: {
        competitors: answers.competitors || '',
        competitor_strengths: answers.competitor_strengths || '',
        competitor_weaknesses: answers.competitor_weaknesses || '',
        pricing_comparison: answers.pricing_comparison || ''
      },
      resources: {
        budget: answers.budget || '',
        funding_source: answers.funding_source || '',
        team: answers.team || '',
        skills: answers.skills || '',
        missing_skills: answers.missing_skills || '',
        tools: answers.tools || ''
      },
      technology: {
        tech_level: answers.tech_level || '',
        ai_tools: answers.ai_tools || '',
        ai_tools_list: answers.ai_tools_list || '',
        online_presence: answers.online_presence || '',
        cybersecurity: answers.cybersecurity || ''
      },
      finances: {
        current_revenue: answers.current_revenue || '',
        target_revenue: answers.target_revenue || '',
        main_costs: answers.main_costs || '',
        target_margin: answers.target_margin || '',
        seeking_funding: answers.seeking_funding || ''
      },
      strategy: {
        marketing_channels: answers.marketing_channels || '',
        content_strategy: answers.content_strategy || '',
        brand_identity: answers.brand_identity || '',
        sales_process: answers.sales_process || '',
        partnerships: answers.partnerships || '',
        top_priority: answers.top_priority || ''
      },
      plan_type: plan,
      email: email
    };

    try {
      onComplete(structuredData);
    } catch (err) {
      setError('Failed to submit. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Get summary for review stage
  const getSummary = () => {
    return STAGES.filter(s => s.id !== 'review').map(s => ({
      title: s.title,
      items: s.questions.map(q => ({
        label: q.label,
        value: getAnswer(q.id) || '(not provided)'
      }))
    }));
  };

  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        input:focus, textarea:focus, select:focus { 
          outline: none; 
          border-color: ${c.accent} !important; 
          box-shadow: 0 0 0 3px rgba(245,158,11,0.1); 
        }
        input::placeholder, textarea::placeholder { color: ${c.textDim}; }
        select { 
          appearance: none; 
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); 
          background-repeat: no-repeat; 
          background-position: right 14px center; 
        }
      `}</style>
      <div ref={topRef} />

      {/* Progress Header */}
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 10, 
        background: 'rgba(10,15,26,0.95)', 
        backdropFilter: 'blur(12px)', 
        borderBottom: `1px solid ${c.cardBorder}` 
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '14px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: c.textMuted, fontSize: 12, fontWeight: 600 }}>
              Stage {currentStage + 1} of {totalStages}: {stage.title}
            </span>
            <span style={{ color: c.accent, fontSize: 12, fontWeight: 700 }}>
              {Math.round(((currentStage + 1) / totalStages) * 100)}%
            </span>
          </div>
          <div style={{ height: 5, background: c.inputBg, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              width: `${((currentStage + 1) / totalStages) * 100}%`, 
              background: `linear-gradient(90deg, ${c.accent}, #d97706)`, 
              borderRadius: 3, 
              transition: 'width 0.4s ease' 
            }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '28px 24px 100px', animation: 'fadeIn 0.4s ease' }}>
        {/* Back to home */}
        {currentStage === 0 && (
          <button 
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: c.textDim,
              cursor: 'pointer',
              marginBottom: 24,
              fontSize: 14
            }}
          >
            ← Back
          </button>
        )}

        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: c.text, fontSize: 26, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.5px' }}>
            {stage.title}
          </h2>
          <p style={{ color: c.textMuted, fontSize: 14, margin: 0 }}>{stage.subtitle}</p>
        </div>

        {/* Review Stage */}
        {isReviewStage ? (
          <div>
            <p style={{ color: c.textMuted, marginBottom: 24 }}>
              Review your answers before we analyze your business.
            </p>
            {getSummary().map((section, si) => (
              <div key={si} style={{ 
                background: c.card, 
                border: `1px solid ${c.cardBorder}`, 
                borderRadius: 12, 
                padding: '16px 20px',
                marginBottom: 16
              }}>
                <h3 style={{ color: c.accent, fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
                  {section.title}
                </h3>
                {section.items.slice(0, 3).map((item, ii) => (
                  <div key={ii} style={{ marginBottom: 8 }}>
                    <div style={{ color: c.textDim, fontSize: 11, marginBottom: 2 }}>{item.label}</div>
                    <div style={{ color: c.text, fontSize: 13 }}>
                      {item.value.length > 100 ? item.value.substring(0, 100) + '...' : item.value}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          /* Questions */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {stage.questions.map((q, qi) => (
              <div key={q.id} style={{ 
                background: c.card, 
                border: `1px solid ${c.cardBorder}`, 
                borderRadius: 12, 
                padding: '18px 22px' 
              }}>
                <label style={{ display: 'block', color: c.text, fontSize: 14, fontWeight: 600, marginBottom: 10, lineHeight: 1.5 }}>
                  <span style={{ color: c.accent, fontWeight: 800, marginRight: 8 }}>
                    {qi + 1}.
                  </span>
                  {q.label}
                  {q.optional && <span style={{ color: c.textDim, fontWeight: 400, fontSize: 11, marginLeft: 6 }}>(optional)</span>}
                </label>

                {q.type === 'select' ? (
                  <select
                    value={getAnswer(q.id)}
                    onChange={(e) => updateAnswer(q.id, e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '11px 14px', 
                      background: c.inputBg, 
                      border: `1px solid ${c.inputBorder}`, 
                      borderRadius: 8, 
                      color: getAnswer(q.id) ? c.text : c.textDim, 
                      fontSize: 13, 
                      cursor: 'pointer',
                      paddingRight: 36
                    }}
                  >
                    <option value="">Select an option...</option>
                    {q.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : q.type === 'textarea' ? (
                  <textarea
                    value={getAnswer(q.id)}
                    onChange={(e) => updateAnswer(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    rows={3}
                    style={{ 
                      width: '100%', 
                      padding: '11px 14px', 
                      background: c.inputBg, 
                      border: `1px solid ${c.inputBorder}`, 
                      borderRadius: 8, 
                      color: c.text, 
                      fontSize: 13, 
                      resize: 'vertical', 
                      fontFamily: 'inherit', 
                      lineHeight: 1.6,
                      boxSizing: 'border-box'
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    value={getAnswer(q.id)}
                    onChange={(e) => updateAnswer(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    style={{ 
                      width: '100%', 
                      padding: '11px 14px', 
                      background: c.inputBg, 
                      border: `1px solid ${c.inputBorder}`, 
                      borderRadius: 8, 
                      color: c.text, 
                      fontSize: 13,
                      boxSizing: 'border-box'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {error && (
          <div style={{ 
            marginTop: 16, 
            padding: '10px 14px', 
            background: 'rgba(239,68,68,0.1)', 
            border: '1px solid rgba(239,68,68,0.3)', 
            borderRadius: 8, 
            color: '#f87171', 
            fontSize: 12 
          }}>
            {error}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, gap: 16 }}>
          <button
            onClick={prevStage}
            disabled={currentStage === 0}
            style={{ 
              padding: '12px 24px', 
              borderRadius: 10, 
              border: `1px solid ${c.cardBorder}`, 
              background: currentStage === 0 ? 'transparent' : c.card, 
              color: currentStage === 0 ? c.textDim : c.text, 
              fontSize: 13, 
              fontWeight: 600, 
              cursor: currentStage === 0 ? 'not-allowed' : 'pointer', 
              opacity: currentStage === 0 ? 0.4 : 1
            }}
          >
            ← Back
          </button>

          {isReviewStage ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{ 
                padding: '12px 32px', 
                borderRadius: 10, 
                border: 'none', 
                background: `linear-gradient(135deg, ${c.accent}, #d97706)`, 
                color: '#0a0f1a', 
                fontSize: 14, 
                fontWeight: 700, 
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                boxShadow: '0 4px 16px rgba(245,158,11,0.2)'
              }}
            >
              {isSubmitting ? 'Analyzing...' : 'Run Analysis →'}
            </button>
          ) : (
            <button
              onClick={nextStage}
              disabled={!canProceed()}
              style={{ 
                padding: '12px 32px', 
                borderRadius: 10, 
                border: 'none', 
                background: canProceed() ? `linear-gradient(135deg, ${c.accent}, #d97706)` : c.cardBorder, 
                color: canProceed() ? '#0a0f1a' : c.textDim, 
                fontSize: 14, 
                fontWeight: 700, 
                cursor: canProceed() ? 'pointer' : 'not-allowed',
                boxShadow: canProceed() ? '0 4px 16px rgba(245,158,11,0.2)' : 'none'
              }}
            >
              Next →
            </button>
          )}
        </div>

        {/* Stage indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 24 }}>
          {STAGES.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === currentStage ? 22 : 7,
                height: 7,
                borderRadius: 4,
                background: i < currentStage ? c.success : i === currentStage ? c.accent : c.cardBorder,
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
