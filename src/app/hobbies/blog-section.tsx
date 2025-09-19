"use client"

import { useState } from 'react';
import { Rss, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog"
import { ScrollArea } from '@/components/ui/scroll-area';


const blogPosts = [
    {
        title: "The Art of Refactoring",
        date: "October 12, 2023",
        description: "A deep dive into why refactoring is not just cleaning up code, but a crucial practice for long-term project health and maintainability.",
        tags: ["Coding", "Best Practices", "Software Design"],
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst."
    },
    {
        title: "Embracing TailwindCSS",
        date: "September 28, 2023",
        description: "My journey from traditional CSS and BEM to utility-first styling with TailwindCSS. Why I'm never going back.",
        tags: ["Frontend", "CSS", "Web Dev"],
        content: "Suspendisse potenti. In scelerisque scelerisque efficitur. Donec ut egestas arcu. Vivamus rhoncus, nibh a feugiat dictum, leo elit rhoncus ex, eu malesuada sem ex nec sem. Nam ut ante tortor. In hac habitasse platea dictumst. Sed sit amet nisi et enim dapibus consequat. Integer ac metus nec turpis facilisis lacinia. Nunc a mi a dolor dapibus sollicitudin. In hac habitasse platea dictumst. Mauris non erat et nisl pharetra iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec vitae odio quis nisi dapibus malesuada. Nam commodo, tortor eget consectetur similique, enim ex auctor quam, vel efficitur justo orci in justo. Phasellus quis convallis turpis, et elementum est. Fusce non nibh ut elit euismod aliquam. Integer id mi eget massa commodo eleifend. Sed sed ex et ante aliquam lacinia. In hac habitasse platea dictumst."
    },
    {
        title: "A First Look at Next.js 14",
        date: "November 5, 2023",
        description: "Exploring the new features in Next.js 14, from Server Actions to improved Turbopack performance. Is it worth the upgrade?",
        tags: ["Next.js", "React", "JavaScript"],
        content: "Praesent ac quam eget ex varius euismod. Vivamus commodo, magna et fermentum dictum, urna est facilisis arcu, id tristique velit nisl id nisl. Phasellus nec elit in lectus ullamcorper ultricies. Sed quis massa at nibh semper ultricies. Aenean ultrices, eros et vulputate interdum, elit elit ullamcorper sem, a egestas magna quam ut quam. Curabitur vitae nisi nec lectus tincidunt aliquet. Aliquam erat volutpat. Nulla facilisi. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim. Mauris in purus at eros dictum commodo. Pellentesque convallis, lacus quis viverra tincidunt, justo mi accumsan sem, sit amet imperdiet lorem felis a est."
    }
];

type BlogPost = (typeof blogPosts)[0];

export function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section className="h-screen w-full snap-start flex flex-col items-center justify-center relative p-8 md:p-16 pt-24 bg-background">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 flex items-center gap-4 justify-center">
          <Rss className="text-primary size-10" />
          Mini Blogs
        </h2>
        <p className="text-lg text-muted-foreground">Sharing thoughts on tech and development.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {blogPosts.map((post) => (
          <Card key={post.title} className="bg-card/60 backdrop-blur-sm border-white/10 flex flex-col">
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
                <Button variant="link" className="p-0 h-auto" onClick={() => setSelectedPost(post)}>
                  Read More <ArrowRight className="ml-2 size-4" />
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="bg-card/60 backdrop-blur-lg border-white/10 sm:max-w-3xl h-[80vh]">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">{selectedPost.title}</DialogTitle>
                <DialogDescription>{selectedPost.date}</DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-full pr-4">
                  <p className="text-muted-foreground whitespace-pre-wrap">{selectedPost.content}</p>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
