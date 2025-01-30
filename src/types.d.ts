declare interface Image {
  id: string;
  path: string;
  created_at: string;
}

declare interface Property {
  key_uz: string;
  key_ru: string;
  value_uz: string;
  value_ru: string;
  id: string;
  created_at: string;
  updated_at: string;
}

declare interface Brand {
  name: string;
  image: string;
  brand_type: string;
  id: number;
}

declare interface Specifics {
  name_uz: string;
  name_ru: string;
  brand_id: number;
  model: string;
  color_uz: string;
  engine_type: string;
  vehicle_type: string;
  transmission: string;
  drive_type: string;
  price: number;
  year: number;
  description_uz: string;
  description_ru: string;
  color_ru: string;
  currency: string;
  id: string;
  brand: Brand;
}

declare interface Measurements {
  length: number;
  height: number;
  wheelbase: number;
  height_including_rails: number;
  luggage_capacity_up: number;
  luggage_capacity_down: number;
  width: number;
  width_including_mirrors: number;
  gross_vehicle_weight: number;
  max_loading_weight: number;
  min_loading_weight: number;
  created_at: string;
  updated_at: string;
}

declare interface CarObject {
  model_file: string;
  cover_image: string;
  images: Image[];
  id: string;
  view_count: number;
  created_at: string;
  updated_at: string;
  rating: number;
  properties: Property[];
  specifics: Specifics[];
  measurements: Measurements[];
}
