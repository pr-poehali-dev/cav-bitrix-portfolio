import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { BitrixLicense } from './types';

interface TechnologySelectorProps {
  selectedTechnology: string;
  selectedBitrixLicense: string;
  bitrixLicenses: BitrixLicense[];
  onTechnologyChange: (tech: string) => void;
  onBitrixLicenseChange: (licenseId: string) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

const TechnologySelector = ({
  selectedTechnology,
  selectedBitrixLicense,
  bitrixLicenses,
  onTechnologyChange,
  onBitrixLicenseChange
}: TechnologySelectorProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6">На чем собираем сайт</h3>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card
          className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
            selectedTechnology === 'bitrix' ? 'border-primary border-2 bg-primary/5' : ''
          }`}
          onClick={() => onTechnologyChange('bitrix')}
        >
          <div className="flex items-center gap-3">
            <Checkbox checked={selectedTechnology === 'bitrix'} />
            <div>
              <h4 className="font-semibold text-lg">CMS 1С-Битрикс</h4>
              <p className="text-sm text-muted-foreground">Управление Сайтом</p>
            </div>
          </div>
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
            selectedTechnology === 'react' ? 'border-primary border-2 bg-primary/5' : ''
          }`}
          onClick={() => onTechnologyChange('react')}
        >
          <div className="flex items-center gap-3">
            <Checkbox checked={selectedTechnology === 'react'} />
            <div>
              <h4 className="font-semibold text-lg">React</h4>
              <p className="text-sm text-muted-foreground">Современный фреймворк</p>
            </div>
          </div>
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
            selectedTechnology === 'html' ? 'border-primary border-2 bg-primary/5' : ''
          }`}
          onClick={() => onTechnologyChange('html')}
        >
          <div className="flex items-center gap-3">
            <Checkbox checked={selectedTechnology === 'html'} />
            <div>
              <h4 className="font-semibold text-lg">HTML-статика</h4>
              <p className="text-sm text-muted-foreground">Простое решение</p>
            </div>
          </div>
        </Card>
      </div>

      {selectedTechnology === 'bitrix' && (
        <div className="animate-in slide-in-from-top-4 duration-300">
          <h4 className="text-xl font-bold mb-4">Выберите лицензию 1С-Битрикс</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bitrixLicenses.map(license => (
              <Card
                key={license.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedBitrixLicense === license.id ? 'border-primary border-2 bg-primary/5' : ''
                }`}
                onClick={() => onBitrixLicenseChange(license.id)}
              >
                <div className="mb-4">
                  <Checkbox checked={selectedBitrixLicense === license.id} className="mb-3" />
                  <h5 className="font-bold text-lg mb-1">{license.title}</h5>
                  <p className="text-sm text-muted-foreground mb-3">{license.description}</p>
                  <p className="text-primary font-bold text-xl">{formatPrice(license.price)} ₽</p>
                </div>
                <ul className="space-y-2">
                  {license.features.map((feature, idx) => (
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
    </div>
  );
};

export default TechnologySelector;
