export interface CartItem {
    stock: number;
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  // Cart store implementation
  class CartStore {
    clear() {
      throw new Error("Method not implemented.");
    }
    private items: CartItem[] = [];
    private listeners = new Set<() => void>();
  
    constructor() {
      // Initialize with empty cart
      this.items = [];
      
      // Load cart from localStorage if available
      this.loadCart();
    }
  
    // Get all items in cart
    getItems(): CartItem[] {
      return [...this.items];
    }
  
    // Get total number of items in cart
    getItemCount(): number {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }
  
    // Add item to cart
    addItem(item: Omit<CartItem, "quantity"> & { quantity?: number }): void {
      const quantity = item.quantity || 1;
      const existingItemIndex = this.items.findIndex((i) => i.id === item.id);
  
      if (existingItemIndex >= 0) {
        // Update existing item
        this.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        this.items.push({
          ...item,
          quantity,
        });
      }
  
      this.saveCart();
      this.notifyListeners();
    }
  
    // Update item quantity
    updateQuantity(id: string, change: number): void {
      const itemIndex = this.items.findIndex((item) => item.id === id);
      if (itemIndex >= 0) {
        const newQuantity = this.items[itemIndex].quantity + change;
        if (newQuantity <= 0) {
          this.removeItem(id);
        } else {
          this.items[itemIndex].quantity = newQuantity;
          this.saveCart();
          this.notifyListeners();
        }
      }
    }
  
    // Remove item from cart
    removeItem(id: string): void {
      this.items = this.items.filter((item) => item.id !== id);
      this.saveCart();
      this.notifyListeners();
    }
  
    // Clear cart
    clearCart(): void {
      this.items = [];
      this.saveCart();
      this.notifyListeners();
    }
  
    // Subscribe to cart changes
    subscribe(listener: () => void): () => void {
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    }
  
    // Save cart to localStorage
    private saveCart(): void {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(this.items));
      }
    }
  
    // Load cart from localStorage
    private loadCart(): void {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            this.items = JSON.parse(savedCart);
          } catch (e) {
            console.error('Failed to parse cart from localStorage', e);
          }
        }
      }
    }
  
    // Notify all listeners of changes
    private notifyListeners(): void {
      this.listeners.forEach((listener) => listener());
    }
  }
  
  // Create and export a singleton instance
  export const cartStore = new CartStore();