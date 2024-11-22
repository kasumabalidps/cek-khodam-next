'use client'

import React, { memo } from 'react'
import Image from 'next/image'

const DeveloperHero = memo(function DeveloperHero() {
    return (
        <div className="relative min-h-screen">
            {/* Background dengan optimasi */}
            <div 
                className="fixed inset-0 bg-gray-900/95"
                style={{ willChange: 'transform' }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
                <div className="space-y-8">
                    {/* Profile Section */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative w-48 h-48 md:w-64 md:h-64">
                            <Image
                                src="/profile.jpg"
                                alt="Developer Profile"
                                width={256}
                                height={256}
                                className="rounded-full border-4 border-blue-500/30"
                                priority
                                loading="eager"
                            />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Kasuma Bali
                            </h1>
                            <p className="text-xl text-gray-300 mb-6">
                                Full Stack Developer & UI/UX Designer
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                {['Next.js', 'React', 'TailwindCSS', 'Node.js'].map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* GitHub Contributions dengan lazy loading */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-white mb-8 border-b border-blue-500/20 pb-2">
                            GitHub Contributions
                        </h2>
                        <div className="bg-gradient-to-b from-gray-900/50 to-black/50 p-8 rounded-2xl border border-gray-800/50 shadow-2xl">
                            <div className="rounded-xl p-4">
                                <img 
                                    src={`https://ghchart.rshah.org/0891b2/kasumabalidps`}
                                    alt="GitHub Contributions"
                                    className="w-full opacity-90 hover:opacity-100 transition-opacity"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Project Stats dengan CSS optimasi */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        {[
                            { label: 'Projects', value: '15+' },
                            { label: 'Experience', value: '2+ Years' },
                            { label: 'Clients', value: '10+' }
                        ].map(({ label, value }) => (
                            <div
                                key={label}
                                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50"
                                style={{ 
                                    transform: 'translateZ(0)',
                                    willChange: 'transform'
                                }}
                            >
                                <h3 className="text-2xl font-bold text-white">{value}</h3>
                                <p className="text-gray-400">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
})

export default DeveloperHero