import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const venues = [
    {
      id: 1,
      name: 'Atmosphere Restaurant',
      category: 'Рестораны',
      rating: 4.8,
      reviews: 247,
      distance: '0.5 км',
      image: '/img/32e4a4aa-2e22-4fc4-8bbf-1c81c93782d8.jpg',
      tags: ['Европейская кухня', 'Романтично', 'Винная карта'],
      price: '$$',
      isRecommended: true
    },
    {
      id: 2,
      name: 'CinemaMax IMAX',
      category: 'Кино',
      rating: 4.6,
      reviews: 189,
      distance: '1.2 км',
      image: '/img/79f11a7a-df1e-43ec-acdd-c9f6bfd1a22b.jpg',
      tags: ['IMAX', 'Премьеры', 'Комфорт+'],
      price: '$',
      isRecommended: false
    },
    {
      id: 3,
      name: 'GameZone Arcade',
      category: 'Развлечения',
      rating: 4.9,
      reviews: 156,
      distance: '0.8 км',
      image: '/img/95eea371-519f-4e26-92f7-91a4f4f50a6f.jpg',
      tags: ['VR', 'Ретро игры', 'Турниры'],
      price: '$',
      isRecommended: true
    }
  ];

  const categories = ['all', 'Рестораны', 'Кино', 'Развлечения', 'Спорт', 'Культура'];

  const filteredVenues = venues.filter(venue => {
    const matchesCategory = selectedCategory === 'all' || venue.category === selectedCategory;
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const recommendations = venues.filter(venue => venue.isRecommended);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={24} className="text-primary" />
            <h1 className="text-2xl font-bold">Razvlekalo</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Карта</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Категории</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Топ</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Профиль</a>
          </nav>
          <Button size="sm" className="hidden md:flex">
            <Icon name="User" size={16} className="mr-2" />
            Войти
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Найди идеальное место для
            <span className="text-primary"> развлечений</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Интеллектуальные рекомендации на основе ваших интересов и предпочтений
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск заведений..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                {category === 'all' ? 'Все' : category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container px-4 pb-12">
        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommendations">Рекомендации</TabsTrigger>
            <TabsTrigger value="map">Карта</TabsTrigger>
            <TabsTrigger value="all">Все места</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="mt-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Персональные рекомендации</h3>
              <p className="text-muted-foreground">На основе ваших интересов и популярности</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <Card className="h-96 bg-muted flex items-center justify-center">
              <div className="text-center">
                <Icon name="Map" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-lg font-semibold mb-2">Интерактивная карта</h4>
                <p className="text-muted-foreground">Здесь будет отображаться карта с заведениями</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Все заведения</h3>
              <p className="text-muted-foreground">Найдено {filteredVenues.length} заведений</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
        <div className="grid grid-cols-5 py-2">
          {[
            { icon: 'Home', label: 'Главная' },
            { icon: 'Map', label: 'Карта' },
            { icon: 'Grid3X3', label: 'Категории' },
            { icon: 'Star', label: 'Топ' },
            { icon: 'User', label: 'Профиль' }
          ].map((item) => (
            <button key={item.label} className="flex flex-col items-center py-2 px-1">
              <Icon name={item.icon as any} size={20} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

const VenueCard = ({ venue }: { venue: any }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-48 object-cover"
        />
        {venue.isRecommended && (
          <Badge className="absolute top-2 right-2 bg-accent">
            <Icon name="Sparkles" size={12} className="mr-1" />
            Рекомендуем
          </Badge>
        )}
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight">{venue.name}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} className="mr-1" />
            {venue.distance}
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Icon name="Star" size={14} className="text-yellow-500 mr-1" />
            <span className="font-medium">{venue.rating}</span>
            <span className="text-muted-foreground ml-1">({venue.reviews})</span>
          </div>
          <Badge variant="outline">{venue.category}</Badge>
          <span className="text-muted-foreground">{venue.price}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {venue.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1">
            <Icon name="Navigation" size={14} className="mr-2" />
            Маршрут
          </Button>
          <Button size="sm" variant="outline">
            <Icon name="Heart" size={14} />
          </Button>
          <Button size="sm" variant="outline">
            <Icon name="Share" size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;