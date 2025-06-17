# Birthday Website

## Overview

This is a celebratory birthday website for "Dadavai" featuring interactive elements, animations, and a festive atmosphere. The application is built as a static website using vanilla HTML, CSS, and JavaScript with animated particles, interactive cake candles, and background music capabilities.

## System Architecture

### Frontend Architecture
- **Static Website**: Pure HTML/CSS/JavaScript without any backend framework
- **Single Page Application**: All functionality contained within a single HTML page
- **Component-based JavaScript**: Object-oriented JavaScript classes for managing interactive features
- **CSS Animations**: Heavy use of CSS transitions and animations for visual effects
- **Canvas-based Graphics**: HTML5 Canvas for particle systems and visual effects

### Technology Stack
- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Modern CSS with Flexbox/Grid, custom properties, and animations
- **Vanilla JavaScript**: ES6+ classes and modern JavaScript features
- **Google Fonts**: External font loading for typography
- **Font Awesome**: Icon library for UI elements
- **HTML5 Canvas**: For particle effects and animations

## Key Components

### 1. Particle System (`particles.js`)
- **SparkleParticle Class**: Manages individual sparkle effects
- **Purpose**: Creates animated background sparkles with random colors and movement
- **Features**: Lifecycle management, color variations, opacity animations

### 2. Main Interactive Controller (`script.js`)
- **BirthdayWebsite Class**: Central controller for all interactive features
- **Candle Interaction**: Click-to-blow-out candle functionality
- **Music Control**: Toggle background music on/off
- **Animation Management**: Coordinates confetti, floating elements, and other effects

### 3. Visual Design (`styles.css`)
- **Responsive Design**: Mobile-first approach with flexible layouts
- **CSS Animations**: Keyframe animations for floating, bouncing effects
- **Modern CSS**: Uses CSS Grid, Flexbox, and custom properties
- **Glass Morphism**: Backdrop blur effects for modern UI elements

### 4. HTML Structure (`index.html`)
- **Semantic Markup**: Proper use of HTML5 semantic elements
- **Accessibility**: Screen reader friendly structure
- **External Resources**: Google Fonts and Font Awesome integration

## Data Flow

### User Interaction Flow
1. **Page Load**: Automatic initialization of particle systems and animations
2. **Music Toggle**: User can enable/disable background music
3. **Candle Interaction**: Users click candles to "blow them out"
4. **Balloon Pop**: Interactive balloon elements respond to clicks
5. **Cake Animation**: Central cake element triggers special effects

### Event Management
- **Click Events**: Handled through event delegation and direct listeners
- **Animation Loops**: RequestAnimationFrame for smooth 60fps animations
- **State Management**: Simple object properties track interaction states

## External Dependencies

### CDN Resources
- **Google Fonts**: Fredoka One and Dancing Script typography
- **Font Awesome 6.0.0**: Icon library for UI elements
- **Audio Source**: External sound file for background music (with fallback)

### Browser APIs
- **HTML5 Canvas**: For particle rendering and animations
- **Web Audio API**: Background music playback
- **CSS Animations**: Hardware-accelerated transitions

## Deployment Strategy

### Static File Serving
- **Python HTTP Server**: Simple development server using `python -m http.server`
- **Port Configuration**: Runs on port 5000
- **Static Assets**: All files served as static content
- **No Build Process**: Direct file serving without compilation

### Replit Configuration
- **Multi-language Support**: Node.js 20 and Python 3.11 modules
- **Workflow Automation**: Parallel execution setup
- **Development Server**: Python HTTP server for local development

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 17, 2025. Initial setup
- June 17, 2025. Added starry night background with floating hearts and polaroid photo gallery
- June 17, 2025. Enhanced "Happy Birthday" text with bright glowing effects
- June 17, 2025. Added 1-minute countdown timer that reveals birthday celebration at 12:00:00

## Development Notes

### File Structure
- `index.html`: Main page structure and content
- `styles.css`: All styling and animations
- `script.js`: Main interactive functionality
- `particles.js`: Particle system implementation
- `.replit`: Replit environment configuration

### Performance Considerations
- **Canvas Optimization**: Efficient particle lifecycle management
- **Animation Performance**: Uses requestAnimationFrame for smooth animations
- **Resource Loading**: Lazy loading of audio and external resources

### Browser Compatibility
- **Modern Browsers**: Requires ES6+ support
- **Canvas Support**: Requires HTML5 Canvas API
- **Audio Fallback**: Graceful degradation for unsupported audio formats
