module.exports = {
	transform: {
		'^.+\\.[jt]sx?$': [
			'babel-jest',
			{
				presets: ['babel-preset-expo'],
			},
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};