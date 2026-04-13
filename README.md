# Emaginary AI Studio

Transform your photos into stunning, campaign-ready visuals with Emaginary AI Studio. This web application allows you to upload an image, choose a creative style, and generate a new, stylized result using the power of Hugging Face's image-to-image models.

---

## ✨ Features

*   **Effortless Image Upload:** Supports JPG, PNG, and WEBP file formats.
*   **Creative Style Presets:** Choose from a curated list of artistic styles to apply to your images.
*   **AI-Powered Generation:** Leverages Hugging Face's powerful image-to-image models to create unique visuals.
*   **User Authentication:** Secure sign-up and sign-in powered by Clerk.
*   **Generation Quotas:** Manages API usage with a monthly generation limit for users.
*   **Image History:** Browse and revisit your previously generated images.
*   **Optimized Image Handling:** Uses ImageKit for reliable and fast image hosting and delivery.

---

## 💬 What People Are Saying

> "This workflow completely changed how quickly we can turn original photos into polished campaign-ready visuals."
> **— Briana Patton, Operations Manager**

> "The interface is clear, the outputs are consistent, and the rollout across our team was surprisingly effortless."
> **— Bilal Ahmed, IT Manager**

> "Support has been thoughtful from the start, and the product already feels much more refined than most creative AI tools."
> **— Saman Malik, Customer Support Lead**

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **AI Models:** [Hugging Face Inference](https://huggingface.co/docs/inference-endpoints/index)
*   **Authentication:** [Clerk](https://clerk.com/)
*   **Database:** [Neon Serverless Postgres](https://neon.tech/)
*   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
*   **Image Management:** [ImageKit](https://imagekit.io/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)

---

## 🚀 Getting Started

Follow these steps to get a local development environment running.

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/en) (v18 or later) installed on your machine.

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/emaginary-ai-studio.git
cd emaginary-ai-studio
```

### 3. Install Dependencies

Install the required packages using npm:

```bash
npm install
```

### 4. Set Up Environment Variables

Create a new file named `.env.local` in the root of your project. You can copy the example file if one exists: `cp .env.example .env.local`.

Then, fill in the `.env.local` file with your credentials from the respective services:

```dotenv
# Clerk Authentication (https://dashboard.clerk.com/)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Hugging Face API (https://huggingface.co/settings/tokens)
HUGGING_FACE_API_KEY=hf_...

# Neon Database (https://console.neon.tech/)
DATABASE_URL="postgres://..."

# ImageKit (https://imagekit.io/dashboard)
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_instance/
IMAGEKIT_PUBLIC_KEY=public_...
IMAGEKIT_PRIVATE_KEY=private_...
```

### 5. Run Database Migrations

Apply the database schema to your Neon database using Drizzle Kit:

```bash
npx drizzle-kit push:pg
```

### 6. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
