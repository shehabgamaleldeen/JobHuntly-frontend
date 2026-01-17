# 🎯 JobHuntly - Frontend

> A modern, feature-rich job search platform built with React 19, TypeScript, and Tailwind CSS

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

## 📖 Overview

JobHuntly Frontend is the client-side application of a comprehensive job search platform that connects job seekers with recruiters. Built with cutting-edge technologies, it provides an intuitive, responsive, and feature-rich user experience for browsing jobs, managing applications, and company recruitment workflows.

**🔗 Related Repositories:**
- [Backend API](https://github.com/shehabgamaleldeen/JobHuntly-Backend) - Express.js REST API
- [Admin Dashboard](https://github.com/shehabgamaleldeen/JobHuntly-Admin) - Next.js Admin Panel

## ✨ Key Features

### For Job Seekers 👨‍💼
- **Advanced Job Search** - Filter by location, salary, job type, experience level
- **Company Discovery** - Browse and explore company profiles
- **Application Tracking** - Monitor application status in real-time
- **Profile Management** - Create and customize professional profiles
- **Resume Upload** - PDF resume viewing and management
- **Real-time Notifications** - Get instant updates via Socket.io
- **Premium Subscriptions** - Stripe-powered payment integration

### For Recruiters 🏢
- **Company Dashboard** - Comprehensive analytics and insights
- **Job Posting** - Multi-step job creation wizard
- **Applicant Management** - Review applications, resumes, and Q&A responses
- **Application Tracking** - Track and manage candidate pipeline
- **Company Profile** - Showcase company culture and benefits
- **Real-time Updates** - Instant notifications for new applications

## 🛠️ Tech Stack

### Core
- **React 19.2.0** - Latest React with concurrent features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.2.4** - Lightning-fast build tool
- **React Router 7.9.6** - Client-side routing

### UI & Styling
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Shadcn UI** - Accessible component library (Radix UI)
- **Lucide React** - Beautiful icon library
- **FontAwesome** - Additional icon support

### State & Forms
- **React Hook Form 7.68.0** - Performant form validation
- **Yup 1.7.1** - Schema validation
- **React Select 5.10.2** - Advanced select components

### Data & API
- **Axios 1.13.2** - HTTP client with interceptors
- **Socket.io Client 4.8.3** - Real-time bidirectional communication

### Additional Features
- **Stripe.js 8.6.0** - Payment processing
- **React PDF 10.2.0** - PDF viewing capabilities
- **Recharts 3.5.0** - Data visualization
- **Sonner 2.0.7** - Toast notifications
- **Day.js 1.11.19** - Date manipulation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Backend API running (see [Backend Repository](https://github.com/shehabgamaleldeen/JobHuntly-Backend))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MoazRyhan/JobHuntly-frontend.git
cd JobHuntly-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. **Run development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Applicants/          # Job seeker components
│   │   ├── LandingPage/
│   │   ├── FindJobs/
│   │   ├── JobDescriptions/
│   │   ├── MyApplications/
│   │   └── DashboardSettings/
│   ├── Recruiters/          # Recruiter components
│   │   ├── Dashboard/
│   │   ├── JobCreate/
│   │   ├── JobListing/
│   │   ├── Applicants/
│   │   └── DashboardSettings/
│   ├── Basic/               # Shared components
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   └── NotFoundPage/
│   ├── Premium/             # Payment & premium features
│   └── ui/                  # Shadcn UI components
├── features/                # Feature-based modules
│   └── auth/                # Authentication logic
├── hooks/                   # Custom React hooks
├── services/                # API service layer
├── types/                   # TypeScript type definitions
├── context/                 # React Context providers
└── lib/                     # Utility functions
```

## 🔐 Authentication

The application uses JWT-based authentication with:
- Secure token storage
- Automatic token refresh
- Protected routes for authenticated users
- Role-based access control (Job Seeker / Recruiter)

## 🎨 UI/UX Highlights

- **Responsive Design** - Mobile-first approach, works on all devices
- **Accessibility** - WCAG compliant with Radix UI primitives
- **Dark Mode Ready** - Tailwind CSS theming support
- **Smooth Animations** - Polished user interactions
- **Form Validation** - Real-time validation with helpful error messages
- **Loading States** - Skeleton loaders and optimistic UI updates

## 🔌 API Integration

All API calls are centralized in the `services/` directory with:
- Axios interceptors for authentication
- Error handling and retry logic
- Type-safe request/response interfaces
- Environment-based configuration

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.2.0 | UI library |
| typescript | 5.9.3 | Type safety |
| tailwindcss | 4.1.17 | Styling |
| react-router-dom | 7.9.6 | Routing |
| axios | 1.13.2 | HTTP client |
| socket.io-client | 4.8.3 | Real-time updates |
| @stripe/stripe-js | 8.6.0 | Payments |
| react-hook-form | 7.68.0 | Form management |

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
The project is optimized for deployment on:
- **Vercel** (Recommended)
- **Netlify**
- Any static hosting service

Environment variables must be configured in your hosting platform.

## 🤝 Contributing

This is a capstone project for the NTI Full-Stack Development Program. Contributions, issues, and feature requests are welcome!

## 👨‍💻 Authors

**Shehab Gamal El-Deen**
- GitHub: [shehabgamaleldeen](https://github.com/shehabgamaleldeen)
- LinkedIn: [Shehab Gamal El-Deen](https://www.linkedin.com/in/shehabgamaleldeen/)

## 📄 License

This project is part of the NTI Open-Source Applications Developer Program.

## 🙏 Acknowledgments

- National Telecommunication Institute (NTI)
- Open-Source Applications Developer Program
- All team members and instructors

---

**⭐ If you find this project helpful, please give it a star!**
