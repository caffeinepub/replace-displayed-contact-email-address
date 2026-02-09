import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Document, ContactSubmission, Product, ProductCategory } from '../backend';
import { getStaticProductByName } from '../catalog/staticProducts';

export function useGetAllDocuments() {
  const { actor, isFetching } = useActor();

  return useQuery<Document[]>({
    queryKey: ['documents'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDocuments();
    },
    enabled: !!actor && !isFetching
  });
}

export function useGetDocument(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Document>({
    queryKey: ['document', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getDocument(id);
    },
    enabled: !!actor && !isFetching && !!id
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitContactForm(data.name, data.email, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    }
  });
}

export function useGetAllContactSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactSubmission[]>({
    queryKey: ['contactSubmissions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactSubmissions();
    },
    enabled: !!actor && !isFetching
  });
}

export function useGetAllAvailableProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'available'],
    queryFn: async () => {
      if (!actor) return [];
      const products = await actor.getAllAvailableProducts();
      
      // Enrich products with static catalog data
      return products.map(product => {
        const staticProduct = getStaticProductByName(product.name);
        if (staticProduct) {
          return {
            ...product,
            description: product.description || staticProduct.description,
            imageUrl: product.imageUrl || staticProduct.imageUrl
          };
        }
        return product;
      });
    },
    enabled: !!actor && !isFetching
  });
}

export function useGetProductsByCategory(category: ProductCategory) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching
  });
}

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching
  });
}
