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
        <Card className="w-[350px] bg-card/40 backdrop-blur-sm border-white/10 h-full shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
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
