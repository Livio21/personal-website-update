import { ContactForm } from './contact-form';

export default function ContactPage() {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start p-8 md:p-16 lg:p-24 pl-12 md:pl-20 lg:pl-24">
      <header className="text-left mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-light tracking-tight mb-2">Get In Touch</h1>
        <p className="max-w-2xl text-lg text-muted-foreground font-body">
          I'd love to hear from you. Let's build something great together.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-10 bg-card/60 backdrop-blur-lg border border-border/20 rounded-lg p-8 w-full max-w-5xl">
        <div className="space-y-6 flex flex-col justify-center">
          <h2 className="text-2xl font-light font-headline text-primary">Contact Information</h2>
          <p className="text-muted-foreground font-body">
            Feel free to reach out through any of the following channels. I'm always open to discussing new projects, creative ideas, or opportunities.
          </p>
          <div className="space-y-4 font-code text-sm">
            <div className="flex items-center gap-3">
              <a href="mailto:iamlivio@gmail.com" className="hover:text-primary transition-colors">iamlivio@gmail.com</a>
            </div>
            <div className="flex items-center gap-3">
              <span>+355 685 11 2709</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Tirana, Albania</span>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-4 font-body">
             <a href="https://www.linkedin.com/in/livio-macaj" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary text-sm transition-colors">LINKEDIN</a>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-light font-headline text-primary mb-6">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
