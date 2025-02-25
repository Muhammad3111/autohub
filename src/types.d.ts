declare type Image = {
  id: string;
  path: string;
  created_at: string;
};

declare type Property = {
  key_uz: string;
  key_ru: string;
  value_uz: string;
  value_ru: string;
  id: string;
  created_at: string;
  updated_at: string;
};

declare type Brand = {
  name: string;
  image: string;
  brand_type: string;
  id: number;
};

declare type Specifics = {
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
};

declare type Measurements = {
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
};

declare type CarObject = {
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
};

declare type Image = {
  id: string;
  path: string;
};

declare type Vehicle = {
  id: string;
  name_uz: string;
  name_ru: string;
};

declare type SpareParts = {
  name_uz: string;
  name_ru: string;
  description_uz: string;
  description_ru: string;
  brand_id: number;
  applicable_models: string[];
  cover_image: string;
  images: Image[];
  category_id: number;
  oem_code: string;
  status: boolean;
  price: number;
  vehicle_id: string;
  id: string;
  rating: number;
  vehicle: Vehicle;
};

declare type SpareCategories = {
  title_uz: string;
  title_ru?: string;
  id: number | null | undefined;
};

declare type ArticleImage = {
  path: string;
  article_id: string;
  id: string;
};

declare type Blogs = {
  title_uz: string;
  title_ru: string;
  content_uz: string;
  content_ru: string;
  video_link: string;
  category: string;
  vehicle_id: string | null;
  images: ArticleImage[] | string[];
  cover_image: string | null;
  id: string;
  like_count: number | null;
  author_id: string;
  view_count: number;
};

declare type Collection = {
  id: number;
  title: string;
  icon: string;
};

declare type AuthState = {
  userData?: UserDataType | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  language?: string | null;
  isLogin?: boolean | null;
};

declare type UserDataType = {
  phone_number: string;
  role: string;
  username: string;
  name: string;
};

declare type InputState = {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
};

declare type PriceButton = {
  id: number;
  title: string;
  start: number;
  end: number;
};
