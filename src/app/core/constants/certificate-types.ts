import { SelectOption } from "../../shared/types/certificates/certificates";

export const TYPES_FOR_EDUCATION: SelectOption[] = [
  { value: 'ForPlaceWhereNeeded', viewValue: 'Для предъявления по месту требования' },
  { value: 'PensionForKazakhstan', viewValue: 'Для пенсионных выплат гражданам Казахстана' }
];

export const TYPES_FOR_WORK: SelectOption[] = [
  { value: 'ForPlaceOfWork', viewValue: 'Справка с места работы' },
  { value: 'ForExperience', viewValue: 'Справка о стаже' },
  { value: 'ForVisa', viewValue: 'Справка на оформление визы' },
  { value: 'ForWorkBookCopy', viewValue: 'Копия трудовой книжки' }
];

export const CERTIFICATE_KINDS: SelectOption[] = [
  { value: 'Electronic', viewValue: 'Электронная' },
  { value: 'Paper', viewValue: 'Бумажная' }
];