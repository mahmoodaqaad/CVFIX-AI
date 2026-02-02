# CVFix AI

A modern, AI-powered web application that helps job seekers transform their resumes with professional wording, stronger descriptions, and polished content.

![CVFix AI](https://img.shields.io/badge/Next.js-16.1.4-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

- 🎨 **Modern 2026 Design** - Clean, minimal interface with soft colors
- 🌓 **Dark Mode** - Automatic theme detection with manual toggle
- ✍️ **Resume Input** - Paste or type your resume content
- 🎯 **Smart Preferences** - Select job field and experience level
- 🤖 **AI-Powered** - Intelligent resume improvement suggestions
- 📋 **Copy & Download** - Easy export of improved content
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Smooth Animations** - Delightful user experience

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cvfix-ai

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
cvfix-ai/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── Header.tsx       # Header component
│   │   ├── Footer.tsx       # Footer component
│   │   └── ThemeToggle.tsx  # Theme switcher
│   └── lib/
│       └── utils.ts         # Utility functions
├── public/                  # Static assets
└── package.json
```

## 🎨 Design System

### Colors

**Light Mode**
- Primary: `#6366f1` (Indigo)
- Background: `#fafafa`
- Card: `#ffffff`

**Dark Mode**
- Primary: `#818cf8` (Light Indigo)
- Background: `#0f0f0f`
- Card: `#1a1a1a`

### Typography
- Font: Geist Sans & Geist Mono
- Smooth transitions and animations

## 📝 Usage

1. **Paste Your Resume** - Copy your existing resume content into the textarea
2. **Select Preferences** - Choose your job field and experience level
3. **Improve** - Click "Improve My Resume" and wait for AI processing
4. **Export** - Copy to clipboard or download as a text file

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

Or manually:

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

No environment variables required for basic functionality. For production AI integration, you may need:

```env
OPENAI_API_KEY=your_api_key_here
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Made with ❤️ for job seekers, students, and junior developers**
