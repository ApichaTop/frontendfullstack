import { Button } from '@/components/ui/button'
import type React from 'react';

type props = {
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    children: React.ReactNode;
    onClick?: () => void;
    }
const Globalbutton = ({className, variant, size, children, onClick}:props) => {
  return (
    <Button className={className} variant={variant} size={size} onClick={onClick}>{children}</Button>
  )
}

export default Globalbutton