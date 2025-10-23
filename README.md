# Assets Directory Structure

This directory contains all the assets used in the UniBookIt application.

## 📁 Directory Structure

```
src/assets/
├── icons/           # SVG icons and small graphics
├── images/          # Photos, logos, and raster images
├── illustrations/   # Custom illustrations and graphics
└── README.md       # This file
```

## 🎯 Usage Guidelines

### Icons (`src/assets/icons/`)
- **Purpose**: Small SVG icons, UI elements, buttons
- **Format**: SVG preferred, PNG for complex icons
- **Naming**: `icon-name.svg` (kebab-case)
- **Examples**: `menu.svg`, `close.svg`, `arrow-right.svg`

### Images (`src/assets/images/`)
- **Purpose**: Photos, logos, hero images
- **Format**: JPG, PNG, WebP
- **Naming**: `image-name.jpg` (kebab-case)
- **Examples**: `hero-student.jpg`, `logo.png`, `university-building.jpg`

### Illustrations (`src/assets/illustrations/`)
- **Purpose**: Custom graphics, diagrams, illustrations
- **Format**: SVG preferred for scalability
- **Naming**: `illustration-name.svg` (kebab-case)
- **Examples**: `student-with-books.svg`, `university-campus.svg`

## 📦 Public Assets

```
public/
├── icons/           # Static icons (favicon, etc.)
├── images/          # Static images
└── illustrations/   # Static illustrations
```

## 🔧 Import Examples

### In React Components:
```tsx
// Import SVG as component
import StudentIllustration from '@/assets/illustrations/student-with-books.svg';

// Import as URL
import heroImage from '@/assets/images/hero-student.jpg';

// Usage
<img src={heroImage} alt="Student" />
<StudentIllustration className="w-64 h-64" />
```

### In CSS:
```css
.hero-section {
  background-image: url('/icons/hero-pattern.svg');
}
```

## 📏 Image Guidelines

- **Icons**: 16x16, 24x24, 32x32, 48x48px
- **Images**: Optimized for web (WebP when possible)
- **Illustrations**: Vector format (SVG) for scalability
- **Max file size**: 500KB for images, 100KB for icons

## 🎨 Design System Integration

All assets should follow the UniBookIt design system:
- **Colors**: Use the defined color palette
- **Style**: Consistent with the overall design
- **Accessibility**: Proper alt text and ARIA labels
