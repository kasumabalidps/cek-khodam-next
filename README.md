# Khodam Checker

A modern web application built with Next.js for exploring and checking "khodam" (spiritual guardians). This project combines mystical concepts with contemporary web technology to create an engaging user experience.

## Features

- **Interactive Khodam Checking**: User-friendly interface for exploring spiritual connections
- **Khodam List View**: Browse and learn about different types of spiritual guardians
- **Developer Information**: Dedicated section about the project and its creators
- **Modern UI/UX**: Responsive design with Tailwind CSS styling
- **Database Integration**: Powered by Supabase for data management

## Tech Stack

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Assets**: SVG icons and graphics

## Project Structure

```
├── public/          # Static assets (SVG files)
├── src/
│   ├── app/        # Next.js application files
│   │   ├── components/    # React components
│   │   ├── developer/    # Developer page
│   │   ├── listkhodam/   # Khodam list page
│   │   └── globals.css   # Global styles
│   └── utils/      # Utility functions
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kasumabalidps/cek-khodam-next.git
   cd cek-khodam-next
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file with your Supabase credentials

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser

## Components

- `KhodamCard`: Main interface for khodam checking
- `KhodamListCard`: Displays list of available khodam
- `DeveloperHero`: Information about the development team
- `Navbar`: Navigation component

## License

This project is intended for entertainment and educational purposes only. Use responsibly!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
