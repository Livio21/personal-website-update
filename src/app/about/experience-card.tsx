"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from 'lucide-react';

interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    description: string;
}

export function ExperienceCard({ item }: { item: ExperienceItem }) {
    return (
        <Card className="w-[350px] bg-card/30 backdrop-blur-xl border-white/10 h-full shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 rounded-2xl group relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-30 animate-pulse transition-opacity duration-500"></div>
            <CardHeader>
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/20 rounded-md">
                        <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-light font-headline">{item.role}</CardTitle>
                        <p className="text-md text-primary font-medium pt-1 font-body">{item.company}</p>
                    </div>
                </div>
                 <p className="text-sm font-normal text-muted-foreground font-code pt-2">{item.period}</p>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground font-body">{item.description}</p>
            </CardContent>
        </Card>
    )
}
