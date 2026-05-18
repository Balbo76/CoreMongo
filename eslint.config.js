import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    // Configurazione applicata a tutti i file JavaScript e TypeScript
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        // Specifica quali file monitorare
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            // Qui puoi personalizzare la severità delle regole
            '@typescript-eslint/no-explicit-any': 'warn',      // Ti avvisa se usi "any" esplicito
            '@typescript-eslint/no-unused-vars': ['warn', {    // Ti avvisa se dichiari variabili e non le usi
                'argsIgnorePattern': '^_|^req|^res|^next'        // Ignora req, res, next nei middleware Express
            }],
            'no-console': 'off'                                 // Permette i console.log nel backend
        },
    },
    {
        // Ignora le cartelle di build e i moduli
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            'frontend/build/**', // o la cartella di output del tuo frontend
        ],
    }
);