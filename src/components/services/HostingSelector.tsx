import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { HostingOption, BegetTariff, VPSTariff } from './types';
import HostingComparison from './HostingComparison';

interface HostingSelectorProps {
  selectedHosting: string;
  selectedBegetTariff: string;
  selectedVPSTariff: string;
  hostingOptions: HostingOption[];
  begetTariffs: BegetTariff[];
  vpsTariffs: VPSTariff[];
  onHostingChange: (hostingId: string) => void;
  onBegetTariffChange: (tariffId: string) => void;
  onVPSTariffChange: (tariffId: string) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

const HostingSelector = ({
  selectedHosting,
  selectedBegetTariff,
  selectedVPSTariff,
  hostingOptions,
  begetTariffs,
  vpsTariffs,
  onHostingChange,
  onBegetTariffChange,
  onVPSTariffChange
}: HostingSelectorProps) => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Хостинг</h3>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {hostingOptions.map(option => (
          <Card
            key={option.id}
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedHosting === option.id ? 'border-primary border-2 bg-primary/5' : ''
            }`}
            onClick={() => onHostingChange(option.id)}
          >
            <div className="flex items-center gap-3 mb-3">
              <Checkbox checked={selectedHosting === option.id} />
              <div>
                <h4 className="font-semibold text-lg">{option.title}</h4>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
            <p className="text-primary font-bold text-xl">
              {option.price === 0 ? 'Бесплатно' : `${formatPrice(option.price)} ₽/год`}
            </p>
          </Card>
        ))}
      </div>

      {selectedHosting === 'vps' && (
        <div className="animate-in slide-in-from-top-4 duration-300">
          <h4 className="text-xl font-bold mb-4">Выберите конфигурацию VPS</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vpsTariffs.map(tariff => (
              <Card
                key={tariff.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedVPSTariff === tariff.id ? 'border-primary border-2 bg-primary/5' : ''
                }`}
                onClick={() => onVPSTariffChange(tariff.id)}
              >
                <div className="mb-4">
                  <Checkbox checked={selectedVPSTariff === tariff.id} className="mb-3" />
                  <h5 className="font-bold text-lg mb-1">{tariff.name}</h5>
                  <div className="mb-2">
                    <p className="text-primary font-bold text-xl">{formatPrice(tariff.priceMonthly)} ₽/мес</p>
                    <p className="text-sm text-muted-foreground">{formatPrice(tariff.priceYearly)} ₽/год</p>
                  </div>
                  <div className="space-y-1 text-sm mb-3">
                    <p><strong>CPU:</strong> {tariff.cpu}</p>
                    <p><strong>RAM:</strong> {tariff.ram}</p>
                    <p><strong>Диск:</strong> {tariff.disk}</p>
                    <p><strong>Трафик:</strong> {tariff.traffic}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {tariff.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      )}

      {selectedHosting === 'beget' && (
        <div className="animate-in slide-in-from-top-4 duration-300">
          <h4 className="text-xl font-bold mb-4">Выберите тариф Beget</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {begetTariffs.map(tariff => (
              <Card
                key={tariff.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedBegetTariff === tariff.id ? 'border-primary border-2 bg-primary/5' : ''
                }`}
                onClick={() => onBegetTariffChange(tariff.id)}
              >
                <div className="mb-4">
                  <Checkbox checked={selectedBegetTariff === tariff.id} className="mb-3" />
                  <h5 className="font-bold text-lg mb-1">{tariff.name}</h5>
                  <p className="text-primary font-bold text-xl mb-1">{formatPrice(tariff.price)} ₽/{tariff.period}</p>
                  <p className="text-sm text-muted-foreground">{formatPrice(tariff.price * 12)} ₽/год</p>
                </div>
                <ul className="space-y-2">
                  {tariff.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      )}

      <HostingComparison />
    </div>
  );
};

export default HostingSelector;