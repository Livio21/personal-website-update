"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Terminal } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const ComponentShowcase = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-headline font-light text-primary mb-6 border-b border-primary/20 pb-2">{title}</h2>
    <div className="flex flex-wrap items-start gap-6 p-4 rounded-lg bg-card/20 border border-white/10">
      {children}
    </div>
  </div>
)

const ColorSwatch = ({ name, className }: { name: string, className: string }) => (
  <div className="flex flex-col items-center gap-2 font-code text-sm">
    <div className={`w-24 h-24 rounded-lg border border-white/10 shadow-md ${className}`}></div>
    <span className="text-muted-foreground">{name}</span>
  </div>
)

export default function DesignPage() {
  const { toast } = useToast()

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-headline font-light tracking-tight text-primary">Design System</h1>
        <p className="mt-4 text-lg text-muted-foreground font-body">A showcase of the visual components and styles for this project.</p>
      </header>

      {/* --- COLORS --- */}
      <ComponentShowcase title="Colors">
        <ColorSwatch name="Background" className="bg-background" />
        <ColorSwatch name="Foreground" className="bg-foreground" />
        <ColorSwatch name="Card" className="bg-card" />
        <ColorSwatch name="Primary" className="bg-primary" />
        <ColorSwatch name="Secondary" className="bg-secondary" />
        <ColorSwatch name="Accent" className="bg-accent" />
        <ColorSwatch name="Muted" className="bg-muted" />
        <ColorSwatch name="Destructive" className="bg-destructive" />
      </ComponentShowcase>

      {/* --- TYPOGRAPHY --- */}
      <ComponentShowcase title="Typography">
        <div className="w-full space-y-6">
          <div>
            <p className="text-sm font-code text-muted-foreground mb-1">Headline (Poppins)</p>
            <h1 className="font-headline text-5xl font-light">The Quick Brown Fox</h1>
          </div>
          <div>
            <p className="text-sm font-code text-muted-foreground mb-1">Body (Inter)</p>
            <p className="font-body text-lg">The quick brown fox jumps over the lazy dog. This is the default body text style, designed for readability.</p>
          </div>
          <div>
            <p className="text-sm font-code text-muted-foreground mb-1">Code (JetBrains Mono)</p>
            <p className="font-code text-base"><code>console.log("Hello, World!")</code></p>
          </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
             <div>
                <p className="text-sm font-code text-muted-foreground mb-1">Serif (Playfair Display)</p>
                <p className="font-serif text-2xl">A Tale of Two Cities</p>
              </div>
              <div>
                <p className="text-sm font-code text-muted-foreground mb-1">Script (Pacifico)</p>
                <p className="font-script text-3xl">Sincerely, Yours</p>
              </div>
              <div>
                <p className="text-sm font-code text-muted-foreground mb-1">Stardom</p>
                <p className="font-stardom text-3xl">Hollywood</p>
              </div>
               <div>
                <p className="text-sm font-code text-muted-foreground mb-1">Melodrama</p>
                <p className="font-melodrama text-3xl">An Elegant Story</p>
              </div>
           </div>
        </div>
      </ComponentShowcase>

      {/* --- BUTTONS --- */}
      <ComponentShowcase title="Buttons">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="glass">Glass</Button>
        <ShinyButton>Shiny</ShinyButton>
      </ComponentShowcase>
      
      {/* --- UI COMPONENTS --- */}
      <ComponentShowcase title="UI Components">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Card Component</CardTitle>
                    <CardDescription>This is a standard card.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Cards can be used to group related content and actions.</p>
                </CardContent>
                <CardFooter>
                    <Button variant="secondary">Action</Button>
                </CardFooter>
            </Card>

            <div className="space-y-4">
                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    This is a default alert component.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Danger!</AlertTitle>
                  <AlertDescription>
                    This is a destructive alert component.
                  </AlertDescription>
                </Alert>
            </div>
            
            <div className="flex flex-wrap gap-2">
                <Badge>Default Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
            </div>

            <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Button onClick={() => {
                  toast({
                    title: "Scheduled: Catch up ",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                  })
                }}>
                  Show Toast
                </Button>
            </div>

            <Tabs defaultValue="account" className="w-full">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Make changes to your account here.</TabsContent>
              <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
             <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>

        </div>
      </ComponentShowcase>

      {/* --- FORM ELEMENTS --- */}
      <ComponentShowcase title="Form Elements">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Input placeholder="Email" />
            <Textarea placeholder="Your message" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Comfortable</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
             <Slider defaultValue={[50]} max={100} step={1} />
          </div>
        </div>
      </ComponentShowcase>

      <Toaster />
    </div>
  )
}
