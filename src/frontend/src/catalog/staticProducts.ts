import { ProductCategory } from '../backend';

export interface StaticProduct {
  name: string;
  category: ProductCategory;
  description: string;
  isAvailable: boolean;
  price?: number;
  imageUrl: string;
}

export const staticProducts: StaticProduct[] = [
  {
    name: 'HP Laptop 15',
    category: ProductCategory.Computers,
    description: 'Powerful and reliable HP Laptop 15 with modern specifications perfect for work, study, and entertainment. Features a sleek design with excellent performance for everyday computing tasks.',
    isAvailable: true,
    imageUrl: '/assets/generated/hp-laptop-15.dim_800x600.jpg'
  },
  {
    name: 'Dell Inspiron Desktop',
    category: ProductCategory.Computers,
    description: 'High-performance Dell Inspiron Desktop computer ideal for home and office use. Equipped with powerful processing capabilities and ample storage for all your computing needs.',
    isAvailable: true,
    imageUrl: '/assets/generated/dell-inspiron-desktop.dim_800x600.jpg'
  },
  {
    name: 'Canon Laser Printer',
    category: ProductCategory.Accessories,
    description: 'Professional Canon Laser Printer delivering crisp, high-quality prints for your business or home office. Fast printing speeds and reliable performance for all your document needs.',
    isAvailable: true,
    imageUrl: '/assets/generated/canon-laser-printer.dim_800x600.jpg'
  },
  {
    name: 'TP-Link WiFi Router',
    category: ProductCategory.Networking,
    description: 'Advanced TP-Link WiFi Router providing fast and stable internet connectivity throughout your home or office. Features modern wireless technology for seamless streaming and browsing.',
    isAvailable: true,
    imageUrl: '/assets/generated/tp-link-wifi-router.dim_800x600.jpg'
  }
];

export function getStaticProductByName(name: string): StaticProduct | undefined {
  return staticProducts.find(p => p.name === name);
}
