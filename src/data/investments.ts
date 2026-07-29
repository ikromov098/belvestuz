// Investment package tiers — single source of truth shared by /investments and /apply.
// Rates/tiers must not be duplicated or hardcoded elsewhere; import from here.
export interface InvestmentPlan {
  id: string;
  name: string;
  minAmount: number;
  rate: number;
  capped?: boolean; // rate is a ceiling ("до N%"), not a flat guaranteed figure
  termMin: number;
  termMax: number;
  recommended: boolean;
  features: string[];
}

export const INVESTMENT_PLANS: InvestmentPlan[] = [
  {
    id: 'base',
    name: 'Базовый',
    minAmount: 5_000,
    rate: 12,
    termMin: 12,
    termMax: 12,
    recommended: false,
    features: [
      'Минимальная сумма от 5 000$',
      'Ежемесячное распределение прибыли',
      'Досрочный вывод через 2 месяца',
      'Онлайн-управление через личный кабинет',
    ],
  },
  {
    id: 'standard',
    name: 'Стандарт',
    minAmount: 10_000,
    rate: 15,
    termMin: 12,
    termMax: 24,
    recommended: true,
    features: [
      'Минимальная сумма от 10 000$',
      'Ежеквартальная или ежемесячная выплата',
      'Прогнозируемая прибыль: от 15%',
      'Персональный менеджер',
      'Досрочный вывод через 2 месяца',
    ],
  },
  {
    id: 'premium',
    name: 'Премиум',
    minAmount: 50_000,
    rate: 20,
    capped: true,
    termMin: 24,
    termMax: 36,
    recommended: false,
    features: [
      'Минимальная сумма от 50 000$',
      'Прогнозируемая прибыль: до 20%',
      'Гибкий выбор периодичности выплат',
      'Приоритетное обслуживание',
      'Эксклюзивные условия для VIP-клиентов',
      'Налоговое сопровождение',
    ],
  },
];
