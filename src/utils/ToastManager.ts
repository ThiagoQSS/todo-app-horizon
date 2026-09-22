import Toast from 'react-native-toast-message';

const triggerToast = (
	type: 'success' | 'error' | 'info',
	text1: string,
	text2?: string,
) => {
	Toast.show({
		type,
		text1,
		text2,
		position: 'top',
		visibilityTime: 3000,
		autoHide: true,
	});
};

export const AppToast = {
	// --- SUCESSOS DE OPERAÇÕES ---
	taskCreated: (title?: string) => {
		triggerToast(
			'success',
			'Tarefa criada com sucesso!',
			title ? `"${title}" foi adicionada.` : undefined,
		);
	},

	taskUpdated: () => {
		triggerToast('success', 'Tarefa atualizada!');
	},

	taskDeleted: () => {
		triggerToast('info', 'Tarefa removida com sucesso.');
	},

	// --- ERROS DE REDE E PERSISTÊNCIA ---
	syncError: () => {
		triggerToast(
			'error',
			'Erro ao conectar com a API',
			'Exibindo dados armazenados localmente.',
		);
	},

	databaseError: () => {
		triggerToast(
			'error',
			'Falha no banco de dados',
			'Não foi possível salvar as alterações no dispositivo.',
		);
	},

	// --- AVISOS E VALIDAÇÕES ---
	validationError: (message: string) => {
		triggerToast('error', 'Atenção no formulário', message);
	},

	offlineWarning: () => {
		triggerToast(
			'info',
			'Você está offline',
			'As alterações serão salvas localmente.',
		);
	},
};
