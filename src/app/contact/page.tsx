import { ContactForm } from './contact-form';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="w-full">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Get In Touch</h1>
        <p className="text-lg text-muted-foreground">I'd love to hear from you. Let's build something great together.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-10 bg-card/60 backdrop-blur-lg border border-border/20 rounded-lg p-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Contact Information</h2>
          <p className="text-muted-foreground">
            Feel free to reach out through any of the following channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-accent" />
              <a href="mailto:hello@livio.dev" className="hover:text-primary">hello@livio.dev</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-accent" />
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-accent" />
              <span>San Francisco, CA</span>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-4">
             <a href="#" className="text-muted-foreground hover:text-primary"><Github size={24}/></a>
             <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={24}/></a>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
