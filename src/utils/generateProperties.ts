import { faker } from "@faker-js/faker";
import { Property } from "@/types/Property";

// Define possible statuses
const statuses: Property["status"][] = ["Deal Done", "Available", "No Resp."];

// Function to generate a random date within the next year
const getRandomDate = (start: Date, end: Date): Date => {
  return faker.date.between({ from: start, to: end });
};

// Function to generate a single Property
const generateProperty = (): Property => {
  const apartmentTypes = ['Studio', '1-Bedroom', '2-Bedroom', 'Loft', 'Penthouse'];
  const locations = ['Downtown', 'Suburban', 'Uptown', 'City Center', 'Near Park'];
  const amenities = ['with Balcony', 'Near Public Transport', 'Furnished', 'Pet-Friendly', 'Hardwood Floors'];

  const type = faker.helpers.arrayElement(apartmentTypes);
  const location = faker.helpers.arrayElement(locations);
  const amenity = faker.helpers.arrayElement(amenities);

  const availabilityStart = getRandomDate(
    new Date(),
    new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  );

  // Generate a random number of months to add (1-6)
  const monthsToAdd = faker.number.int({ min: 1, max: 6 });

  // Create a new Date for availabilityEnd to avoid mutating availabilityStart
  const availabilityEndStart = new Date(availabilityStart.getTime() + 24 * 60 * 60 * 1000); // At least 1 day after
  const availabilityEnd = getRandomDate(
    availabilityEndStart,
    new Date(
      availabilityEndStart.getFullYear(),
      availabilityEndStart.getMonth() + monthsToAdd,
      availabilityEndStart.getDate()
    )
  );

  return {
    id: faker.string.uuid(),
    title: `${type} Apartment in ${location} ${amenity}`,
    price: faker.number.int({ min: 50, max: 500 }), // Price per night
    status: faker.helpers.arrayElement(statuses),
    availabilityStart: availabilityStart,
    availabilityEnd: availabilityEnd,
    imageUrl: `https://picsum.photos/seed/${faker.string.uuid()}/640/480`, // Unique image
    guests: faker.number.int({ min: 1, max: 10 }),
  };
};

// Function to generate an array of Properties
export const generateProperties = (count: number = 100): Property[] => {
  return Array.from({ length: count }, () => generateProperty());
}; 