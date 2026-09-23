import { describe, it, expect } from '@jest/globals';
import { validateTaskTitle } from '../taskValidation';

describe('validateTaskTitle', () => {
	it('deve invalidar quando o campo estiver vazio', () => {
		const result = validateTaskTitle('');
		expect(result.isValid).toBe(false);
		expect(result.errorMessage).toBe('Título é obrigatório');
	});

	it('deve invalidar quando contiver apenas espaços em branco', () => {
		const result = validateTaskTitle('   ');
		expect(result.isValid).toBe(false);
		expect(result.errorMessage).toBe('Título é obrigatório');
	});

	it('deve invalidar quando o texto tiver menos de 3 caracteres', () => {
		const result = validateTaskTitle('ab');
		expect(result.isValid).toBe(false);
		expect(result.errorMessage).toBe('Título deve ter entre 3 e 100 caracteres');
	});

	it('deve invalidar quando o texto tiver mais de 100 caracteres', () => {
		const longTitle = 'a'.repeat(101);
		const result = validateTaskTitle(longTitle);
		expect(result.isValid).toBe(false);
		expect(result.errorMessage).toBe('Título deve ter entre 3 e 100 caracteres');
	});

	it('deve validar com sucesso quando o título for válido', () => {
		const result = validateTaskTitle('Comprar café');
		expect(result.isValid).toBe(true);
		expect(result.errorMessage).toBe('');
	});
});
