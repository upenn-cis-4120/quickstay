import { DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose, Drawer } from '@/components/ui/drawer';
import { ChevronDown, ChevronUp } from 'geist-icons';
import { useState } from 'react'
import { initialCards } from './Home';

export default function HomeAlternate() {
  const [cards, setCards] = useState(initialCards);

  const handleCardDecision = (accept: boolean) => {
    setCards(cards.slice(1));
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-sm h-[calc(100dvh-14rem)]">
          {cards.length > 0 && cards.map((card, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-all duration-300 ${index === 0 ? 'z-10' : 'z-0'}`}
              style={{
                transform: `scale(${1 - index * 0.05}) translateY(-${index * 8}px)`,
                opacity: 1 - index * 0.2
              }}
            >
              <div className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden relative">
                <img src={card.url} alt="Picture of rental" className="w-full h-full object-cover" />
                <div className="absolute top-2 w-full px-2">
                  <div className="flex justify-between">
                    <div className="px-3 py-1 rounded-full bg-white text-primary text-sm font-semibold shadow-lg border-2 border-primary">
                      {card.distance}mi
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white text-sm font-semibold shadow-lg border-2" 
                         style={{ borderColor: '#EBBAB9', color: '#EBBAB9' }}>
                      {card.bedrooms} bd, {card.bathrooms} ba, {card.sqft} sqft
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white text-sm font-semibold shadow-lg border-2"
                         style={{ borderColor: '#AEF3E1', color: '#789187' }}>
                      ${card.cost}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 w-full max-w-sm flex justify-between gap-4">
          <button
            onClick={() => handleCardDecision(false)}
            className="flex-1 py-4 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
          >
            Not Interested
          </button>
          <button
            onClick={() => handleCardDecision(true)}
            className="flex-1 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
          >
            Interested
          </button>
        </div>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <ChevronUp className="fixed bottom-4 left-1/2 transform -translate-x-1/2" />
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="text-2xl font-bold">Details</DrawerTitle>
            </DrawerHeader>
            <div className="space-y-4 px-4 py-2 text-gray-900">
              <div>
                <p className="text-lg font-semibold">{cards[0].bedrooms} bedrooms, {cards[0].bathrooms} bathrooms</p>
                <div className="flex space-x-2 mt-1">
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">Confirmed (Text)</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">From Listing</span>
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold">{cards[0].sqft} square feet</p>
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">From Listing</span>
              </div>

              <div>
                <p className="text-lg font-semibold">{cards[0].address}</p>
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">From Listing</span>
              </div>

              <div>
                <p className="text-lg font-semibold">${cards[0].cost} per month</p>
                <div className="flex space-x-2 mt-1">
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">Confirmed (Text)</span>
                  <span className="px-2 py-1 rounded-full text-blue-600 text-xs font-semibold underline cursor-pointer">jump to text</span>
                </div>
              </div>
            </div>

            <hr className="my-4 border-gray-300" />

            <div className="px-4 py-2">
              <h2 className="text-xl font-bold mb-2">AI-assisted Conversation</h2>

              <div className="flex justify-center">
                <p className="text-xs text-gray-500">Wed 6:55 AM</p>
              </div>

              <div className="space-y-3 mt-2">
                <div className="flex flex-col items-end">
                  <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs text-sm font-medium shadow-md">
                    Is this still available?
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Seen 16h ago</p>
                </div>

                <div className="flex justify-start items-end">
                  <div className="bg-gray-800 text-white rounded-lg p-3 max-w-xs text-sm font-medium shadow-md">
                    It sure is!
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-6 justify-center">
                <button className="px-4 py-1.5 rounded-full border border-blue-600 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition">
                  Ask about price
                </button>
                <button className="px-4 py-1.5 rounded-full border border-blue-600 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition">
                  Pet policy?
                </button>
              </div>
            </div>
            <DrawerFooter className="flex justify-center mt-4">
              <DrawerClose asChild>
                <ChevronDown className="self-center cursor-pointer" />
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
