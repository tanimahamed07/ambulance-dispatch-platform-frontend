# 🚑 Ambulance Dispatch Platform

<div align="center">

![Ambulance Dispatch Platform](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**A modern, real-time emergency medical dispatch system built with Next.js**

[Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [User Roles](#-user-roles)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

The **Ambulance Dispatch Platform** is a comprehensive emergency medical service management system designed to streamline ambulance dispatch operations, improve response times, and enhance patient care coordination. The platform connects callers, dispatchers, drivers, and administrators in a unified ecosystem.

### Key Capabilities

- 🚨 **Real-time Emergency Requests** - Instant ambulance booking with live tracking
- 🗺️ **Interactive Mapping** - Leaflet-based location tracking and route optimization
- 👥 **Multi-Role Dashboard** - Customized interfaces for Callers, Dispatchers, Drivers, and Admins
- 💳 **Payment Integration** - Secure payment processing and history tracking
- 📊 **Analytics & Reporting** - Comprehensive insights and performance metrics
- 🔐 **Secure Authentication** - JWT-based auth with Google OAuth support

---

## ✨ Features

### For Callers (Patients/Public)

- ✅ Quick ambulance request with location selection
- ✅ Real-time ambulance tracking
- ✅ Emergency history and status monitoring
- ✅ Payment processing and history
- ✅ Driver application submission

### For Dispatchers

- ✅ Emergency request management dashboard
- ✅ Ambulance and driver assignment
- ✅ Real-time dispatch coordination
- ✅ Status updates and notifications
- ✅ Route optimization tools

### For Drivers

- ✅ Active trip management
- ✅ Navigation and route guidance
- ✅ Trip history and earnings
- ✅ Payment tracking
- ✅ Profile management

### For Administrators

- ✅ User and role management
- ✅ Ambulance fleet management
- ✅ Hospital network administration
- ✅ Driver application review
- ✅ System analytics and reports
- ✅ Platform configuration

---

## 🛠️ Tech Stack

### Frontend Core

- **[Next.js 16.3.5](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.8](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon set
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support

### State & Data Management

- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[TanStack Form](https://tanstack.com/form)** - Type-safe form handling
- **[Zod](https://zod.dev/)** - Schema validation
- **[ofetch](https://github.com/unjs/ofetch)** - HTTP client

### Maps & Location

- **[Leaflet](https://leafletjs.com/)** - Interactive maps
- **[React Leaflet](https://react-leaflet.js.org/)** - React bindings for Leaflet

### Authentication

- **[@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)** - Google OAuth integration

### Development Tools

- **[Biome](https://biomejs.dev/)** - Fast linter and formatter
- **[Bun](https://bun.sh/)** - JavaScript runtime and package manager

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.x
- **Bun** >= 1.4.2 (recommended) or **npm** / **yarn** / **pnpm**
- **Git**

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ambulance-dispatch-platform-frontend
```

### 2. Install Dependencies

```bash
bun install
# or
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your environment variables (see [Environment Variables](#-environment-variables) section).

### 4. Run Development Server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
bun run build
bun start
```

---

## 📁 Project Structure

```
ambulance-dispatch-platform-frontend/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Authentication pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── (dashboard)/         # Dashboard layouts
│   │   │   ├── admin/          # Admin dashboard
│   │   │   ├── caller/         # Caller dashboard
│   │   │   ├── dispatcher/     # Dispatcher dashboard
│   │   │   └── driver/         # Driver dashboard
│   │   ├── (public)/           # Public pages
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   │
│   ├── components/              # React components
│   │   ├── form/               # Form components
│   │   ├── layout/             # Layout components
│   │   ├── models/             # Modal components
│   │   ├── home/               # Landing page components
│   │   ├── profile/            # Profile components
│   │   └── ui/                 # Shadcn UI components
│   │
│   ├── api/                     # API client functions
│   │   ├── auth.api.ts
│   │   ├── emergency.api.ts
│   │   ├── dispatch.api.ts
│   │   ├── ambulance.api.ts
│   │   ├── driver.api.ts
│   │   ├── hospital.api.ts
│   │   ├── payment.api.ts
│   │   ├── analytics.api.ts
│   │   └── index.ts
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── auth.hooks.ts
│   │   ├── emergency.hooks.ts
│   │   └── driver.hooks.ts
│   │
│   ├── lib/                     # Utility libraries
│   │   ├── apiClient.ts        # HTTP client setup
│   │   └── utils.ts            # Helper functions
│   │
│   ├── providers/               # React context providers
│   │   └── index.tsx
│   │
│   ├── routes/                  # Route configurations
│   │   ├── adminRoutes.ts
│   │   ├── callerRoutes.ts
│   │   ├── dispatcherRoutes.ts
│   │   └── driverRoutes.ts
│   │
│   ├── types/                   # TypeScript type definitions
│   │   ├── user.types.ts
│   │   ├── dispatch.type.ts
│   │   └── ...
│   │
│   └── middleware.ts            # Next.js middleware
│
├── public/                      # Static assets
├── .env.local                   # Environment variables (not committed)
├── components.json              # Shadcn configuration
├── biome.json                   # Biome configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies
```

---

## 👥 User Roles

### 1. **Caller** (Patient/Public User)

- Request emergency ambulance services
- Track ambulance in real-time
- View emergency history
- Make payments
- Apply to become a driver

### 2. **Dispatcher**

- Manage incoming emergency requests
- Assign ambulances to emergencies
- Coordinate with drivers
- Monitor active dispatches
- Update emergency statuses

### 3. **Driver**

- Accept/reject trip assignments
- Navigate to pickup/destination
- Update trip status
- View earnings and payment history
- Manage availability

### 4. **Administrator**

- Manage all users and roles
- Oversee ambulance fleet
- Review driver applications
- Configure hospitals
- Access system analytics
- Platform-wide settings

---

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_API_VERSION=v1

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here

# Map Configuration
NEXT_PUBLIC_MAP_API_KEY=your_map_api_key_here
NEXT_PUBLIC_DEFAULT_LAT=23.8103
NEXT_PUBLIC_DEFAULT_LNG=90.4125

# App Configuration
NEXT_PUBLIC_APP_NAME="Ambulance Dispatch Platform"
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Payment Gateway (if applicable)
NEXT_PUBLIC_PAYMENT_GATEWAY_KEY=your_payment_key_here
```

---

## 💻 Development

### Available Scripts

```bash
# Start development server
bun dev

# Build for production
bun run build

# Start production server
bun start

# Run linter
bun run lint

# Format code
bun run format
```

### Code Quality

This project uses **Biome** for linting and formatting:

```bash
# Check code quality
bun run lint

# Auto-fix issues
bun run format
```

### Adding New Components

Use Shadcn CLI to add new UI components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

---

## 🔌 API Integration

The platform integrates with a backend API. All API calls are centralized in the `src/api/` directory.

### API Client Setup

```typescript
// src/lib/apiClient.ts
import { ofetch } from "ofetch";

export const apiClient = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  onRequest({ options }) {
    const token = localStorage.getItem("authToken");
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  },
});
```

### Example API Usage

```typescript
// src/api/emergency.api.ts
import { apiClient } from "@/lib/apiClient";

export const emergencyApi = {
  create: (data: EmergencyRequest) =>
    apiClient("/emergencies", { method: "POST", body: data }),

  getAll: () => apiClient("/emergencies"),

  getById: (id: string) => apiClient(`/emergencies/${id}`),
};
```

---

## 🚀 Deployment

### Deploy on Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy!

### Build Optimization

```bash
# Production build
bun run build

# Analyze bundle size
bun run build && npx @next/bundle-analyzer
```

### Environment-Specific Builds

```bash
# Development
bun dev

# Production
bun run build && bun start
```

---

## 🎨 Customization

### Theme Configuration

Edit `src/app/globals.css` to customize colors:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    /* ... more theme variables */
  }
}
```

### Component Customization

All Shadcn components are in `src/components/ui/` and can be modified directly.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Use Biome for formatting
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For support, email support@ambulancedispatch.com or join our Slack channel.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Vercel](https://vercel.com/) - Deployment platform
- [TanStack](https://tanstack.com/) - Powerful data management tools
- [Leaflet](https://leafletjs.com/) - Open-source mapping library

---

<div align="center">

**Built with ❤️ for better emergency medical services**

[⬆ Back to Top](#-ambulance-dispatch-platform)

</div>
