import { ContactForm } from './contact-form';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="w-full p-8 md:p-24 md:pl-32">
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
              <a href="mailto:iamlivio@gmail.com" className="hover:text-primary">iamlivio@gmail.com</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-accent" />
              <span>+355 068 511 2709</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-accent" />
              <span>Tirana, Albania</span>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-4">
             <a href="https://www.linkedin.com/in/livio-macaj" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Linkedin size={24}/></a>
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
