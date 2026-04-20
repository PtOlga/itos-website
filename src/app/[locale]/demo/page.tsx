import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.demo')
  return { title: t('title') }
}

export default async function DemoPage() {
  const t = await getTranslations('demoPage')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-darkmode dark:to-darklight py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-darktext">
            {t('description')}
          </p>
        </div>

        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('buttons.title')}</CardTitle>
            <CardDescription>{t('buttons.description')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>{t('buttons.default')}</Button>
            <Button variant="secondary">{t('buttons.secondary')}</Button>
            <Button variant="destructive">{t('buttons.destructive')}</Button>
            <Button variant="outline">{t('buttons.outline')}</Button>
            <Button variant="ghost">{t('buttons.ghost')}</Button>
            <Button variant="link">{t('buttons.link')}</Button>
            <Button size="sm">{t('buttons.small')}</Button>
            <Button size="lg">{t('buttons.large')}</Button>
          </CardContent>
        </Card>

        {/* Cards & Badges */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t('profile.title')}</CardTitle>
                <Badge>{t('profile.badge')}</Badge>
              </div>
              <CardDescription>{t('profile.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t('profile.action')}</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('contact.title')}</CardTitle>
              <CardDescription>{t('contact.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('contact.name')}</Label>
                <Input id="name" placeholder={t('contact.namePlaceholder')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('contact.email')}</Label>
                <Input id="email" type="email" placeholder={t('contact.emailPlaceholder')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t('contact.message')}</Label>
                <Textarea id="message" placeholder={t('contact.messagePlaceholder')} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t('contact.action')}</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>{t('tabs.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">{t('tabs.account')}</TabsTrigger>
                <TabsTrigger value="password">{t('tabs.password')}</TabsTrigger>
                <TabsTrigger value="settings">{t('tabs.settings')}</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-darktext">
                  {t('tabs.accountContent')}
                </p>
              </TabsContent>
              <TabsContent value="password" className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-darktext">
                  {t('tabs.passwordContent')}
                </p>
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-darktext">
                  {t('tabs.settingsContent')}
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Accordion */}
        <Card>
          <CardHeader>
            <CardTitle>{t('accordion.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t('accordion.item1Title')}</AccordionTrigger>
                <AccordionContent>
                  {t('accordion.item1Content')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t('accordion.item2Title')}</AccordionTrigger>
                <AccordionContent>
                  {t('accordion.item2Content')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t('accordion.item3Title')}</AccordionTrigger>
                <AccordionContent>
                  {t('accordion.item3Content')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

