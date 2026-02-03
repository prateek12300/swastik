import Link from "next/link"
import { Flame, Sun, BookOpen, Sparkles, Repeat, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const iconMap = {
  flame: Flame,
  sun: Sun,
  book: BookOpen,
  peace: Heart,
  sparkles: Sparkles,
  repeat: Repeat,
}

interface CategoryCardProps {
  category: {
    id: string
    name: string
    nameHindi: string
    icon: string
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon as keyof typeof iconMap] || Flame

  return (
    <Link href={`/packages?category=${category.id}`}>
      <Card className="group h-full transition-all hover:shadow-lg hover:border-primary/50 hover:bg-primary/5">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-7 w-7" />
          </div>
          <h3 className="font-semibold text-foreground">{category.name}</h3>
          <p className="text-sm text-muted-foreground">{category.nameHindi}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
