declare type Image = {
  id: string;
  path: string;
  created_at: string;
};

declare type Brand = {
  name: string;
  image: string;
  brand_type: "vehicle" | "spare_part";
  id?: number;
};

declare type CategoryParam = {
  id: number;
  name: string;
};

declare type ConfigurationItem = {
  ckey_uz: string;
  ckey_ru: string;
  cvalue_uz: string;
  cvalue_ru: string;
  category: string;
};

declare type CarObject = {
  id?: string;
  model_file: string;
  name_uz: string;
  name_ru: string;
  brand_id: number;
  model: string;
  year: number;
  most_sold: number;
  transmission: string;
  vehicle_type: string;
  price: number;
  engine_type: string;
  drive_type: string;
  cover_image?: string;
  images?: string[];
  rating?: number;
  currency: string;
  brand?: Brand;
  configurations?: ConfigurationItem[];
  view_count: number;
  created_at: string;
  description_uz: string;
  description_ru?: string;
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
  created_at: string;
  vname_uz: string | null;
  vname_ru: string | null;
  author_name: string;
};

declare type Collection = {
  id: number;
  title: string;
  icon: CarIconType;
  value?: string;
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
  avatar?: string;
  role: string;
  first_name: string;
  last_name: string;
  likes?: string[];
  dislikes?: string[];
  address?: string;
  avatar?: string;
  city?: string;
  id?: string;
  info?: string;
  region?: string;
  work_phone?: string;
  working_hours?: string;
  workplace_name?: string;
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

declare type VideosType = {
  video: string;
  title: string;
  desc: string;
  created_at: string;
};

declare type MenuParametrs = {
  id: number;
  name: string;
  children: string[];
};

declare type Comments = {
  target_id: string;
  target_type: "article" | "vehicle" | "spare-parts";
  comment: string;
  images?: string[];
  rating: number;
  created_at: string;
};

declare type Articles = {
  name: string;
  value: string;
};

declare type TestDrive = {
  id?: string;
  volunteer_phone: string;
  volunteer_name: string;
  test_date: string;
  status: string;
  vehicle_id: string;
};

declare type AuthSendOtp = {
  phone_number: string;
};

declare type AuthVerifyOtp = {
  phone_number: string;
  otp: string;
};

declare type AuthRegister = {
  user_data: {
    first_name: string;
    last_name?: string;
    avatar?: string;
    phone_number: string;
    role: string;
  };
  staff_data?: {
    workplace_name?: string;
    region?: string;
    city?: string;
    address?: string;
    avatar?: string;
    working_hours?: string;
    info?: string;
    work_phone: string;
    stype?: string;
  };
};

declare type DealerUserType = {
  user: {
    avatar: string;
    first_name: string;
    id: string;
    last_name: string;
    phone_number: string;
    role: string;
    status: string;
  };
};

declare type DealersType = {
  workplace_name: string;
  region: string;
  city: string;
  address: string;
  work_phone: string;
  info: string;
  working_hours: string;
  avatar: string;
  id: string;
  rating: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  reviews: null;
  is_verified: null;
};

declare type UpdateAuth = {
  first_name?: string;
  last_name?: string;
  avatar?: string;
  staff_data?: Partial<{
    workplace_name: string;
    region: string;
    city: string;
    address: string;
    avatar: string;
    working_hours: string;
    info: string;
    work_phone: string;
    stype: string;
  }>;
};

declare type CommentsDataType = {
  target_id: string;
  target_type: "vehicle" | "spare_part" | "article";
  rating: number;
  comment: string;
  id: string;
  images: null;
  user_id: string;
  created_at: string;
};

declare type Counts = {
  vehicle: number;
  article: number;
  spare_part: number;
  user: number;
  test_drive: number;
  reviews: number;
};

declare type CarType =
  | "electricity"
  | "sedan"
  | "suv"
  | "mpv"
  | "sport-car"
  | "micro-van"
  | "van"
  | "light-passenger";

declare type CarIconType = {
  white: string;
  hover: string;
};

declare type AdsType = {
  id?: number;
  title: string;
  url: string;
  page: string;
  image_url: string;
};
