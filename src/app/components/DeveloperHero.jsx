function DeveloperHero() {
    return (
        <div className="relative">
            {/* Backdrop blur effect */}
            <div className="absolute inset-0 backdrop-blur-lg z-0" />

            <div className="relative max-w-6xl mx-auto py-12 px-4 z-10">
                {/* Profile Section with enhanced styling */}
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-lg shadow-blue-500/20">
                        <img 
                            src="https://github.com/kasumabalidps.png" 
                            alt="Developer Profile"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="text-white text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white text-transparent bg-clip-text">Kasuma BaliDps</h1>
                        <p className="text-gray-300 text-xl mb-6">Full Stack Developer</p>
                        <div className="flex gap-6 justify-center md:justify-start">
                            <a href="https://github.com/kasumabalidps" target="_blank" rel="noopener noreferrer" 
                               className="text-white hover:text-blue-400 transition-colors duration-300">
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
                            </a>
                            <a href="https://www.linkedin.com/in/i-putu-ananda-kasuma-222810328" target="_blank" rel="noopener noreferrer" 
                               className="text-white hover:text-blue-400 transition-colors duration-300">
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Tech Stack Section with modern cards */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b border-blue-800/30 pb-2">Tech Stack</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['React', 'Next.js', 'TailwindCSS', 'Node.js', 'PostgreSQL', 'TypeScript', 'Python', 'Git'].map((tech) => (
                            <div key={tech} 
                                 className="bg-gray-900/80 backdrop-blur-xl text-white p-6 rounded-xl border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 shadow-xl hover:shadow-blue-500/10">
                                <p className="text-center font-medium">{tech}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* GitHub Contributions with enhanced styling */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b border-blue-500/20 pb-2 tracking-tight">GitHub Contributions</h2>
                    <div className="bg-gradient-to-b from-gray-900/50 to-black/50  backdrop-blur-xl p-8 rounded-2xl border border-gray-800/50 shadow-2xl hover:border-blue-500/30 transition-all duration-300">
                        <div className="rounded-xl p-4">
                            <img 
                                src={`https://ghchart.rshah.org/0891b2/kasumabalidps`}
                                alt="GitHub Contributions"
                                className="w-full opacity-90 hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeveloperHero;