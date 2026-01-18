# Blog App

A full-stack blog application built with Next.js, Express, MongoDB, and TypeScript. This monorepo project features user authentication, rich text editing, image uploads, post management, and a modern, responsive UI with dark mode support.

## 🎯 Core Functions

### 1. User Authentication & Account Management
- **User Registration**: Create new accounts with username, email, and password
- **User Login**: Authenticate users with JWT tokens via Authorization headers
- **User Logout**: Clear authentication and session data
- **Profile Management**: Update username, email, and password
- **Avatar Management**: Upload and manage user profile pictures via Cloudinary
- **Account Deletion**: Delete user account and associated data
- **Password Security**: Bcrypt hashing with validation (8-30 chars, uppercase, lowercase, number required)

### 2. Blog Post Management
- **Create Posts**: Write new blog posts with rich text formatting and optional featured images
- **Read/View Posts**: Display posts in a feed or individual detail view
- **Update Posts**: Edit existing posts with content and image updates
- **Delete Posts**: Remove posts with confirmation dialog
- **Post Filtering**: Filter posts by category, author, or combination of both
- **Post Categories**: Organize posts into 6 categories (Technology, Art, Science, Cinema, Design, Food)

### 3. Rich Text Editing & Content Formatting
- **WYSIWYG Editor**: TipTap-based editor with real-time preview
- **Text Formatting**: Bold, italic, underline, strikethrough
- **Heading Levels**: H1, H2, H3 support
- **Lists**: Ordered and unordered lists
- **Code Blocks**: Display code with syntax highlighting support
- **Blockquotes**: Format quoted text
- **Links**: Insert hyperlinks with automatic security attributes
- **Horizontal Rules**: Add visual separators
- **HTML Sanitization**: Server-side sanitization to prevent XSS attacks

### 4. Image Upload & Management
- **Image Upload**: Upload images to Cloudinary during post creation/editing
- **Image Validation**: Validate file type (PNG, JPG, JPEG) and size (max 2MB)
- **Image Preview**: Real-time preview before uploading
- **Automatic Cleanup**: Remove old images when posts are deleted or updated
- **User Avatars**: Support for user profile avatars

### 5. User Dashboard & Profile
- **User Profile Tab**: View and update user information (username, email, password, avatar)
- **User Posts Tab**: View, edit, or delete all user-created posts
- **Post Statistics**: Display total post count for the user
- **Quick Actions**: Fast access to post management (view, edit, delete)

### 6. Content Discovery & Navigation
- **Home Feed**: Browse all blog posts in a grid/card layout
- **Post Detail View**: Read full post content with metadata
- **Category Filtering**: Filter posts by content category
- **Author Filtering**: View all posts by a specific author
- **Search Functionality**: Find posts and users

### 7. User Interface & Experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Toast Notifications**: User feedback for actions (success, error, info)
- **Loading States**: Skeleton screens and loading indicators
- **Form Validation**: Client-side validation with real-time error messages
- **Draft Auto-save**: Automatically save post drafts to localStorage

### 8. Security & Data Protection
- **JWT Authentication**: Token-based authentication via Authorization headers
- **Password Hashing**: Bcrypt encryption with salt rounds
- **Input Validation**: Comprehensive Zod schemas on client and server
- **XSS Prevention**: HTML sanitization on the server
- **Authorization Checks**: Verify user ownership before allowing edits/deletes
- **CORS Protection**: Configured for frontend origin
- **File Validation**: Validate image type and size before upload

### 9. Data Validation
- **User Validation**: Username (3-30 chars), email format, password strength
- **Post Validation**: Title (3-200 chars), content (20-3000 chars), category enum
- **Image Validation**: File type and size restrictions
- **Form Validation**: Real-time client-side validation with error messages

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Rich Text Editor**: TipTap with Starter Kit
- **HTTP Client**: Fetch API
- **Notifications**: Sonner
- **Icons**: Lucide React

### Backend
- **Framework**: Express.js
- **Language**: TypeScript 5
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **File Upload**: express-fileupload
- **Image Hosting**: Cloudinary
- **Validation**: Zod
- **HTML Sanitization**: sanitize-html
- **Logging**: Morgan

### Monorepo & Tooling
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Build Tool**: TypeScript Compiler
- **Code Quality**: ESLint
- **Formatting**: Prettier

### Shared Packages
- **@repo/validations**: Shared Zod validation schemas and utilities
- **@repo/eslint-config**: Shared ESLint configurations
- **@repo/typescript-config**: Shared TypeScript configurations

## 📁 Project Structure

```
blog-app/
├── apps/
│   ├── backend/              # Express.js API server
│   │   ├── server/
│   │   │   ├── controllers/   # Route handlers
│   │   │   │   ├── auth/      # Authentication controllers
│   │   │   │   ├── posts/     # Post CRUD operations
│   │   │   │   └── users/     # User management
│   │   │   ├── middlewares/  # Auth middleware
│   │   │   ├── models/        # Mongoose models
│   │   │   ├── routes/        # Express routes
│   │   │   ├── schemas/       # Mongoose schemas
│   │   │   ├── libs/          # Cloudinary utilities
│   │   │   ├── app.ts         # Express app setup
│   │   │   └── index.ts       # Server entry point
│   │   └── package.json
│   │
│   └── frontend/              # Next.js application
│       ├── src/
│       │   ├── app/           # Next.js App Router pages
│       │   │   ├── dashboard/ # User dashboard
│       │   │   ├── login/     # Login page
│       │   │   ├── register/  # Registration page
│       │   │   ├── write/     # Create/Edit post page
│       │   │   ├── post/      # Post detail pages
│       │   │   └── page.tsx   # Home page
│       │   ├── components/    # React components
│       │   │   ├── ui/        # shadcn/ui components
│       │   │   ├── Navbar.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── PostCard.tsx
│       │   │   ├── Posts.tsx
│       │   │   └── RichTextEditor.tsx
│       │   ├── lib/           # Utilities and services
│       │   │   ├── services/  # API service functions
│       │   │   └── config.ts  # Configuration
│       │   ├── store/         # Zustand stores
│       │   └── types/         # TypeScript types
│       └── public/             # Static assets
│
└── packages/
    ├── validations/           # Shared validation schemas
    │   └── src/
    │       ├── post.validation.ts
    │       ├── user.validations.ts
    │       ├── image.validation.ts
    │       └── sanitizeHtml.ts
    ├── eslint-config/         # Shared ESLint configs
    └── typescript-config/     # Shared TS configs
```

## 🚦 Getting Started

### Prerequisites
- Node.js >= 18
- pnpm 9.0.0
- MongoDB instance (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create `.env` files in both `apps/backend` and `apps/frontend`:

   **`apps/backend/.env`**:
   ```env
   PORT=4001
   MONGODB_URI=mongodb://localhost:27017/blog-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

   **`apps/frontend/.env.local`**:
   ```env
   API_URL=http://localhost:4001
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string in MONGODB_URI
   ```

5. **Start development servers**
   ```bash
   # From root directory - starts both frontend and backend
   pnpm dev
   
   # Or start individually:
   pnpm --filter backend dev
   pnpm --filter frontend dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4001

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:** User object with JWT token in HTTP-only cookie

#### POST `/api/auth/signin`
Login user.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "SecurePass123"
}
```

**Response:** User object with JWT token in HTTP-only cookie

#### POST `/api/auth/logout`
Logout user (clears authentication cookie).

### Post Endpoints

#### GET `/api/posts`
Get all posts with optional filtering.

**Query Parameters:**
- `idPost`: Get single post by ID
- `cat`: Filter by category
- `userId`: Filter by user ID
- `userId` + `cat`: Filter by both user and category

**Response:** Array of posts or single post

#### POST `/api/posts`
Create a new post (requires authentication).

**Request:** `multipart/form-data`
- `title`: string (3-200 chars)
- `content`: string (20-3000 chars, HTML)
- `category`: "technology" | "art" | "science" | "cinema" | "design" | "food"
- `image`: File (optional, max 2MB, PNG/JPG/JPEG)

**Response:** Success message

#### PUT `/api/posts/:id`
Update a post (requires authentication, post owner only).

**Request:** `multipart/form-data` (same as POST, all fields optional)

**Response:** Success message

#### DELETE `/api/posts/:id`
Delete a post (requires authentication, post owner only).

**Response:** Success message

### User Endpoints

#### GET `/api/users`
Get authenticated user's dashboard data (requires authentication).

**Response:** User object with posts count

#### GET `/api/users/:id`
Get user information by ID.

**Response:** User object

#### PUT `/api/users`
Update authenticated user (requires authentication).

**Request:** `multipart/form-data`
- `username`: string (optional)
- `email`: string (optional)
- `password`: string (required for updates)
- `newPassword`: string (optional)
- `avatar`: File (optional, max 2MB)

**Response:** Updated user object

#### DELETE `/api/users`
Delete authenticated user account (requires authentication).

**Response:** Success message

## 🎨 Frontend Pages

### `/` - Home Page
- Displays all posts in a grid layout
- Category filtering
- Responsive post cards with images
- Link to individual post pages

### `/login` - Login Page
- Username and password form
- Client-side validation
- Redirects to home on success

### `/register` - Registration Page
- Username, email, password, and confirm password
- Comprehensive validation
- Redirects to login on success

### `/write` - Create/Edit Post Page
- **Create Mode**: `/write` - Create new post with draft auto-save
- **Edit Mode**: `/write?edit=<postId>` - Edit existing post
- Rich text editor
- Image upload with preview
- Category selection
- Form validation

### `/post/[postId]` - Post Detail Page
- Full post content display
- Author information
- Post metadata (date, category)
- Rich HTML content rendering

### `/dashboard` - User Dashboard
- **Profile Tab**: Update user information, avatar, password
- **Posts Tab**: Manage user's posts (view, edit, delete)
- Protected route (requires authentication)

### `/about` - About Page
- Information about the blog application

## 🔒 Security Features

1. **Authentication**: JWT tokens stored in HTTP-only cookies
2. **Password Hashing**: Bcrypt with salt rounds
3. **Input Validation**: Zod schemas on both client and server
4. **HTML Sanitization**: Server-side sanitization to prevent XSS
5. **Authorization**: Middleware checks user ownership before allowing edits/deletes
6. **CORS**: Configured for frontend origin
7. **File Validation**: Image type and size validation before upload

## 🧪 Validation Schemas

### Post Validation
- Title: 3-200 characters
- Content: 20-3000 characters (text content, excluding HTML)
- Category: Enum validation
- Image: Optional, max 2MB, PNG/JPG/JPEG only

### User Validation
- Username: 3-30 chars, starts with letter, alphanumeric + dots/underscores
- Email: Valid email format
- Password: 8-30 chars, must contain uppercase, lowercase, and number

## 🚀 Development

### Available Scripts

**Root level:**
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps
- `pnpm lint` - Lint all packages
- `pnpm check-types` - Type check all packages

**Backend:**
- `pnpm --filter backend dev` - Start backend with hot reload
- `pnpm --filter backend build` - Build backend
- `pnpm --filter backend check-types` - Type check backend

**Frontend:**
- `pnpm --filter frontend dev` - Start Next.js dev server
- `pnpm --filter frontend build` - Build Next.js app
- `pnpm --filter frontend start` - Start production server

### Code Structure

- **Controllers**: Handle HTTP requests and responses
- **Models**: Database operations and queries
- **Routes**: Define API endpoints
- **Middlewares**: Authentication and authorization
- **Schemas**: Mongoose models and Zod validations
- **Services**: Frontend API service functions

## 📝 Environment Variables

### Backend
- `PORT`: Server port (default: 4001)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

### Frontend
- `API_URL`: Backend API URL (default: http://localhost:4001)

## 🎯 Key Features Explained

### Rich Text Editor
Uses TipTap with Starter Kit extension, providing a WYSIWYG editing experience. Content is stored as HTML and sanitized on the server before saving.

### Draft Auto-save
New posts automatically save drafts to localStorage. Drafts are cleared on successful submission. Edit mode doesn't use drafts to avoid conflicts.

### Image Management
Images are uploaded to Cloudinary, which provides:
- Automatic optimization
- CDN delivery
- Automatic cleanup when posts are deleted or images are replaced

### Authentication Flow
1. User signs up/logs in
2. Server validates credentials
3. JWT token generated and set in HTTP-only cookie
4. Frontend stores user data in Zustand store
5. Protected routes check authentication via cookie
6. Logout clears cookie and store

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and type checking
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- TipTap for the rich text editor
- Radix UI for accessible components
- Cloudinary for image hosting
- MongoDB for the database

---

Built with ❤️ using Next.js, Express, MongoDB, and TypeScript
