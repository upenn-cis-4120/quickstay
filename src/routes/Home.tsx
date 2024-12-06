import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "@/components/ui/drawer";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "geist-icons";
import { useState } from "react";

export const initialCards = [
  {
    distance: 2.2,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 4280,
    address: "412 Spruce Street, 19102, Philadelphia, PA",
    cost: 1466,
    url: "./house.png",
  },
  {
    distance: 1.8,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 3200,
    address: "2120 Delancey Street, 19103, Philadelphia, PA",
    cost: 1890,
    url: "https://www.onthesquarerealestate.com/wp-content/uploads/2019/07/HR-2120-Delancey-St5.jpg",
  },
  {
    distance: 3.1,
    bedrooms: 5,
    bathrooms: 3.5,
    sqft: 4800,
    address: "247 S 3rd Street, 19106, Philadelphia, PA",
    cost: 2100,
    url: "https://www.johnsonhouse.org/wp-content/uploads/2023/03/5.jpeg",
  },
  {
    distance: 0.9,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1850,
    address: "1815 JFK Blvd, 19103, Philadelphia, PA",
    cost: 1250,
    url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/387502758.jpg?k=288205644da7058f1a625ea9752acecbcb7298854a436d1d7a6430ea1d7e6acd&o=&hp=1",
  },
  {
    distance: 1.5,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    address: "1900 Arch Street, 19103, Philadelphia, PA",
    cost: 1750,
    url: "./house.png",
  },
  {
    distance: 2.8,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3800,
    address: "315 S 7th Street, 19106, Philadelphia, PA",
    cost: 1950,
    url: "https://www.johnsonhouse.org/wp-content/uploads/2023/03/5.jpeg",
  },
  {
    distance: 1.2,
    bedrooms: 2,
    bathrooms: 1.5,
    sqft: 1600,
    address: "2001 Hamilton Street, 19130, Philadelphia, PA",
    cost: 1350,
    url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/387502758.jpg?k=288205644da7058f1a625ea9752acecbcb7298854a436d1d7a6430ea1d7e6acd&o=&hp=1",
  },
  {
    distance: 3.5,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 5200,
    address: "219 S 18th Street, 19103, Philadelphia, PA",
    cost: 2400,
    url: "https://www.onthesquarerealestate.com/wp-content/uploads/2019/07/HR-2120-Delancey-St5.jpg",
  },
];

export default function Home() {
  const [cards, setCards] = useState(initialCards);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleCardDecision = (accept: boolean) => {
    if (cards.length > 1) {
      setCards(cards.slice(1));
    } else {
      setCards([]);
    }
  };

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
      if (cards.length > 1) {
        setCards(cards.slice(1));
      } else {
        setCards([]);
      }
    }
    setDragPosition({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const currentCard = cards[0];

  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-sm h-[calc(100dvh-14rem)]">
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-all duration-300 ${
                  index === 0 ? "z-10" : "z-0"
                }`}
                style={{
                  transform:
                    index === 0
                      ? `translate(${dragPosition.x}px, ${dragPosition.y}px) rotate(${
                          dragPosition.x * 0.1
                        }deg)`
                      : `scale(${1 - index * 0.05}) translateY(-${index * 8}px)`,
                  opacity: 1 - index * 0.2,
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
                      <div className="px-3 py-1 rounded-full bg-white text-primary text-sm font-semibold shadow-lg border-2 border-primary">
                        {card.distance}mi
                      </div>
                      <div
                        className="px-3 py-1 rounded-full bg-white text-sm font-semibold shadow-lg border-2"
                        style={{ borderColor: "#EBBAB9", color: "#EBBAB9" }}
                      >
                        {card.bedrooms} bd, {card.bathrooms} ba, {card.sqft}{" "}
                        sqft
                      </div>
                      <div
                        className="px-3 py-1 rounded-full bg-white text-sm font-semibold shadow-lg border-2"
                        style={{ borderColor: "#AEF3E1", color: "#789187" }}
                      >
                        ${card.cost}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600 text-lg font-semibold">
              No more listings
            </div>
          )}
        </div>

        <div className="mt-4 w-full max-w-sm mx-auto flex justify-between gap-4">
          <button
            onClick={() => handleCardDecision(false)}
            className="flex-1 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center text-white shadow-lg
               bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600
               transform hover:scale-[1.02] active:scale-[0.98]
               hover:shadow-xl"
            style={{
              textShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
            }}
          >
            <ChevronLeft className="mr-2" />
            Not Interested
          </button>
          <button
            onClick={() => handleCardDecision(true)}
            className="flex-1 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center text-white shadow-lg
               bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600
               transform hover:scale-[1.02] active:scale-[0.98]
               hover:shadow-xl"
            style={{
              textShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
            }}
          >
            Interested
            <ChevronRight className="ml-2" />
          </button>
        </div>
      </div>

      {currentCard && (
        <Drawer>
          <DrawerTrigger asChild>
            <ChevronUp className="fixed bottom-4 left-1/2 transform -translate-x-1/2" />
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="text-2xl font-bold">
                  Details
                </DrawerTitle>
              </DrawerHeader>
              <div className="space-y-4 px-4 py-2 text-gray-900">
                <div>
                  <p className="text-lg font-semibold">
                    {currentCard.bedrooms} bedrooms, {currentCard.bathrooms}{" "}
                    bathrooms
                  </p>
                  <div className="flex space-x-2 mt-1">
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                      Confirmed (Text)
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                      From Listing
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    {currentCard.sqft} square feet
                  </p>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                    From Listing
                  </span>
                </div>

                <div>
                  <p className="text-lg font-semibold">{currentCard.address}</p>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                    From Listing
                  </span>
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    ${currentCard.cost} per month
                  </p>
                  <div className="flex space-x-2 mt-1">
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
                      Confirmed (Text)
                    </span>
                    <span className="px-2 py-1 rounded-full text-blue-600 text-xs font-semibold underline cursor-pointer">
                      jump to text
                    </span>
                  </div>
                </div>
              </div>

              <hr className="my-4 border-gray-300" />

              <div className="px-4 py-2">
                <h2 className="text-xl font-bold mb-2">
                  AI-assisted Conversation
                </h2>

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
      )}
    </div>
  );
}
