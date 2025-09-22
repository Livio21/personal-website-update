
"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';


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

function BlogSkeleton() {
    return (
        <section className="h-full w-full flex-shrink-0 flex flex-col bg-transparent overflow-y-auto no-scrollbar">
            <div className="text-left mb-8">
                <Skeleton className="h-12 w-48 mb-2" />
                <Skeleton className="h-6 w-80" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="bg-card/40 backdrop-blur-sm border-white/10 flex flex-col">
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/4 mt-2" />
                        </CardHeader>
                        <CardContent className="flex-grow space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-4">
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </div>
                            <Skeleton className="h-5 w-24" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}

export function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // NOTE: This is here to simulate a loading state for static data.
  // In a real app, this would be `true` while fetching from a CMS.
  const [isLoading, setIsLoading] = useState(true);
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 750);
    return () => clearTimeout(timer);
  });
  
  if (isLoading) {
    return <BlogSkeleton />;
  }

  return (
    <section className="h-full w-full flex-shrink-0 flex flex-col bg-transparent overflow-y-auto no-scrollbar">
      <div className="text-left mb-8">
        <h2 className="text-4xl md:text-5xl font-headline font-light tracking-tight mb-2">
          Mini Blogs
        </h2>
        <p className="text-lg text-muted-foreground font-body">Sharing thoughts on tech and development.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {blogPosts.map((post) => (
          <Card key={post.title} className="bg-card/40 backdrop-blur-sm border-white/10 flex flex-col">
            <CardHeader>
              <CardTitle className="font-light font-headline">{post.title}</CardTitle>
              <CardDescription className="font-code">{post.date}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground font-body">{post.description}</p>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
               <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="font-code">{tag}</Badge>
                    ))}
                </div>
                <Button variant="link" className="p-0 h-auto font-body" onClick={() => setSelectedPost(post)}>
                  Read More
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="bg-card/60 backdrop-blur-lg border-white/10 sm:max-w-3xl max-h-[80vh]">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-light font-headline">{selectedPost.title}</DialogTitle>
                <DialogDescription className="font-code">{selectedPost.date}</DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-full pr-4">
                  <p className="text-muted-foreground whitespace-pre-wrap font-body">{selectedPost.content}</p>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
