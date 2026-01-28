# Style Guide

Design system and component reference for Claude Travel Hub.

## Colors

### Primary Palette (Blue)
| Name | Tailwind Class | Hex | Usage |
|------|---------------|-----|-------|
| Primary | `primary-600` | #2563eb | Buttons, links, accents |
| Primary Light | `primary-100` | #dbeafe | Backgrounds, hover states |
| Primary Dark | `primary-700` | #1d4ed8 | Hover states, emphasis |
| Primary 50 | `primary-50` | #eff6ff | Subtle backgrounds |

### Accent Palette (Amber/Orange)
| Name | Tailwind Class | Hex | Usage |
|------|---------------|-----|-------|
| Accent | `accent-500` | #f59e0b | CTAs, featured badges, highlights |
| Accent Light | `accent-400` | #fbbf24 | Hover states |
| Accent Dark | `accent-600` | #d97706 | Active states |

### Neutral Palette
| Name | Tailwind Class | Hex | Usage |
|------|---------------|-----|-------|
| Gray 900 | `gray-900` | #111827 | Headings, footer bg |
| Gray 700 | `gray-700` | #374151 | Body text |
| Gray 600 | `gray-600` | #4b5563 | Secondary text |
| Gray 500 | `gray-500` | #6b7280 | Muted text, placeholders |
| Gray 200 | `gray-200` | #e5e7eb | Borders |
| Gray 100 | `gray-100` | #f3f4f6 | Card backgrounds |
| Gray 50 | `gray-50` | #f9fafb | Page backgrounds |

### Status Colors
| Status | Class | Usage |
|--------|-------|-------|
| Success | `green-500` | Confirmed bookings, positive |
| Error | `red-500` | Errors, cancelled |
| Warning | `yellow-500` | Pending, warnings |
| Info | `blue-500` | Information |

### Travel-Specific Colors
| Element | Color | Usage |
|---------|-------|-------|
| Rating Stars | `yellow-500` | Tour ratings |
| Price | `gray-900` or `primary-600` | Tour prices |
| Featured Badge | `accent-500` | Featured tour indicator |

## Typography

### Font
- **Primary Font**: Inter (via `next/font/google`)
- **Fallback**: System sans-serif

### Scale
| Element | Classes | Size | Weight |
|---------|---------|------|--------|
| Hero H1 | `text-4xl md:text-5xl font-bold` | 36-48px | 700 |
| Page H1 | `text-3xl md:text-4xl font-bold` | 30-36px | 700 |
| Section H2 | `text-2xl md:text-3xl font-bold` | 24-30px | 700 |
| Card H3 | `text-lg font-semibold` | 18px | 600 |
| Body | `text-base` | 16px | 400 |
| Small | `text-sm` | 14px | 400 |
| XSmall | `text-xs` | 12px | 400 |

## Component Classes

### Buttons

```html
<!-- Primary Button -->
<button class="btn-primary">Book Now</button>

<!-- Secondary Button -->
<button class="btn-secondary">View Details</button>

<!-- Outline Button -->
<button class="btn-outline">Learn More</button>

<!-- Accent Button (CTAs) -->
<button class="btn-accent">Get Started</button>
```

Button with icon:
```html
<button class="btn-primary flex items-center space-x-2">
  <SearchIcon class="h-5 w-5" />
  <span>Search Tours</span>
</button>
```

### Cards

```html
<!-- Tour Card -->
<div class="card group hover:shadow-lg transition-shadow">
  <div class="relative h-48 overflow-hidden">
    <img class="object-cover group-hover:scale-105 transition-transform duration-300" />
  </div>
  <div class="p-4">
    <!-- Content -->
  </div>
</div>
```

### Form Inputs

```html
<input type="text" class="input" placeholder="Search destinations..." />

<!-- Input with icon -->
<div class="relative">
  <MapPin class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
  <input class="input pl-10" />
</div>
```

### Navigation Links

```html
<a href="/tours" class="nav-link">Tours</a>
<a href="/about" class="nav-link active">About</a>
```

## Layout

### Container
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>
```

### Hero Section
```html
<section class="relative h-[600px] flex items-center justify-center">
  <div class="absolute inset-0">
    <img class="object-cover" />
    <div class="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />
  </div>
  <div class="relative z-10 max-w-7xl mx-auto px-4">
    <!-- Content -->
  </div>
</section>
```

### Tour Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Tour cards -->
</div>
```

### Two-Column Layout (Filters + Content)
```html
<div class="flex flex-col lg:flex-row gap-8">
  <aside class="hidden lg:block w-64 flex-shrink-0">
    <!-- Filters -->
  </aside>
  <main class="flex-1">
    <!-- Content -->
  </main>
</div>
```

## Spacing

### Standard Spacing
| Size | Pixels | Usage |
|------|--------|-------|
| `4` | 16px | Card gaps, small padding |
| `6` | 24px | Card padding, form gaps |
| `8` | 32px | Section gaps |
| `12` | 48px | Page section padding |
| `16` | 64px | Large section padding |

### Common Patterns
- Card padding: `p-4` or `p-6`
- Section padding: `py-12` or `py-16`
- Grid gaps: `gap-4` or `gap-6`
- Between sections: `mb-8` or `mb-12`

## Icons

Using **Lucide React**:

```tsx
import {
  MapPin,      // Location
  Calendar,    // Dates
  Users,       // Travelers
  Star,        // Ratings
  Heart,       // Wishlist
  ShoppingCart,// Cart
  Search,      // Search
  Plane,       // Logo/Travel
} from 'lucide-react'
```

### Icon Sizes
| Size | Classes | Usage |
|------|---------|-------|
| SM | `h-4 w-4` | Inline with text, metadata |
| MD | `h-5 w-5` | Buttons, form icons |
| LG | `h-6 w-6` | Navigation, headers |
| XL | `h-8 w-8` | Feature icons |

## Images

### Tour Images
- Card thumbnail: `h-48` with `object-cover`
- Detail hero: `h-[400px] md:h-[500px]`
- Gallery: `aspect-video` or `aspect-square`

### Image Hover Effect
```html
<div class="overflow-hidden">
  <img class="object-cover group-hover:scale-105 transition-transform duration-300" />
</div>
```

## Badges & Tags

### Featured Badge
```html
<span class="bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded">
  Featured
</span>
```

### Price Badge
```html
<span class="bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-semibold px-2 py-1 rounded">
  $1,299
</span>
```

### Status Badges
```html
<!-- Confirmed -->
<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
  Confirmed
</span>

<!-- Pending -->
<span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
  Pending
</span>
```

## Rating Display

```html
<div class="flex items-center text-yellow-500 text-sm">
  <Star class="h-4 w-4 mr-1 fill-current" />
  4.8
</div>
```

## Price Display

```html
<!-- Card price -->
<p class="text-lg font-bold text-gray-900">$1,299</p>

<!-- Detail page price -->
<p class="text-3xl font-bold text-gray-900">$1,299</p>
<p class="text-gray-500 text-sm">per person</p>
```

## Animations

### Defined in globals.css
- `.animate-fadeIn` - Fade in with upward movement (0.3s)
- `.animate-slideUp` - Slide up animation (0.5s)

### Loading States
```html
<!-- Skeleton -->
<div class="animate-pulse">
  <div class="h-48 bg-gray-200" />
  <div class="p-4 space-y-3">
    <div class="h-4 bg-gray-200 rounded w-1/3" />
    <div class="h-6 bg-gray-200 rounded w-2/3" />
  </div>
</div>

<!-- Spinner -->
<Loader2 class="h-8 w-8 animate-spin text-primary-600" />
```

### Chat Typing Indicator
```html
<div class="flex space-x-1">
  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms" />
  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms" />
  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms" />
</div>
```

## Responsive Breakpoints

| Prefix | Min Width | Common Usage |
|--------|-----------|--------------|
| (none) | 0px | Mobile first |
| `sm:` | 640px | Mobile landscape |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Large desktop |

### Mobile Patterns
```html
<!-- Stack on mobile, row on tablet+ -->
<div class="flex flex-col md:flex-row gap-4">

<!-- Full width on mobile, sidebar on desktop -->
<aside class="hidden lg:block w-64">

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## Shadows & Borders

### Shadows
| Class | Usage |
|-------|-------|
| `shadow-sm` | Cards, inputs |
| `shadow-lg` | Hover states, dropdowns |
| `shadow-xl` | Modals, search form |

### Borders
```html
<div class="border border-gray-100">  <!-- Subtle -->
<div class="border border-gray-200">  <!-- Default -->
<div class="border border-gray-300">  <!-- Inputs -->
```

## Z-Index Scale

| Class | Value | Usage |
|-------|-------|-------|
| `z-10` | 10 | Dropdowns |
| `z-20` | 20 | Sticky elements |
| `z-50` | 50 | Header, modals |

---

*Last updated: January 2026*
