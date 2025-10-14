import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
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
  hostingPeriod: 6 | 12;
  onHostingChange: (hostingId: string) => void;
  onBegetTariffChange: (tariffId: string) => void;
  onVPSTariffChange: (tariffId: string) => void;
  onPeriodChange: (period: 6 | 12) => void;
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
  hostingPeriod,
  onHostingChange,
  onBegetTariffChange,
  onVPSTariffChange,
  onPeriodChange
}: HostingSelectorProps) => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Хостинг</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {hostingOptions.map(option => (
          <Card
            key={option.id}
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedHosting === option.id ? 'border-primary border-2 bg-primary/5' : ''
            } ${option.id === 'poehali' ? 'relative overflow-hidden' : ''}`}
            onClick={() => onHostingChange(option.id)}
          >
            {option.id === 'poehali' && (
              <div className="absolute top-2 right-2">
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  ⭐ Рекомендуем
                </span>
              </div>
            )}
            <div className="flex items-center gap-3 mb-3">
              <Checkbox checked={selectedHosting === option.id} />
              <div>
                <h4 className="font-semibold text-lg">{option.title}</h4>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
            {option.id === 'own' && (
              <p className="text-muted-foreground text-sm mt-2">Без дополнительных затрат</p>
            )}
            {option.id === 'poehali' && (
              <div className="mt-3">
                <p className="text-primary font-bold text-xl mb-3">Бесплатно</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Icon name="Check" size={14} />
                    <span>Публикация за 1 клик</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Icon name="Check" size={14} />
                    <span>Автоматические SSL</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Icon name="Check" size={14} />
                    <span>Бесплатный поддомен</span>
                  </div>
                </div>
                <div className="border-t pt-3 space-y-2">
                  <h5 className="font-semibold text-sm mb-2">Дополнительные услуги:</h5>
                  <div className="flex items-start gap-2 text-sm">
                    <Icon name="Crown" size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>Свой домен — <strong>1 000 ₽/год</strong></span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Icon name="Zap" size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>Увеличенные лимиты — <strong>от 500 ₽/мес</strong></span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Icon name="Shield" size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>Приоритетная поддержка — <strong>от 1 000 ₽/мес</strong></span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {(selectedHosting === 'vps' || selectedHosting === 'beget') && (
        <div className="animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold">
              {selectedHosting === 'vps' ? 'Выберите конфигурацию VPS' : 'Выберите тариф Beget'}
            </h4>
            <div className="flex gap-2">
              <Button
                variant={hostingPeriod === 6 ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPeriodChange(6)}
              >
                6 месяцев
              </Button>
              <Button
                variant={hostingPeriod === 12 ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPeriodChange(12)}
              >
                12 месяцев
              </Button>
            </div>
          </div>
          
          {selectedHosting === 'vps' && (
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
                    <p className="text-primary font-bold text-xl">
                      {formatPrice(hostingPeriod === 6 ? tariff.priceMonthly * 6 : tariff.priceYearly)} ₽
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(tariff.priceMonthly)} ₽/мес × {hostingPeriod} мес
                    </p>
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
          )}

          {selectedHosting === 'beget' && (
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
                  <p className="text-primary font-bold text-xl mb-1">
                    {formatPrice(hostingPeriod === 6 ? tariff.price * 6 : tariff.price * 12)} ₽
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(tariff.price)} ₽/мес × {hostingPeriod} мес
                  </p>
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
          )}
        </div>
      )}

      <HostingComparison />
    </div>
  );
};

export default HostingSelector;