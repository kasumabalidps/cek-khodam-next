import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar'

// Lazy load DeveloperHero component
const DeveloperHero = dynamic(() => import('../components/DeveloperHero'), {
    loading: () => (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    )
})

export default function Developer() {
    return (
        <main>
            <Navbar />
            <DeveloperHero />
        </main>
    )
}