export interface ArtWork {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
}

export interface Manifest {
  name: string;
  short_name: string;
  start_url: string;
  display: string;
  background_color: string;
  theme_color: string;
  icons: ManifestIcon[];
}