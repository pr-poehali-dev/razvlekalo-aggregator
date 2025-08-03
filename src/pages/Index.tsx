import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [notification, setNotification] = useState('');
  const [bookingVenue, setBookingVenue] = useState<any>(null);

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
      isRecommended: true,
      coordinates: { lat: 55.7558, lng: 37.6176 },
      address: 'ул. Арбат, 15',
      phone: '+7 (495) 123-45-67',
      workingHours: '11:00 - 23:00',
      description: 'Уютный ресторан европейской кухни с романтической атмосферой и отличной винной картой.',
      userReviews: [
        { id: 1, user: 'Анна К.', rating: 5, text: 'Потрясающая атмосфера! Очень вкусная еда и отличное обслуживание.', date: '2 дня назад' },
        { id: 2, user: 'Михаил Р.', rating: 4, text: 'Хороший ресторан, но цены немного завышены. Качество на высоте.', date: '1 неделю назад' }
      ],
      availableTimes: ['18:00', '19:00', '20:00', '21:00']
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
      isRecommended: false,
      coordinates: { lat: 55.7612, lng: 37.6155 },
      address: 'Тверская ул., 12',
      phone: '+7 (495) 987-65-43',
      workingHours: '10:00 - 02:00',
      description: 'Современный кинотеатр с IMAX залами и технологиями последнего поколения.',
      userReviews: [
        { id: 3, user: 'Елена М.', rating: 5, text: 'Отличный звук и картинка! Самый лучший кинотеатр в городе.', date: '3 дня назад' },
        { id: 4, user: 'Дмитрий С.', rating: 4, text: 'Хорошие кресла, но попкорн дороговат. В целом рекомендую.', date: '5 дней назад' }
      ],
      availableTimes: ['15:00', '18:00', '21:00', '00:00']
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
      isRecommended: true,
      coordinates: { lat: 55.7522, lng: 37.6156 },
      address: 'Никольская ул., 8',
      phone: '+7 (495) 555-12-34',
      workingHours: '12:00 - 02:00',
      description: 'Игровая зона с VR-аттракционами, ретро-автоматами и регулярными турнирами.',
      userReviews: [
        { id: 5, user: 'Игорь В.', rating: 5, text: 'Невероятные VR-игры! Дети в восторге, да и сам отлично провел время.', date: '1 день назад' },
        { id: 6, user: 'Мария Л.', rating: 5, text: 'Отличное место для компании. Много разных игр на любой вкус.', date: '4 дня назад' }
      ],
      availableTimes: ['14:00', '16:00', '18:00', '20:00']
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

  const handleBookingOpen = (venue: any) => {
    setBookingVenue(venue);
    setShowBookingDialog(true);
  };

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
                <VenueCard 
                  key={venue.id} 
                  venue={venue} 
                  onViewDetails={() => setSelectedVenue(venue)}
                  onBooking={() => handleBookingOpen(venue)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <InteractiveMap venues={venues} onVenueSelect={setSelectedVenue} />
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Все заведения</h3>
              <p className="text-muted-foreground">Найдено {filteredVenues.length} заведений</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <VenueCard 
                  key={venue.id} 
                  venue={venue} 
                  onViewDetails={() => setSelectedVenue(venue)}
                  onBooking={() => handleBookingOpen(venue)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} />
            <span>{notification}</span>
            <button onClick={() => setNotification('')}>
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Venue Details Dialog */}
      {selectedVenue && (
        <VenueDetailsDialog 
          venue={selectedVenue} 
          isOpen={!!selectedVenue}
          onClose={() => setSelectedVenue(null)}
          onBooking={() => {
            handleBookingOpen(selectedVenue);
            setSelectedVenue(null);
          }}
        />
      )}

      {/* Booking Dialog */}
      <BookingDialog 
        isOpen={showBookingDialog}
        onClose={() => setShowBookingDialog(false)}
        venue={bookingVenue}
        onSuccess={(message) => {
          setNotification(message);
          setShowBookingDialog(false);
          setTimeout(() => setNotification(''), 3000);
        }}
      />

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

const InteractiveMap = ({ venues, onVenueSelect }: { venues: any[], onVenueSelect: (venue: any) => void }) => {
  const [selectedMapVenue, setSelectedMapVenue] = useState<any>(null);

  return (
    <Card className="h-96 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100" />
          
          {/* Venue Markers */}
          {venues.map((venue, index) => (
            <button
              key={venue.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110"
              style={{
                left: `${30 + index * 25}%`,
                top: `${40 + (index % 2) * 20}%`
              }}
              onClick={() => {
                setSelectedMapVenue(venue);
                onVenueSelect(venue);
              }}
            >
              <div className="relative">
                <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                  venue.category === 'Рестораны' ? 'bg-orange-500' :
                  venue.category === 'Кино' ? 'bg-purple-500' :
                  'bg-blue-500'
                }`}>
                  <Icon 
                    name={
                      venue.category === 'Рестораны' ? 'Utensils' :
                      venue.category === 'Кино' ? 'Film' :
                      'Gamepad2'
                    } 
                    size={16} 
                    className="text-white" 
                  />
                </div>
                {selectedMapVenue?.id === venue.id && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background border rounded-lg px-2 py-1 shadow-lg whitespace-nowrap text-sm">
                    <div className="font-medium">{venue.name}</div>
                    <div className="text-xs text-muted-foreground">{venue.rating} ⭐</div>
                  </div>
                )}
              </div>
            </button>
          ))}
          
          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur rounded-lg p-3 text-sm">
            <div className="font-medium mb-2">Легенда</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span>Рестораны</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span>Кино</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Развлечения</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const VenueDetailsDialog = ({ venue, isOpen, onClose, onBooking }: { 
  venue: any; 
  isOpen: boolean; 
  onClose: () => void; 
  onBooking: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{venue.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6">
            <img 
              src={venue.image} 
              alt={venue.name} 
              className="w-full h-48 object-cover rounded-lg" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Информация</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span>{venue.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span>{venue.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span>{venue.workingHours}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" size={16} className="text-yellow-500" />
                    <span>{venue.rating} ({venue.reviews} отзывов)</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Категории</h4>
                <div className="flex flex-wrap gap-1">
                  {venue.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-muted-foreground">{venue.description}</p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold mb-4">Отзывы пользователей</h4>
              <div className="space-y-4">
                {venue.userReviews.map((review: any) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name="User" size={16} />
                        </div>
                        <span className="font-medium">{review.user}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Icon 
                              key={i} 
                              name="Star" 
                              size={14} 
                              className={i < review.rating ? 'text-yellow-500' : 'text-muted-foreground'} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex space-x-2 pt-4 border-t">
          <Button onClick={onBooking} className="flex-1">
            <Icon name="Calendar" size={16} className="mr-2" />
            Забронировать
          </Button>
          <Button variant="outline">
            <Icon name="Navigation" size={16} className="mr-2" />
            Маршрут
          </Button>
          <Button variant="outline">
            <Icon name="Heart" size={16} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const BookingDialog = ({ isOpen, onClose, venue, onSuccess }: {
  isOpen: boolean;
  onClose: () => void;
  venue: any;
  onSuccess: (message: string) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      return;
    }
    
    onSuccess(`Бронирование на ${selectedDate} в ${selectedTime} подтверждено!`);
    onClose();
    
    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setGuestCount('2');
    setSpecialRequests('');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Бронирование столика</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {venue && (
            <div className="bg-muted p-3 rounded-lg">
              <div className="font-medium">{venue.name}</div>
              <div className="text-sm text-muted-foreground">{venue.address}</div>
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium">Дата</label>
            <Input 
              type="date" 
              value={selectedDate}
              min={today}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Время</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {venue?.availableTimes?.map((time: string) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className="w-full"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Количество гостей</label>
            <Input 
              type="number" 
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              min="1"
              max="10"
              className="mt-1"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Особые пожелания</label>
            <Textarea 
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Укажите особые пожелания..."
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
        
        <div className="flex space-x-2 pt-4">
          <Button 
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime}
            className="flex-1"
          >
            <Icon name="Check" size={16} className="mr-2" />
            Подтвердить
          </Button>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const VenueCard = ({ venue, onViewDetails, onBooking }: { 
  venue: any; 
  onViewDetails: () => void;
  onBooking: () => void;
}) => {
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
          <Button size="sm" onClick={onViewDetails} className="flex-1">
            <Icon name="Eye" size={14} className="mr-2" />
            Подробнее
          </Button>
          <Button size="sm" variant="outline" onClick={onBooking}>
            <Icon name="Calendar" size={14} />
          </Button>
          <Button size="sm" variant="outline">
            <Icon name="Heart" size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;