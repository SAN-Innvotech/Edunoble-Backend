# Edunoble Backend

Express 5 + Mongoose REST API powering the Edunoble platform. Serves public read endpoints to the **Frontend** and authenticated CMS endpoints to the **Admin** panel. Deployed as a Vercel serverless function backed by MongoDB Atlas.

> Part of a three-repo system. For the full picture, see [../Edunoble-Frontend/ARCHITECTURE.md](../Edunoble-Frontend/ARCHITECTURE.md).

## Tech stack

- **Runtime**: Node.js + Express 5.1
- **Language**: JavaScript (no TypeScript)
- **Database**: MongoDB via Mongoose 8.19 (Atlas free tier)
- **Auth**: `jsonwebtoken` 9 + `bcryptjs` 3
- **Email**: Nodemailer 7 (admin OTP)
- **Images**: Cloudinary 2.9 via Multer 2 (in-memory upload)
- **PDFs**: Google Drive via `googleapis` 144 (service-account auth)
- **Docs**: Swagger UI (`swagger-jsdoc` + `swagger-ui-express`)

## Project structure

```
server.js                         entry: Express init, Mongo connect, port bind
seed-homepage.js                  one-off seed script for homepage content
src/
├── api/
│   ├── api.router.js             mounts all resource routers under /apis
│   ├── auth/                     register, login, OTP, password change
│   ├── papers/                   sample papers CRUD + queries
│   ├── homepage/                 homepage content (sectioned)
│   ├── testimonials/             student testimonials CRUD
│   ├── contact/                  contact submissions + FAQ
│   ├── contentPages/             about / vision pages
│   ├── leads/                    lead capture
│   └── upload/                   Cloudinary image upload
├── models/                       Mongoose schemas (8 total)
├── middlewares/
│   ├── auth.middleware.js        JWT Bearer verification
│   └── upload.js                 multer memory storage, 5 MB cap
└── utility/
    ├── uploadToCloudinary.js     Cloudinary upload helper
    ├── googleDrive.js            Drive service-account uploads
    ├── sendMail.js               Nodemailer wrapper
    └── responses.js              standard response shape
```

## API surface

All routes are mounted under `/apis`. Endpoints marked **🔒** require a valid JWT in the `Authorization: Bearer <token>` header (verified by `auth.middleware.js`).

**Swagger UI**: `https://backbone.edunoble.in/apis/api-docs` (or `http://localhost:8001/apis/api-docs` locally)

### Auth (`/apis/auth`)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/register` | create user |
| POST | `/login` | email/phone + password → JWT (30 d) |
| POST | `/change-password` 🔒 | change password |
| POST | `/admin/send-otp` | send OTP to admin email |
| POST | `/admin/verify-otp` | verify OTP → JWT (30 d) |

### Sample papers (`/apis/papers`)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | list papers (filter by class / subject / board / year) |
| GET | `/metadata` | dropdown options (classes, subjects, boards, exam types) |
| GET | `/featured` | featured papers for homepage |
| GET | `/subjects-by-class` | subject list grouped by class |
| GET | `/:id` | single paper |
| PATCH | `/:id/view` | increment view count |
| GET | `/admin/dashboard` 🔒 | analytics: views, top papers, totals |
| GET | `/admin/list` 🔒 | full admin list |
| POST | `/admin` 🔒 | create paper |
| PATCH | `/admin/:id` 🔒 | update paper |
| DELETE | `/admin/:id` 🔒 | delete paper |

### Homepage (`/apis/homepage`)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | full homepage document |
| POST | `/admin` 🔒 | create homepage |
| PATCH | `/admin/:id` 🔒 | update entire doc |
| PATCH | `/admin/:id/section/:section` 🔒 | update one section (hero/statistics/features/process/...) |
| DELETE | `/admin/:id` 🔒 | delete |

### Testimonials (`/apis/testimonials`)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | public list (active, ordered) |
| GET | `/:id` | single |
| GET | `/admin/list` 🔒 | admin list |
| POST | `/admin` 🔒 | create |
| PATCH | `/admin/:id` 🔒 | update |
| DELETE | `/admin/:id` 🔒 | delete |

### Content pages (`/apis/content-pages`)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/:type` | sections by type (`about` / `vision`), active + ordered |
| GET | `/admin/list` 🔒 | full list (all types) |
| POST | `/admin` 🔒 | create section |
| PATCH | `/admin/:id` 🔒 | update |
| DELETE | `/admin/:id` 🔒 | delete |

### Contact + FAQ (`/apis/contact`)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/` | submit contact form (public) |
| GET | `/faq` | public FAQ list |
| GET | `/admin` 🔒 | all submissions |
| GET | `/admin/faq` 🔒 | FAQ admin list |
| POST | `/admin/faq` 🔒 | create FAQ |
| PATCH | `/admin/:id/resolve` 🔒 | mark submission resolved |
| PATCH | `/admin/faq/:id` 🔒 | update FAQ |

### Leads (`/apis/leads`)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/` | capture lead (public) |
| GET | `/admin` 🔒 | list |
| DELETE | `/admin/:id` 🔒 | delete |

### Upload (`/apis/upload`)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/image` 🔒 | multipart image upload → Cloudinary; returns `{ imageUrl }`. Optional `?folder=<name>` query. |

## Data models

| Model | Key fields |
|-------|-----------|
| **User** | `name`, `email` (unique), `phone` (unique), `password` (bcrypt), `otp`, `otpSentAt`, `isActive` |
| **SamplePaper** | `title`, `class`, `subject`, `year`, `description`, `board`, `examType`, `tags[]`, `fileUrl`, `driveFileId`, `featured`, `viewCount`, `isActive`, `createdBy` |
| **Homepage** | `hero` (headline, features, studentReview), `statistics`, `features`, `process` (steps), `mostViewedPapers`, `featuredPapers`, `studentsSay`, `isActive` |
| **Testimonial** | `heading`, `quote`, `authorName`, `authorClass`, `authorDetails`, `order`, `isActive` |
| **ContentPage** | `title`, `content`, `pictureUrl`, `type` (`about` / `vision`), `order`, `isActive` |
| **Contact** | `name`, `email`, `phone`, `subject`, `message`, `source`, `isResolved`, `resolvedAt`, `notes` |
| **Lead** | `name`, `number`, `grade`, `subject` |
| **FAQ** | `question`, `answer`, `order`, `isActive` |

## Auth

- **Token type**: JWT Bearer, signed with `JWT_SECRET`.
- **TTLs**: 30 days for user/admin login tokens, 30 minutes for OTP-issued tokens.
- **Admin flow**: `POST /auth/admin/send-otp` → SMTP delivers OTP → `POST /auth/admin/verify-otp` → JWT.
- **User flow**: register with email/phone/password → `POST /auth/login` → JWT.
- **Middleware**: `src/middlewares/auth.middleware.js` reads `Authorization: Bearer <token>`, verifies it, and attaches the user record to `req.user`.

> ⚠️ The default `JWT_SECRET` fallback in code is `"secret123"`. Always set a real secret in production.

## Media handling

- **Images** — `multer` keeps the file in memory (5 MB cap), `uploadToCloudinary()` streams it to Cloudinary, and the response returns the Cloudinary URL. Used by the Admin's image picker.
- **Paper PDFs** — uploaded to Google Drive via a service account (`googleapis` JWT). Both `fileUrl` (public link) and `driveFileId` (for management) are stored on the paper document.

## Environment variables

Create a `.env` at the repo root:

| Variable | Purpose |
|----------|---------|
| `MONGO_URL` | MongoDB Atlas connection string |
| `JWT_SECRET` | secret for signing JWTs (**required in prod**) |
| `PORT` | local port (default `8001`) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `SMTP_HOST` | SMTP host for Nodemailer |
| `SMTP_PORT` | SMTP port |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `FROM_EMAIL` | sender address (defaults to `SMTP_USER`) |
| `OTP_EXPIRY_MINUTES` | OTP validity window (default `5`) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Drive service-account email |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Drive service-account private key (with `\n` newlines) |
| `GOOGLE_DRIVE_FOLDER_ID` | parent folder for paper uploads |

## Local setup

```bash
npm install
npm start            # nodemon server.js → listens on $PORT (default 8001)
```

The API will be available at `http://localhost:8001/apis` with Swagger at `http://localhost:8001/apis/api-docs`.

## Build & deploy

- **Hosting**: Vercel serverless (production: `https://backbone.edunoble.in`)
- **Deploy branch**: **`nik-modification`** — Vercel auto-deploys on every push to this branch.
  - ⚠️ Note: this differs from Frontend and Admin, which both deploy from `main`.

## Branching workflow

1. Branch off `nik-modification`: `git checkout -b feat/<name>`
2. Push and open a PR against `nik-modification`.
3. Merge → Vercel deploys.

## Related repos

- **Edunoble-Frontend** — public site that reads from this API.
- **Edunoble-Admin** — CMS that writes to this API.
- **System overview**: [../Edunoble-Frontend/ARCHITECTURE.md](../Edunoble-Frontend/ARCHITECTURE.md)
