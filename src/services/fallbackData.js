export const fallbackAppData = {
  orders: [
    {
      id: 'ORD-101',
      customerName: 'Aarav Singh',
      restaurantName: 'Spice Route',
      totalAmount: 420,
      rating: 4,
      status: 'pending',
      items: [
        { name: 'Paneer Tikka', quantity: 2, rate: 120 },
        { name: 'Butter Naan', quantity: 3, rate: 60 },
      ],
    },
    {
      id: 'ORD-102',
      customerName: 'Maya Joseph',
      restaurantName: 'Green Bowl',
      totalAmount: 310,
      rating: 5,
      status: 'delivered',
      items: [
        { name: 'Veg Salad', quantity: 1, rate: 110 },
        { name: 'Smoothie', quantity: 2, rate: 100 },
      ],
    },
    {
      id: 'ORD-103',
      customerName: 'Rohan Das',
      restaurantName: 'Urban Biryani',
      totalAmount: 560,
      rating: 3,
      status: 'cancelled',
      items: [
        { name: 'Chicken Biryani', quantity: 2, rate: 220 },
        { name: 'Raita', quantity: 1, rate: 120 },
      ],
    },
    {
      id: 'ORD-104',
      customerName: 'Sara Khan',
      restaurantName: 'Coastal Kitchen',
      totalAmount: 275,
      rating: 4,
      status: 'pending',
      items: [
        { name: 'Fish Curry', quantity: 1, rate: 175 },
        { name: 'Steamed Rice', quantity: 1, rate: 100 },
      ],
    },
  ],
}

export const createFallbackAppData = () =>
  JSON.parse(JSON.stringify(fallbackAppData))
