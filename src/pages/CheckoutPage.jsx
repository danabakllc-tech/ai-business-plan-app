import { useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   CHECKOUT PAGE - Stripe Integration
   ═══════════════════════════════════════════════════════════════════════════ */

const PLANS = {
  standard: {
    name: 'Standard Plan',
    price: 149,
    features: [
      'Complete market analysis',
      'Competitor research',
      'Success probability score (1-100%)',
      'Risk assessment',
      'Improvement recommendations',
      'Standard Business Plan (9 sections)',
      'PDF Download'
    ]
  },
  pro: {
    name: 'Pro Plan',
    price: 199,
    features: [
      'Everything in Standard',
      'Deeper competitor benchmarking',
      '3 growth scenarios (conservative, moderate, optimistic)',
      'Advanced financial projections',
      'Scaling roadmap',
      '90-day action plan',
      'Priority support'
    ]
  }
};

export default function CheckoutPage({ plan = 'pro', onBack, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const selectedPlan = PLANS[plan] || PLANS.pro;

  const handleCheckout = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // TODO: Integrate with Stripe Checkout
      // For now, simulate success after 2 seconds
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, email })
      });
      
      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url; // Redirect to Stripe Checkout
      } else {
        // Fallback: Go directly to questionnaire (for testing)
        onSuccess(email, plan);
      }
    } catch (err) {
      // Fallback: Go directly to questionnaire (for testing without payment)
      console.log('Payment skipped for testing');
      onSuccess(email, plan);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0F1A',
      color: '#fff',
      fontFamily: "'Inter', -apple-system, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }}>
      <style>{`
        .input-field {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 16px;
          transition: all 0.2s;
        }
        .input-field:focus {
          outline: none;
          border-color: #F59E0B;
          box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
        }
        .input-field::placeholder {
          color: #64748B;
        }
        .btn-checkout {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #F59E0B, #D97706);
          color: #0A0F1A;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-checkout:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(245,158,11,0.4);
        }
        .btn-checkout:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>

      <div style={{ maxWidth: 480, width: '100%' }}>
        {/* Back Button */}
        <button 
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            marginBottom: 24,
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          ← Back to plans
        </button>

        {/* Order Summary Card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: 32,
          marginBottom: 24
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
            Complete Your Order
          </h2>
          <p style={{ color: '#64748B', marginBottom: 32 }}>
            You're getting the {selectedPlan.name}
          </p>

          {/* Plan Details */}
          <div style={{
            background: 'rgba(245,158,11,0.05)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: 12,
            padding: 20,
            marginBottom: 24
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 18, fontWeight: 600 }}>{selectedPlan.name}</span>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#F59E0B' }}>${selectedPlan.price}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {selectedPlan.features.slice(0, 4).map((feature, i) => (
                <li key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 10, 
                  marginBottom: 8,
                  color: '#94A3B8',
                  fontSize: 14
                }}>
                  <span style={{ color: '#22C55E' }}>✓</span>
                  {feature}
                </li>
              ))}
              {selectedPlan.features.length > 4 && (
                <li style={{ color: '#64748B', fontSize: 13 }}>
                  + {selectedPlan.features.length - 4} more features
                </li>
              )}
            </ul>
          </div>

          {/* Email Input */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 500 }}>
              Email Address
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p style={{ color: '#64748B', fontSize: 12, marginTop: 8 }}>
              Your business plan will be sent to this email
            </p>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 8,
              padding: 12,
              marginBottom: 24,
              color: '#EF4444',
              fontSize: 14
            }}>
              {error}
            </div>
          )}

          {/* Checkout Button */}
          <button 
            className="btn-checkout"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay $${selectedPlan.price} →`}
          </button>

          {/* Security Note */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 8, 
            marginTop: 16,
            color: '#64748B',
            fontSize: 13
          }}>
            <span>🔒</span>
            <span>Secured by Stripe</span>
          </div>
        </div>

        {/* Guarantee */}
        <div style={{ textAlign: 'center', color: '#64748B', fontSize: 13 }}>
          <p>💯 <strong>30-Day Money-Back Guarantee</strong></p>
          <p style={{ marginTop: 8 }}>Not satisfied? Get a full refund, no questions asked.</p>
        </div>
      </div>
    </div>
  );
}
