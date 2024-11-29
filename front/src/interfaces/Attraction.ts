export interface Attraction {
    location_id: string;
    name: string;
    description: string;
    category: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
    address_string: string;
    price_level: number | null; // Le niveau de prix peut être nul
    num_reviews: number | null; // Le nombre d'avis peut être nul
    rating: number | null; // La note peut être nulle
    image_url: string;
    contactInfo: string;
    geoInfo: string;
    openingHours: string;
    cuisineType?: string; // Champ optionnel pour le type de cuisine
    hotelStyle?: string; // Champ optionnel pour le style d'hôtel
    groups?: string[]; // Champ optionnel pour les groupes
    tripAdvisorRating: number;
    awards: Award[];
    similarSuggestions: string[];
  }

  interface Award {
    year: number;
    name: string;
  }