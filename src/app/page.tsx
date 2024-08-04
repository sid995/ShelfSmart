'use client'

import Link from 'next/link';
// import { ShoppingBasketIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from "next/image"

export default function Page() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-white fixed top-0 w-full px-4 lg:px-6 h-14 flex items-center justify-center">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <ShoppingBasketIcon className="h-6 w-6" />
          <span className="ml-2 text-xl">SmartShelf</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full pb-12 pt-18 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage Your Pantry with Ease
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our app makes it simple to keep track of your pantry items, view nutritional information, and create
                    shopping lists.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/dashboard"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={true}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <Image
                src="/grocery_background_still.jpg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your Pantry Management</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our app provides a suite of tools to help you keep your pantry organized and your shopping on track.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/grocery_background_still.jpg"
                width="550"
                height="310"
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Search and Add Items</h3>
                      <p className="text-muted-foreground">Easily search for and add pantry items to your inventory.</p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Nutritional Information</h3>
                      <p className="text-muted-foreground">
                        View detailed nutritional information for your pantry items.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Shopping Lists</h3>
                      <p className="text-muted-foreground">
                        Create and manage shopping lists based on your pantry inventory.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Users Say</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from real people who have used our app to streamline their pantry management.
              </p>
            </div>
            <div className="divide-y rounded-lg border">
              <div className="grid w-full grid-cols-1 items-stretch justify-center divide-x md:grid-cols-3">
                <div className="mx-auto flex w-full flex-col items-center justify-center p-4 sm:p-8 space-y-2">
                  <Avatar className="w-12 h-12">
                    {/* <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" /> */}
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-lg font-medium">Jane Doe</div>
                  <p className="text-muted-foreground text-sm">
                    &quot;This app has been a game-changer for my pantry\n organization. I love being able to easily see what
                    I have\n and create shopping lists.&quot;
                  </p>
                </div>
                <div className="mx-auto flex w-full flex-col items-center justify-center p-4 sm:p-8 space-y-2">
                  <Avatar className="w-12 h-12">
                    {/* <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" /> */}
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-lg font-medium">John Doe</div>
                  <p className="text-muted-foreground text-sm">
                    &quot;This app has saved me so much time and money. I no longer\n overbuy or forget what I already have
                    in my pantry.&quot;
                  </p>
                </div>
                <div className="mx-auto flex w-full flex-col items-center justify-center p-4 sm:p-8 space-y-2">
                  <Avatar className="w-12 h-12">
                    {/* <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" /> */}
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-lg font-medium">Jane Smith</div>
                  <p className="text-muted-foreground text-sm">
                    &quot;I love the simplicity and functionality of this app. It's\n made managing my pantry a breeze.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="contact">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get Started Today</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up and start managing your pantry with ease.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link
                href="/dashboard"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={true}
              >
                Get Started
              </Link>
              {/* <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit">Sign Up</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link href="#" className="underline underline-offset-2" prefetch={false}>
                  Terms &amp; Conditions
                </Link>
              </p> */}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 SmartShelf. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          {/* <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link> */}
        </nav>
      </footer>
    </div>
  );
}

function ShoppingBasketIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 11-1 9" />
      <path d="m19 11-4-7" />
      <path d="M2 11h20" />
      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
      <path d="M4.5 15.5h15" />
      <path d="m5 11 4-7" />
      <path d="m9 11 1 9" />
    </svg>
  )
}