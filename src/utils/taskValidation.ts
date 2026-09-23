export interface TaskTitleValidationResult {
	isValid: boolean;
	errorMessage: string;
}

/**
 * Validação pura do título da tarefa:
 * - Obrigatório (não vazio e não composto apenas por espaços em branco)
 * - Mínimo de 3 caracteres
 * - Máximo de 100 caracteres
 */
export function validateTaskTitle(title: string): TaskTitleValidationResult {
	const trimmed = (title ?? '').trim();

	if (trimmed.length === 0) {
		return {
			isValid: false,
			errorMessage: 'Título é obrigatório',
		};
	}

	if (trimmed.length < 3 || trimmed.length > 100) {
		return {
			isValid: false,
			errorMessage: 'Título deve ter entre 3 e 100 caracteres',
		};
	}

	return {
		isValid: true,
		errorMessage: '',
	};
}
