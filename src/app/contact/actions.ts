"use server";

import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  const parsed = formSchema.safeParse(values);
  
  if (!parsed.success) {
    return { success: false, error: "Invalid form data." };
  }

  // Here you would typically send an email, save to a database, etc.
  // For this demo, we'll just log it and simulate a delay.
  console.log("Form submitted:", parsed.data);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true };
}
