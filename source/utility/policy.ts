export const PolicyResistance = {
	Characters: 1,
	Numbers: 2,
	Special: 4,
	NoRepeat: 8,
	DifferentCase: 16
} as { [ key: string ]: number };

export interface PolicyParams{
	token?: string,
	name?: string,
	min?: number,
	max?: number,
	resistance?: number,
	cooldown?: number,
	notify?: number,
	attempts?: number,
	block?: number,
	system?: number
};
