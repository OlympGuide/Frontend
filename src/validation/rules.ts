import { defineRule } from 'vee-validate';

export const defineRules = () => {
  defineRule('required', (value: string): string | boolean => {
    return value.length > 0 || 'Das Feld darf nicht leer sein';
  });

  defineRule('requiredDropdown', (value: object): string | boolean => {
    return !!value || 'Bitte wählen Sie eine Option aus';
  });

  defineRule('coordinatePair', (value: string): string | boolean => {
    const coordinateRegex: RegExp = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
    return (
      coordinateRegex.test(value) ||
      'Bitte verwenden Sie das Format: Breitengrad, Längengrad'
    );
  });

  defineRule('email', (value: string): string | boolean => {
    const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    return emailRegex.test(value) || 'Bitte verwenden Sie eine gültige Email.';
  });

  defineRule('password', (value: string): string | boolean => {
    return value.length >= 8 || 'Das Passwort muss mindestens 8 Zeichen haben.';
  });
};
