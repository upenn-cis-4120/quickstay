import { DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, Drawer } from '@/components/ui/drawer';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'geist-icons';
import { useState } from 'react'

export default function Home() {
  const [cards, setCards] = useState([
    {
      distance: 2.2,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 4280,
      address: "412 Spruce Street, 19102, Philadelphia, PA",
      cost: 1466,
      url: './house.png'
    },
    {
      distance: 1.8,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 3200,
      address: "2120 Delancey Street, 19103, Philadelphia, PA",
      cost: 1890,
      url: 'https://www.onthesquarerealestate.com/wp-content/uploads/2019/07/HR-2120-Delancey-St5.jpg'
    },
    {
      distance: 3.1,
      bedrooms: 5,
      bathrooms: 3.5,
      sqft: 4800,
      address: "247 S 3rd Street, 19106, Philadelphia, PA",
      cost: 2100,
      url: 'https://www.johnsonhouse.org/wp-content/uploads/2023/03/5.jpeg'
    },
    {
      distance: 0.9,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1850,
      address: "1815 JFK Blvd, 19103, Philadelphia, PA",
      cost: 1250,
      url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/387502758.jpg?k=288205644da7058f1a625ea9752acecbcb7298854a436d1d7a6430ea1d7e6acd&o=&hp=1'
    },
  ]);

  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setStartPosition({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPosition.x;
    const deltaY = touch.clientY - startPosition.y;
    setDragPosition({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (Math.abs(dragPosition.x) > 50) {
      setCards(cards.slice(1));
    }
    setDragPosition({ x: 0, y: 0 });
    setIsDragging(false);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-sm h-[500px]">
          {cards.length > 0 && cards.map((card, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-all duration-300 ${index === 0 ? 'z-10' : 'z-0'}`}
              style={{
                transform: index === 0
                  ? `translate(${dragPosition.x}px, ${dragPosition.y}px) rotate(${dragPosition.x * 0.1}deg)`
                  : `scale(${1 - index * 0.05}) translateY(-${index * 8}px)`,
                opacity: 1 - index * 0.2
              }}
              onTouchStart={index === 0 ? handleTouchStart : undefined}
              onTouchMove={index === 0 ? handleTouchMove : undefined}
              onTouchEnd={index === 0 ? handleTouchEnd : undefined}
            >
              <div className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden relative">
                <img
                  src={card.url}
                  alt="Picture of rental"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 w-full px-2">
                  <div className="flex justify-between">
                    <div className="px-3 py-1 rounded-full bg-white text-primary text-xs font-semibold shadow-lg border-2 border-primary">
                      {card.distance}mi
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white text-xs font-semibold shadow-lg border-2" 
                         style={{ borderColor: '#EBBAB9', color: '#EBBAB9' }}>
                      {card.bedrooms} bd, {card.bathrooms} ba, {card.sqft} sqft
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white text-xs font-semibold shadow-lg border-2" 
                         style={{ borderColor: '#AEF3E1', color: '#789187' }}>
                      ${card.cost}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center space-x-4 text-gray-600">
        <div className="flex items-center">
          <ChevronLeft className="mr-2" />
          <span>Not Interested</span>
        </div>
        <div className="h-4 w-px bg-gray-300" />
        <div className="flex items-center">
          <span>Pursue Further</span>
          <ChevronRight className="ml-2" />
        </div>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <ChevronUp className="fixed bottom-4 left-1/2 transform -translate-x-1/2" />
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Details</DrawerTitle>
              <DrawerDescription>In-depth look at your property.</DrawerDescription>
            </DrawerHeader>
            <div className="h-96">Put Content Here</div>
            <DrawerFooter>
              <DrawerClose asChild>
                <ChevronDown className="self-center" />
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}