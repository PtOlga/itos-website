# Shadcn/ui Integration Guide

## 🎉 Успешно интегрировано!

Shadcn/ui был успешно интегрирован в ваш проект Next.js. Теперь вы можете использовать красивые, доступные и настраиваемые компоненты.

## 📦 Установленные компоненты

Следующие компоненты уже установлены и готовы к использованию:

- **Button** - Кнопки с различными вариантами
- **Card** - Карточки для группировки контента
- **Input** - Поля ввода
- **Label** - Метки для форм
- **Textarea** - Многострочные текстовые поля
- **Select** - Выпадающие списки
- **Dropdown Menu** - Выпадающие меню
- **Dialog** - Модальные окна
- **Sheet** - Боковые панели
- **Accordion** - Аккордеоны
- **Tabs** - Вкладки
- **Badge** - Значки
- **Avatar** - Аватары

## 🚀 Как использовать

### Импорт компонентов

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
```

### Примеры использования

#### Button (Кнопка)

```tsx
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

#### Card (Карточка)

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Input & Label (Поле ввода и метка)

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>
```

#### Select (Выпадающий список)

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

## 📄 Демо-страница

Посетите `/demo` для просмотра всех компонентов в действии:
- http://localhost:3001/demo

## 🔧 Добавление новых компонентов

Чтобы добавить новые компоненты Shadcn/ui:

```bash
npx shadcn@latest add [component-name]
```

Примеры:
```bash
npx shadcn@latest add form
npx shadcn@latest add table
npx shadcn@latest add toast
npx shadcn@latest add calendar
```

## 📚 Обновленные компоненты

Следующие компоненты проекта были обновлены для использования Shadcn/ui:

1. **SignIn** (`src/components/Auth/SignIn/index.tsx`)
   - Использует Button, Input, Label

2. **SignUp** (`src/components/Auth/SignUp/index.tsx`)
   - Использует Button, Input, Label

3. **SocialSignIn** (`src/components/Auth/SocialSignIn.tsx`)
   - Использует Button с вариантом outline

4. **SocialSignUp** (`src/components/Auth/SocialSignUp.tsx`)
   - Использует Button с вариантом outline

5. **ContactForm** (`src/components/Contact/Form/index.tsx`)
   - Использует Button, Input, Label, Select

## 🎨 Кастомизация

Все компоненты Shadcn/ui полностью настраиваемы. Вы можете:

1. **Изменить стили** - Отредактируйте файлы в `src/components/ui/`
2. **Изменить цвета** - Обновите CSS переменные в `src/app/globals.css`
3. **Изменить конфигурацию** - Отредактируйте `components.json`

## 📖 Документация

Полная документация Shadcn/ui: https://ui.shadcn.com

## ✅ Что дальше?

1. Изучите демо-страницу `/demo`
2. Попробуйте использовать компоненты в своих страницах
3. Установите дополнительные компоненты по необходимости
4. Настройте стили под свой дизайн

Удачи! 🚀

