"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GraduationCap, Award } from "lucide-react"

interface EducationItem {
    degree?: string;
    institution?: string;
    period?: string;
    details?: string;
    name?: string;
    issuer?: string;
    year?: string;
}

export function EducationCard({ item, isCertification = false }: { item: EducationItem, isCertification?: boolean }) {
    return (
        <Card className="w-[350px] bg-card/40 backdrop-blur-sm border-white/10 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
             <CardHeader>
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/20 rounded-md">
                    {isCertification ? 
                        <Award className="h-6 w-6 text-primary" /> : 
                        <GraduationCap className="h-6 w-6 text-primary" />
                    }
                    </div>
                    <div>
                        <CardTitle className="text-xl font-light font-headline">{isCertification ? item.name : item.degree}</CardTitle>
                        <CardDescription className="font-body text-primary">{isCertification ? item.issuer : item.institution}</CardDescription>
                        <p className="font-code text-sm text-muted-foreground mt-1">{isCertification ? item.year : item.period}</p>
                    </div>
                </div>
            </CardHeader>
            {item.details && (
                <CardContent>
                    <p className="text-muted-foreground font-body pl-[52px]">{item.details}</p>
                </CardContent>
            )}
        </Card>
    )
}
