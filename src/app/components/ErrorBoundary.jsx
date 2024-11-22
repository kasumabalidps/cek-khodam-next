'use client'

import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-10">
          <h2 className="text-2xl text-red-500">Oops, terjadi kesalahan!</h2>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Coba Lagi
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 