import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import * as Popover from "@radix-ui/react-popover";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FiFilter,
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiMoreHorizontal,
  FiX,
  FiRefreshCw,
} from "react-icons/fi";
import { generateProperties } from "@/utils/generateProperties";

interface Property {
  id: string;
  title: string;
  price: number;
  status: "Deal Done" | "Available" | "No Resp.";
  availabilityStart: Date;
  availabilityEnd: Date;
  imageUrl: string;
  guests: number;
}

// Helper function to check if two date ranges overlap
const isDateOverlap = (
  propertyStart: Date,
  propertyEnd: Date,
  selectedStart: Date,
  selectedEnd: Date,
): boolean => {
  return propertyStart <= selectedEnd && propertyEnd >= selectedStart;
};

// Reusable FilterButton Component
interface FilterButtonProps {
  children: React.ReactNode;
  icon: React.ReactElement;
  ariaLabel: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  children,
  icon,
  ariaLabel,
}) => (
  <Popover.Trigger asChild>
    <button
      className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      aria-label={ariaLabel}
    >
      {icon}
      <span className="ml-2">{children}</span>
    </button>
  </Popover.Trigger>
);

export default function Matches() {
  const [searchQuery, setSearchQuery] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [availableOnly, setAvailableOnly] = useState(false);
  const [dealDoneOnly, setDealDoneOnly] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const resetDateFilter = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const resetGuestFilter = () => {
    setGuestCount(1);
  };

  const resetPriceFilter = () => {
    setPriceRange({ min: 0, max: 500 });
  };

  const resetMoreFilters = () => {
    setAvailableOnly(false);
    setDealDoneOnly(false);
  };

  const properties: Property[] = generateProperties(100);

  const fuse = useMemo(
    () =>
      new Fuse(properties, {
        keys: ["title"],
        threshold: 0.3,
        includeScore: true,
      }),
    [properties],
  );

  const filteredProperties = useMemo(() => {
    let results = properties;

    // Filter by search query
    if (searchQuery) {
      const fuseResults = fuse.search(searchQuery);
      results = fuseResults.map((result) => result.item);
    }

    // Filter by guest count
    results = results.filter((property) => property.guests >= guestCount);

    // Filter by price range
    results = results.filter(
      (property) =>
        property.price >= priceRange.min && property.price <= priceRange.max,
    );

    // Filter by status
    if (availableOnly) {
      results = results.filter((property) => property.status === "Available");
    }
    if (dealDoneOnly) {
      results = results.filter((property) => property.status === "Deal Done");
    }

    // Filter by selected dates
    if (selectedStartDate && selectedEndDate) {
      // Both start and end dates are selected
      results = results.filter((property) =>
        isDateOverlap(
          property.availabilityStart,
          property.availabilityEnd,
          selectedStartDate,
          selectedEndDate,
        ),
      );
    } else if (selectedStartDate) {
      // Only start date is selected
      results = results.filter(
        (property) => property.availabilityEnd >= selectedStartDate,
      );
    } else if (selectedEndDate) {
      // Only end date is selected
      results = results.filter(
        (property) => property.availabilityStart <= selectedEndDate,
      );
    }

    return results;
  }, [
    fuse,
    searchQuery,
    guestCount,
    priceRange,
    availableOnly,
    dealDoneOnly,
    selectedStartDate,
    selectedEndDate,
    properties,
  ]);

  return (
    <div className="py-4 px-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 bg-gray-100 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiFilter className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Filter Buttons and Reset Button */}
      <div className="flex flex-wrap items-start gap-x-4 gap-y-4 mb-6">
        {/* Dates Filter */}
        <Popover.Root>
          <FilterButton icon={<FiCalendar />} ariaLabel="Filter by Dates">
            Dates
          </FilterButton>
          <Popover.Portal>
            <Popover.Content
              className="bg-white rounded-lg shadow-lg p-6 w-80 z-50 transform transition-transform duration-200"
              sideOffset={8}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select Dates</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">
                      Start Date
                    </label>
                    <DatePicker
                      selected={selectedStartDate}
                      onChange={(date: Date | null) =>
                        setSelectedStartDate(date)
                      }
                      selectsStart
                      startDate={selectedStartDate}
                      endDate={selectedEndDate}
                      className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholderText="Select start date"
                      isClearable
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      End Date
                    </label>
                    <DatePicker
                      selected={selectedEndDate}
                      onChange={(date: Date | null) => setSelectedEndDate(date)}
                      selectsEnd
                      startDate={selectedStartDate}
                      endDate={selectedEndDate}
                      minDate={selectedStartDate}
                      className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholderText="Select end date"
                      isClearable
                    />
                  </div>
                </div>
                <button
                  onClick={resetDateFilter}
                  className="flex items-center px-3 py-2 bg-gray-100 border border-transparent rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
                  aria-label="Reset Date Filters"
                >
                  <FiX className="w-4 h-4" />
                  <span className="ml-2">Reset Dates</span>
                </button>
              </div>
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* Guests Filter */}
        <Popover.Root>
          <FilterButton icon={<FiUsers />} ariaLabel="Filter by Guests">
            Guests
          </FilterButton>
          <Popover.Portal>
            <Popover.Content
              className="bg-white rounded-lg shadow-lg p-6 w-64 z-50 transform transition-transform duration-200"
              sideOffset={8}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select Guests</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() =>
                      setGuestCount((prev) => Math.max(prev - 1, 1))
                    }
                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Decrease Guests"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{guestCount}</span>
                  <button
                    onClick={() => setGuestCount((prev) => prev + 1)}
                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Increase Guests"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={resetGuestFilter}
                  className="flex items-center px-3 py-2 bg-gray-100 border border-transparent rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
                  aria-label="Reset Guest Filter"
                >
                  <FiX className="w-4 h-4" />
                  <span className="ml-2">Reset Guests</span>
                </button>
              </div>
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* Price Filter */}
        <Popover.Root>
          <FilterButton icon={<FiDollarSign />} ariaLabel="Filter by Price">
            Price
          </FilterButton>
          <Popover.Portal>
            <Popover.Content
              className="bg-white rounded-lg shadow-lg p-6 w-80 z-50 transform transition-transform duration-200"
              sideOffset={8}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Select Price Range ($)
                </h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">
                      Min Price
                    </label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: Number(e.target.value),
                        }))
                      }
                      className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min={0}
                      aria-label="Minimum Price"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Max Price
                    </label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: Number(e.target.value),
                        }))
                      }
                      className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min={priceRange.min}
                      aria-label="Maximum Price"
                      placeholder="500"
                    />
                  </div>
                </div>
                <button
                  onClick={resetPriceFilter}
                  className="flex items-center px-3 py-2 bg-gray-100 border border-transparent rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
                  aria-label="Reset Price Filter"
                >
                  <FiX className="w-4 h-4" />
                  <span className="ml-2">Reset Price</span>
                </button>
              </div>
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* More Filters */}
        <Popover.Root>
          <FilterButton icon={<FiMoreHorizontal />} ariaLabel="More Filters">
            More
          </FilterButton>
          <Popover.Portal>
            <Popover.Content
              className="bg-white rounded-lg shadow-lg p-6 w-64 z-50 transform transition-transform duration-200"
              sideOffset={8}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">More Filters</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={availableOnly}
                      onChange={(e) => setAvailableOnly(e.target.checked)}
                      aria-label="Available Only"
                    />
                    <span>Available only</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={dealDoneOnly}
                      onChange={(e) => setDealDoneOnly(e.target.checked)}
                      aria-label="Deal Done Only"
                    />
                    <span>Deal Done</span>
                  </label>
                </div>
                <button
                  onClick={resetMoreFilters}
                  className="flex items-center px-3 py-2 bg-gray-100 border border-transparent rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
                  aria-label="Reset More Filters"
                >
                  <FiX className="w-4 h-4" />
                  <span className="ml-2">Reset More</span>
                </button>
              </div>
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div
              key={property.id}
              className="rounded-lg overflow-hidden shadow-md bg-white"
            >
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <div
                    className={`
                      px-2 py-1 rounded-full text-xs
                      ${
                        property.status === "Deal Done"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                      }
                      ${
                        property.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                      ${
                        property.status === "No Resp."
                          ? "bg-red-100 text-red-800"
                          : ""
                      }
                    `}
                  >
                    {property.status}
                  </div>
                </div>
                <p className="text-gray-600 font-medium">
                  ${property.price}/night
                </p>
                <p className="text-gray-500 text-sm">
                  Available: {property.availabilityStart.toLocaleDateString()} -{" "}
                  {property.availabilityEnd.toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Guests: {property.guests}
                </p>
                {selectedStartDate && selectedEndDate && (
                  <p className="text-gray-500 text-sm mt-2">
                    Stay: {selectedStartDate.toLocaleDateString()} -{" "}
                    {selectedEndDate.toLocaleDateString()}
                  </p>
                )}
                {selectedStartDate && !selectedEndDate && (
                  <p className="text-gray-500 text-sm mt-2">
                    Stay from: {selectedStartDate.toLocaleDateString()}
                  </p>
                )}
                {!selectedStartDate && selectedEndDate && (
                  <p className="text-gray-500 text-sm mt-2">
                    Stay until: {selectedEndDate.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center">
            No properties match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
