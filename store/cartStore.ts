import { create } from 'zustand';

export interface CartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
  variations?: { [key: string]: string }; // Selected variations
  variationLabel?: string; // Display label for variations
}

interface CartStore {
  items: CartItem[];
  isHydrated: boolean;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  hydrate: () => void;
}

const loadCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('wick-lather-cart');
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    // Clear invalid data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wick-lather-cart');
    }
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('wick-lather-cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
};

export const useCartStore = create<CartStore>()((set, get) => ({
      items: [],
      isHydrated: false,
      addItem: (item) => {
        const items = get().items;
        // Check if item exists with same product AND same variations
        const variationKey = item.variationLabel || '';
        const existingItem = items.find(
          (i) =>
            i.product === item.product &&
            (i.variationLabel || '') === variationKey
        );

        let newItems: CartItem[];
        if (existingItem) {
          // Same product with same variations - increase quantity
          const newQuantity = (existingItem.quantity || 0) + (item.quantity || 1);
          if (newQuantity <= item.stock) {
            newItems = items.map((i) =>
              i.product === item.product && (i.variationLabel || '') === variationKey
                ? { ...i, quantity: newQuantity }
                : i
            );
          } else {
            return;
          }
        } else {
          // New item or different variations - add as new item
          newItems = [...items, { ...item, quantity: item.quantity || 1 }];
        }
        set({ items: newItems });
        saveCart(newItems);
      },
      removeItem: (productId) => {
        const newItems = get().items.filter((item) => item.product !== productId);
        set({ items: newItems });
        saveCart(newItems);
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        const item = get().items.find((i) => i.product === productId);
        if (item && quantity <= item.stock) {
          const newItems = get().items.map((i) =>
            i.product === productId ? { ...i, quantity } : i
          );
          set({ items: newItems });
          saveCart(newItems);
        }
      },
      clearCart: () => {
        set({ items: [] });
        saveCart([]);
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      hydrate: () => {
        if (get().isHydrated) return;
        const items = loadCart();
        set({ items, isHydrated: true });
      },
    })
);
