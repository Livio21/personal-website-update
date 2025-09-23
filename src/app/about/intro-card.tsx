"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PrismShape from "@/components/prism-shape"

export function IntroCard() {
  return (
     <div className="grid grid-cols-1 md:grid-cols-5 gap-12 w-[80vw] max-w-5xl items-center">
        <div className="md:col-span-3">
            <Card className="bg-transparent border-none">
                <CardHeader>
                    <h1 className="text-4xl md:text-6xl font-headline font-light tracking-tight mb-4">
                        About Me
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground font-body">
                        My story, skills, and professional journey.
                    </p>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-muted-foreground font-body">
                        Hello! I'm a passionate developer and designer with a knack for creating engaging and user-friendly digital experiences. My journey into the world of tech began with a fascination for how things work, which quickly evolved into a love for building and designing applications. I thrive on solving complex problems and am constantly learning new technologies to push the boundaries of what's possible on the web.
                    </p>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2 flex items-center justify-center">
          <div className="w-full max-w-[250px] mx-auto">
            <PrismShape />
          </div>
        </div>
    </div>
  );
}
