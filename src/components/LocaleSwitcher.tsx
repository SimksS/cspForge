import LocaleSwitcherSelect from '@/components/LocalSwitcherSelect';
import {useLocale, useTranslations} from 'next-intl';


export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: t('en')
        },
        {
          value: 'pt',
          label: t('pt')
        }
      ]}
      label={t('label')}
    />
  );
}