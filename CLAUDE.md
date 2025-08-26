# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**QIVO SYSTEM** is a cloud-based administrative system specialized in comprehensive management of inventory, sales and finances for Apple product companies, with special focus on used and new equipment. This is a production-ready business application for Apple device resellers in Argentina.

### Business Context
- **Target Market**: Apple device resellers and refurbishers
- **Primary Focus**: Used Apple devices (iPhone, iPad, MacBook, etc.)
- **Geographic Focus**: Argentina (ARS/USD currency tracking)
- **Key Features**: Inventory management, batch purchasing, warranty tracking, financial reporting
- **Integrations**: ARCA billing, OCA shipping, MercadoPago payments, USD quote tracking

## Development Commands

### Core Development
- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Operations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio for database management
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations

## Architecture

### Database Schema
The system uses PostgreSQL with Prisma ORM. Key entities include:

- **Users**: Role-based authentication (ADMIN_FULL, ADMIN, SELLER)
- **Products**: Apple devices with inventory tracking, conditions, and pricing
- **Batches**: Purchase lots linked to suppliers
- **Sales**: Complete sales workflow with items and payment tracking
- **Budgets**: Quote system with approval workflow
- **Financial Movements**: Income/expense tracking with currency support
- **Web Module**: Future e-commerce functionality (WebProduct, WebOrder, WebPage)

### Authentication
Uses NextAuth.js with:
- Credentials provider with bcrypt password hashing
- JWT strategy
- Prisma adapter for session storage
- Role-based authorization middleware

### Project Structure
```
src/
├── app/               # Next.js App Router
│   ├── api/          # API routes
│   ├── dashboard/    # Admin dashboard
│   ├── login/        # Authentication
│   └── web-managment/# Web module management
├── components/       # React components
│   ├── charts/      # Data visualization
│   ├── dashboard/   # Dashboard-specific components
│   ├── forms/       # Form components
│   ├── ui/          # Reusable UI components
│   └── web/         # Web module components
├── lib/
│   ├── auth.ts      # NextAuth configuration
│   ├── db.ts        # Prisma client setup
│   ├── integrations/# External service integrations
│   │   ├── arca.ts  # ARCA billing system
│   │   ├── dollar-quote.ts # Currency rates
│   │   └── web-managment.ts
│   └── utils.ts     # Utility functions
└── types/           # TypeScript type definitions
```

### Styling & Design System
- **TailwindCSS**: Custom color palette with primary green (#22c55e) theme
- **Dark Theme**: Default dark mode with custom dark color palette
- **Typography**: Inter font family, system-ui fallback
- **Components**: Radix UI + shadcn/ui for complex interactions
- **Icons**: Lucide React icon library

### Key Integrations
- **ARCA**: Argentine billing system for electronic invoices
- **Dollar Quote**: Real-time ARS/USD exchange rate tracking
- **OCA**: Argentine shipping service integration
- **MercadoPago**: Payment processing for Argentina
- **Neon**: PostgreSQL cloud database
- **Vercel**: Deployment and hosting platform
- **Recharts**: Data visualization for financial analytics

## Role-Based Permissions

### ADMIN_FULL
- Full system access and administrative functions
- Cannot delete financial movements (audit trail)

### ADMIN  
- Complete inventory management
- Sales and budget management
- Financial reports access
- User management
- Cannot make cash withdrawals or delete financial movements

### SELLER
- Sales registration
- Budget creation
- View own commissions
- Trade-in plan entry
- No access to purchase costs or complete financial module

## Business Logic & Domain Rules

### Product Management
- Products organized in purchase batches with supplier tracking
- Support for multiple conditions: NEW, USED, CPO (Certified Pre-Owned), REFURBISHED
- Detailed evaluation criteria for used devices (battery health, physical condition, etc.)
- Warranty tracking: Apple warranty vs Store warranty
- SKU generation and serial number tracking

### Financial Management
- Multi-currency support (ARS/USD) with real-time exchange rate tracking
- Income/expense categorization with movement types
- Payment method tracking and reference numbers
- Financial reporting and cash flow control
- Commission tracking per user/sale

### Sales & Customer Management
- Quick sales registration with product scanning
- Customer data management (name, city, email, phone)
- Shipping cost calculation and tracking
- Payment status management (PENDING, PAID, PARTIAL, CANCELLED)
- Invoice integration with ARCA system

### Inventory Control
- Real-time stock tracking with status management
- Location-based inventory organization
- Low stock alerts and reporting
- Product condition assessment for used items
- Batch purchase tracking with supplier information

## System Modules

### 1. Dashboard
- KPIs: Revenue, expenses, margin, stock levels
- 6-month income vs expenses charts
- Real-time system activity feed
- Quick access shortcuts

### 2. Inventory Management
- Advanced filtering and search
- Bulk import via batch system
- Barcode scanning capability
- Location management
- Minimum stock alerts

### 3. Sales Module
- Quick sales registration
- ARCA invoice integration
- Price calculator with commissions
- Sales history with advanced filters

### 4. Budget System
- Template-based budget creation
- Automatic email sending
- Status tracking and follow-up
- Conversion to sales

### 5. Used Products Module
- Detailed evaluation criteria
- Condition-based pricing calculator
- Photo gallery management
- Repair history tracking

### 6. Financial Module
- Financial dashboard with metrics
- Movement registration and categorization
- Profitability reports
- Cash flow management
- Accounts receivable/payable

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- React functional components with hooks
- Server-side rendering where appropriate
- API routes for backend functionality

### Database Patterns
- Use Prisma for all database operations
- Maintain referential integrity with foreign keys
- Implement soft deletes where audit trails are needed
- Use decimal types for financial amounts

### Security Considerations
- NextAuth.js for authentication
- Role-based route protection
- Input validation with Zod schemas
- Secure handling of sensitive data (API keys, passwords)

### Performance
- Implement proper pagination for large datasets
- Use React.memo for expensive components
- Optimize database queries with proper indexing
- Cache frequently accessed data