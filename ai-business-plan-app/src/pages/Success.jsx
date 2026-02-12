import { useNavigate } from 'react-router-dom'

export default function Success() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-dark-400 mb-8">
          Thank you for your purchase. You can now access your full business plan and analysis.
        </p>
        
        <button 
          onClick={() => navigate('/results')}
          className="btn-primary"
        >
          View Your Results →
        </button>
      </div>
    </div>
  )
}
