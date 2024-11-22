'use client'

import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl">
            <h2 className="text-2xl text-red-500 mb-4">Oops, terjadi kesalahan!</h2>
            <p className="text-gray-400 mb-6">{this.state.error?.message || 'Terjadi kesalahan yang tidak diketahui'}</p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.reload()
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 