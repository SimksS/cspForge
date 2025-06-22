'use client';


import * as Select from '@/components/ui/select';
import clsx from 'clsx';
import { useTransition } from 'react';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';

type Props = {
    defaultValue: string;
    items: Array<{ value: string; label: string }>;
    label: string;
};

export default function LocaleSwitcherSelect({
    defaultValue,
    items,
    label
}: Props) {
    const [isPending, startTransition] = useTransition();

    function onChange(value: string) {
        const locale = value as Locale;
        startTransition(() => {
            setUserLocale(locale);
        });
    }

    return (
        <div className="relative">
            <Select.Select defaultValue={defaultValue} onValueChange={onChange}>
                <Select.SelectTrigger
                    aria-label={label}
                    className={clsx(
                        'rounded-sm p-2 transition-colors hover:bg-slate-200',
                        isPending && 'pointer-events-none opacity-60'
                    )}
                >
                    <Select.SelectValue placeholder={label} />
                </Select.SelectTrigger>
                <Select.SelectContent>
                    {
                        items.map((item) => (
                            <Select.SelectItem
                                key={item.value}
                                value={item.value}
                                className="cursor-pointer"
                            >
                                {item.label}
                            </Select.SelectItem>
                        ))
                    }
                </Select.SelectContent>
            </Select.Select>
        </div>
    );
}
