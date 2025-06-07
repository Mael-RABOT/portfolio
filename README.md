# 🖥️ Terminal Portfolio

A retro terminal-themed portfolio website built with React, TypeScript, and Vite. Experience a nostalgic TUI (Text User Interface) aesthetic with modern web technologies and dynamic GitHub integration.

## ✨ Features

### 🎨 Terminal Aesthetic
- **Retro CRT Monitor Effects**: Scanlines, phosphor glow, and authentic terminal styling
- **ASCII Art Integration**: Custom computer graphics and dividers
- **Glitch Effects**: Dynamic text animations on the 404 page
- **Blinking Cursors**: Authentic terminal experience throughout
- **Custom TUI Icon**: Hand-crafted SVG terminal icon with Matrix-style effects

### 🚀 Dynamic GitHub Integration
- **Real-time Repository Data**: Live fetching of stars, forks, and last commit information
- **File Structure Display**: Shows actual repository contents (1-2 levels deep)
- **Smart Caching**: 5-minute cache system to respect GitHub API limits
- **Batch Processing**: Efficient API calls with rate limiting
- **Fallback Systems**: Graceful handling of unavailable repositories

### 🌐 Internationalization
- **Bilingual Support**: English and French translations
- **Dynamic Language Switching**: Seamless i18n integration
- **Localized Content**: All project data and UI elements translated

### ⌨️ Navigation
- **Keyboard Shortcuts**: F1-F4 keys for quick navigation
  - **F1**: Home
  - **F2**: Projects
  - **F3**: Resume
  - **F4**: Contact
- **Interactive Terminal Cards**: Click-to-navigate project cards
- **Custom 404 Page**: Terminal-themed error page with recovery options

### 📊 Content Sections
- **Home**: Introduction with ASCII art and system information
- **Projects**: 10+ real projects with GitHub integration and organization links
- **Resume**: Professional background and skills
- **Contact**: Communication channels and social links
- **Organizations**: ASM-Studios and Sentience-Robotics collaboration info

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Custom CSS with CSS Variables for theming
- **Routing**: React Router DOM
- **Internationalization**: react-i18next
- **API Integration**: GitHub REST API
- **Icons**: Custom SVG + Emoji-based icons

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional but recommended)
   ```bash
   cp .env.example .env
   ```

   Add your GitHub Personal Access Token to `.env`:
   ```env
   VITE_GITHUB_TOKEN=your_github_token_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

### GitHub API Setup

To enable full GitHub integration and avoid rate limits:

1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Generate a new token (classic) with `public_repo` scope
3. Add the token to your `.env` file as `VITE_GITHUB_TOKEN`
4. This increases your rate limit from 60 to 5,000 requests/hour

## 📁 Project Structure

```
src/
├── Components/
│   ├── ASCII/           # ASCII art components
│   └── Terminal/        # Terminal UI components
├── Pages/
│   ├── Home.tsx         # Landing page
│   ├── Projects.tsx     # Projects showcase
│   ├── Resume.tsx       # Professional background
│   ├── Contact.tsx      # Contact information
│   └── NotFound.tsx     # 404 error page
├── services/
│   └── githubApi.ts     # GitHub API integration
├── i18n/               # Internationalization
└── styles/             # CSS styling

public/
├── locales/            # Translation files
│   ├── en/            # English translations
│   └── fr/            # French translations
└── terminal-icon.svg   # Custom favicon
```

## 🎮 Usage

### Navigation
- **Mouse**: Click on navigation items or project cards
- **Keyboard**: Use F1-F4 function keys for quick navigation
- **Language**: Toggle between English and French in the terminal header

### Features
- **Live GitHub Data**: Project cards show real-time repository statistics
- **File Structures**: Expand project cards to see actual repository contents
- **Organizations**: Learn about collaborative projects through organization links
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization
- **Colors**: Modify CSS variables in `App.css`
- **Content**: Update translation files in `public/locales/`
- **Projects**: Edit `data.json` files for project information
- **GitHub Repos**: Update repository URLs in the data files

### Adding New Projects
1. Add project data to `public/locales/en/data.json`
2. Add French translations to `public/locales/fr/data.json`
3. Ensure GitHub repository URLs are correct for API integration

## 🌟 Key Features Explained

### GitHub API Integration
The portfolio dynamically fetches real-time data from GitHub repositories, including:
- Repository statistics (stars, forks, watchers)
- Last commit information
- File structure visualization
- Repository descriptions and topics

### Terminal Theming
Authentic terminal experience with:
- Monospace fonts throughout
- Green-on-black color scheme
- CRT monitor effects (scanlines, glow)
- Blinking cursors and typing animations
- ASCII art and box-drawing characters

### Performance Optimizations
- API response caching (5-minute intervals)
- Batch processing of GitHub requests
- Lazy loading of repository data
- Optimized re-renders with React hooks

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Android Chrome
- **Features**: CSS Grid, Flexbox, CSS Variables, ES6+

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to:
- Open issues for bugs or suggestions
- Suggest new features or improvements
- Share feedback on the terminal aesthetic

## 📧 Contact

- **GitHub**: [Your GitHub Profile]
- **LinkedIn**: [Your LinkedIn Profile]
- **Email**: [Your Email]

## 📄 License

This project is open source and available under the [GPL-3.0 License](LICENSE).

---

**Built with ❤️ and lots of ☕**

*Experience the nostalgia of computing's golden age with modern web technology.*
