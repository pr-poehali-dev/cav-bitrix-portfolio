import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Service } from './types';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onToggle: () => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

const ServiceCard = ({ service, isSelected, onToggle }: ServiceCardProps) => (
  <Card
    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
      isSelected ? 'border-primary border-2 bg-primary/5' : ''
    }`}
    onClick={onToggle}
  >
    <div className="flex items-start gap-4">
      <Checkbox
        checked={isSelected}
        onCheckedChange={onToggle}
        className="mt-1"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
        <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
        <p className="text-primary font-bold">от {formatPrice(service.price)} ₽</p>
      </div>
    </div>
  </Card>
);

export default ServiceCard;
