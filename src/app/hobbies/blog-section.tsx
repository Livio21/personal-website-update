import { Rss } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
    {
        title: "The Art of Refactoring",
        date: "October 12, 2023",
        description: "A deep dive into why refactoring is not just cleaning up code, but a crucial practice for long-term project health and maintainability.",
        tags: ["Coding", "Best Practices", "Software Design"]
    },
    {
        title: "Embracing TailwindCSS",
        date: "September 28, 2023",
        description: "My journey from traditional CSS and BEM to utility-first styling with TailwindCSS. Why I'm never going back.",
        tags: ["Frontend", "CSS", "Web Dev"]
    },
    {
        title: "A First Look at Next.js 14",
        date: "November 5, 2023",
        description: "Exploring the new features in Next.js 14, from Server Actions to improved Turbopack performance. Is it worth the upgrade?",
        tags: ["Next.js", "React", "JavaScript"]
    }
];

export function BlogSection() {
  return (
    <section className="h-screen w-full snap-start flex flex-col items-center justify-center relative p-8 md:p-16 bg-background">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 flex items-center gap-4 justify-center">
          <Rss className="text-primary size-10" />
          Mini Blogs
        </h2>
        <p className="text-lg text-muted-foreground">Sharing thoughts on tech and development.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {blogPosts.map((post, index) => (
          <Card key={index} className="bg-card/60 backdrop-blur-sm border-white/10 flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.date}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{post.description}</p>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
               <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
                <Button variant="link" className="p-0 h-auto">Read More <ArrowRight className="ml-2 size-4" /></Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
