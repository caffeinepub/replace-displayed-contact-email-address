import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';
import Cart from './Cart';

export default function CartButton() {
  const { getCartItemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = getCartItemCount();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {itemCount}
          </Badge>
        )}
      </Button>
      <Cart isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
