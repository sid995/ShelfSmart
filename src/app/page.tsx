// import { getServerSession } from '@/utils/serverAuth';
// import HomeContent from '@/app/ui/HomeContent';
// import { redirect } from 'next/navigation';

// export default async function Home() {
//   const session = await getServerSession();

//   if (!session) {
//     redirect('/signin');
//   }

//   return <HomeContent user={session?.user} />
// };

'use client'

import React from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  TextField,
  Box,
  CardHeader,
  Input
} from '@mui/material';
import { styled } from '@mui/system';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CheckIcon from '@mui/icons-material/Check';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Section = styled('section')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(6, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(12, 0),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(24, 0),
  },
}));

const MutedSection = styled(Section)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));

export default function Component() {
  return (
    // <Box className="flex flex-col min-h-[100dvh]">
    //   <AppBar position="fixed" elevation={2} sx={{ background: "white" }}>
    //     <Toolbar>
    //       <StyledLink href="/" className="flex items-center justify-center">
    //         <ShoppingBasketIcon />
    //         <Typography variant="h5">SmartShelf</Typography>
    //       </StyledLink>
    //       <Box sx={{ marginLeft: 'auto' }}>
    //         {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
    //           <StyledLink key={item} href="#" className="ml-4 text-sm font-medium">
    //             {item}
    //           </StyledLink>
    //         ))}
    //       </Box>
    //     </Toolbar>
    //   </AppBar>

    //   <Box component="main" sx={{ flexGrow: 1 }}>
    //     <Section>
    //       <Container>
    //         <Grid container spacing={6}>
    //           <Grid item xs={12} lg={6}
    //             sx={{
    //               flexDirection: "column",
    //             }}
    //             className="flex justify-center">
    //             <Typography variant="h1" className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-4">
    //               Manage Your Pantry with Ease
    //             </Typography>
    //             <Typography variant="body1" className="max-w-[600px] text-muted-foreground md:text-xl mb-4">
    //               Our app makes it simple to keep track of your pantry items, view nutritional information, and create
    //               shopping lists.
    //             </Typography>
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               component={Link}
    //               href="/dashboard"
    //               className="w-fit"
    //               sx={{
    //                 color: "white",
    //                 marginTop: 2
    //               }}
    //             >
    //               Get Started
    //             </Button>
    //           </Grid>
    //           <Grid item xs={12} lg={6}>
    //             <Box
    //               component="img"
    //               src="/grocery_background_still.jpg"
    //               alt="Hero"
    //               className="mx-auto aspect-video rounded-xl object-cover sm:w-full lg:aspect-square"
    //               sx={{ width: '100%', maxWidth: 550 }}
    //             />
    //           </Grid>
    //         </Grid>
    //       </Container>
    //     </Section>

    //     <MutedSection>
    //       <Container>
    //         <Typography variant="overline" className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-2">
    //           Key Features
    //         </Typography>
    //         <Typography variant="h2" className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
    //           Streamline Your Pantry Management
    //         </Typography>
    //         <Typography variant="body1" className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-12">
    //           Our app provides a suite of tools to help you keep your pantry organized and your shopping on track.
    //         </Typography>

    //         <Grid container spacing={6}>
    //           <Grid item xs={12} lg={6}>
    //             <Box
    //               component="img"
    //               src="/placeholder.svg"
    //               alt="Image"
    //               className="mx-auto aspect-video rounded-xl object-cover object-center sm:w-full"
    //               sx={{ width: '100%', maxWidth: 550 }}
    //             />
    //           </Grid>
    //           <Grid item xs={12} lg={6}>
    //             {[
    //               { title: 'Search and Add Items', description: 'Easily search for and add pantry items to your inventory.' },
    //               { title: 'Nutritional Information', description: 'View detailed nutritional information for your pantry items.' },
    //               { title: 'Shopping Lists', description: 'Create and manage shopping lists based on your pantry inventory.' },
    //             ].map((feature, index) => (
    //               <Box key={index} mb={4}>
    //                 <Typography variant="h6" gutterBottom>{feature.title}</Typography>
    //                 <Typography variant="body2">{feature.description}</Typography>
    //               </Box>
    //             ))}
    //           </Grid>
    //         </Grid>
    //       </Container>
    //     </MutedSection>

    //     <Section>
    //       <Container>
    //         <Typography variant="h2" className="text-3xl font-bold tracking-tighter md:text-4xl/tight mb-4" align="center">
    //           What Our Users Say
    //         </Typography>
    //         <Typography variant="body1" className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8" align="center">
    //           Hear from real people who have used our app to streamline their pantry management.
    //         </Typography>

    //         <Grid container spacing={4}>
    //           {[
    //             { name: 'Jane Doe', comment: "This app has been a game-changer for my pantry organization. I love being able to easily see what I have and create shopping lists." },
    //             { name: 'John Doe', comment: "This app has saved me so much time and money. I no longer overbuy or forget what I already have in my pantry." },
    //             { name: 'Jane Smith', comment: "I love the simplicity and functionality of this app. It's made managing my pantry a breeze." },
    //           ].map((testimonial, index) => (
    //             <Grid item xs={12} md={4} key={index}>
    //               <Card>
    //                 <CardContent className="flex flex-col items-center text-center">
    //                   <Avatar sx={{ width: 56, height: 56, mb: 2 }}>{testimonial.name.charAt(0)}</Avatar>
    //                   <Typography variant="h6" gutterBottom>{testimonial.name}</Typography>
    //                   <Typography variant="body2">{testimonial.comment}</Typography>
    //                 </CardContent>
    //               </Card>
    //             </Grid>
    //           ))}
    //         </Grid>
    //       </Container>
    //     </Section>

    //     <MutedSection>
    //       <Container>
    //         <Grid container spacing={6}>
    //           <Grid item xs={12} lg={6}>
    //             <Typography variant="h2" className="text-3xl font-bold tracking-tighter md:text-4xl/tight mb-4">
    //               Pricing
    //             </Typography>
    //             <Typography variant="body1" className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
    //               Choose the plan that best fits your needs and start streamlining your pantry today.
    //             </Typography>
    //           </Grid>
    //           <Grid item xs={12} lg={6}>
    //             {[
    //               {
    //                 title: 'Free',
    //                 description: 'Get started for free.',
    //                 features: ['Unlimited pantry items', 'Basic nutritional information', '1 shopping list'],
    //                 buttonText: 'Sign Up'
    //               },
    //               {
    //                 title: 'Pro',
    //                 description: 'Unlock advanced features.',
    //                 features: ['Unlimited pantry items', 'Detailed nutritional information', 'Unlimited shopping lists', 'Pantry sharing'],
    //                 buttonText: 'Subscribe'
    //               }
    //             ].map((plan, index) => (
    //               <Card key={index} sx={{ mb: 4 }}>
    //                 <CardContent>
    //                   <Typography variant="h5" gutterBottom>{plan.title}</Typography>
    //                   <Typography variant="body2" color="text.secondary" gutterBottom>{plan.description}</Typography>
    //                   <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
    //                     {plan.features.map((feature, featureIndex) => (
    //                       <Box component="li" key={featureIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    //                         <CheckIcon sx={{ mr: 1 }} fontSize="small" />
    //                         <Typography variant="body2">{feature}</Typography>
    //                       </Box>
    //                     ))}
    //                   </Box>
    //                 </CardContent>
    //                 <CardActions>
    //                   <Button variant="contained">{plan.buttonText}</Button>
    //                 </CardActions>
    //               </Card>
    //             ))}
    //           </Grid>
    //         </Grid>
    //       </Container>
    //     </MutedSection>

    //     <Section>
    //       <Container maxWidth="sm">
    //         <Typography variant="h2" className="text-3xl font-bold tracking-tighter md:text-4xl/tight mb-4" align="center">
    //           Get Started Today
    //         </Typography>
    //         <Typography variant="body1" className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-4" align="center">
    //           Sign up for our free plan and start managing your pantry with ease.
    //         </Typography>
    //         <Box component="form" className="flex gap-2 mb-2">
    //           <TextField
    //             type="email"
    //             placeholder="Enter your email"
    //             variant="outlined"
    //             fullWidth
    //             sx={{ maxWidth: 'lg', flexGrow: 1 }}
    //           />
    //           <Button type="submit" variant="contained">Sign Up</Button>
    //         </Box>
    //         <Typography variant="caption" align="center" display="block">
    //           By signing up, you agree to our{' '}
    //           <Link href="#" className="underline underline-offset-2">
    //             Terms & Conditions
    //           </Link>
    //         </Typography>
    //       </Container>
    //     </Section>
    //   </Box>

    //   <Box component="footer" className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    //     <Typography variant="caption" color="text.secondary">
    //       &copy; 2024 SmartShelf. All rights reserved.
    //     </Typography>
    //     <Box sx={{ marginLeft: { sm: 'auto' } }} className="flex gap-4 sm:gap-6">
    //       <Link href="#" className="text-xs hover:underline underline-offset-4">
    //         Privacy
    //       </Link>
    //       <Link href="#" className="text-xs hover:underline underline-offset-4">
    //         Terms of Service
    //       </Link>
    //     </Box>
    //   </Box>
    // </Box>
    <div className="flex flex-col min-h-[100dvh]">
      <AppBar position="fixed" elevation={2} sx={{ background: "white" }}>
        <Toolbar>
          <StyledLink href="/" className="flex items-center justify-center">
            <ShoppingBasketIcon />
            <Typography variant="h5">SmartShelf</Typography>
          </StyledLink>
          <Box sx={{ marginLeft: 'auto' }}>
            {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
              <StyledLink key={item} href="#" className="ml-4 text-sm font-medium">
                {item}
              </StyledLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 flex flex-row justify-center">
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
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href="/items"
                    className="w-fit"
                    sx={{
                      color: "white",
                      py: 1,
                      px: 3,
                      textTransform: 'none',
                      fontSize: '1.2rem',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
              <img
                src="/grocery_background_still.jpg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
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
              <img
                src="/placeholder.svg"
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
                {[
                  { name: 'Jane Doe', comment: "This app has been a game-changer for my pantry organization. I love being able to easily see what I have and create shopping lists." },
                  { name: 'John Doe', comment: "This app has saved me so much time and money. I no longer overbuy or forget what I already have in my pantry." },
                  { name: 'Jane Smith', comment: "I love the simplicity and functionality of this app. It's made managing my pantry a breeze." },
                ].map((testimonial, index) => (
                  <Card>
                    <CardContent className="mx-auto flex w-full flex-col items-center justify-center p-4 sm:p-8 space-y-2">
                      <Avatar sx={{ width: 56, height: 56, mb: 2 }}>{testimonial.name.charAt(0)}</Avatar>
                      <Typography variant="h6" gutterBottom>{testimonial.name}</Typography>
                      <Typography variant="body2">{testimonial.comment}</Typography>
                    </CardContent>
                  </Card>
                ))}
                {/* <div className="mx-auto flex w-full flex-col items-center justify-center p-4 sm:p-8 space-y-2">
                  <Avatar className="w-12 h-12">
                    <Avatar src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-lg font-medium">Jane Doe</div>
                  <p className="text-muted-foreground text-sm">
                    "This app has been a game-changer for my pantry\n organization. I love being able to easily see what
                    I have\n and create shopping lists."
                  </p>
                </div>
                <div className="mx-auto flex w-full flex-col items-center justify-center p-4 sm:p-8 space-y-2">
                  <Avatar className="w-12 h-12">
                    <Avatar src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-lg font-medium">John Doe</div>
                  <p className="text-muted-foreground text-sm">
                    "This app has saved me so much time and money. I no longer\n overbuy or forget what I already have
                    in my pantry."
                  </p>
                </div>
                <div className="mx-auto flex w-full flex-col items-center justify-center p-4 sm:p-8 space-y-2">
                  <Avatar className="w-12 h-12">
                    <Avatar src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-lg font-medium">Jane Smith</div>
                  <p className="text-muted-foreground text-sm">
                    "I love the simplicity and functionality of this app. It's\n made managing my pantry a breeze."
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Pricing</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that best fits your needs and start streamlining your pantry today.
              </p>
            </div>
            <Grid item xs={12} lg={6}>
              {[
                {
                  title: 'Free',
                  description: 'Get started for free.',
                  features: ['Unlimited pantry items', 'Basic nutritional information', '1 shopping list'],
                  buttonText: 'Sign Up'
                },
                {
                  title: 'Pro',
                  description: 'Unlock advanced features.',
                  features: ['Unlimited pantry items', 'Detailed nutritional information', 'Unlimited shopping lists', 'Pantry sharing'],
                  buttonText: 'Subscribe'
                }
              ].map((plan, index) => (
                <Card key={index} sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>{plan.title}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>{plan.description}</Typography>
                    <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                      {plan.features.map((feature, featureIndex) => (
                        <Box component="li" key={featureIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <CheckIcon sx={{ mr: 1 }} fontSize="small" />
                          <Typography variant="body2">{feature}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained">{plan.buttonText}</Button>
                  </CardActions>
                </Card>
              ))}
            </Grid>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get Started Today</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up for our free plan and start managing your pantry with ease.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit">Sign Up</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link href="#" className="underline underline-offset-2" prefetch={false}>
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Pantry App. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>
  );
}