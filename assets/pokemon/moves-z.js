let MoveList;
if(!MoveList) MoveList = []; 
module.exports.MoveList = MoveList;

Array.prototype.push.apply(MoveList, [
	{
		"name": "絕对捕食迴旋斬", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Bug",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "effect|l|block"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "黑洞吞噬萬物滅", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Dark",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "frame|flinch|畏缩|number|d3"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "究极巨龍震天地", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Dragon",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "effect|l|sound"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "終极伏特狂雷闪", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Electric",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "frame|paralysis|麻痺|always"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "可愛星星飛天撞", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Fairy",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "frame|love|著迷|always"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "全力无双激烈拳", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Fight",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "text|l|移除樹果"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "超强极限爆焰彈", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Fire",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "frame|burn1|灼傷1|always"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "极速俯衝轟烈撞", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Flying",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "frame|target|特质|down|1"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "无盡暗夜之誘惑", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Ghost",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "text|l|无視特性"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "絢烂繽紛花怒放", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Grass",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "frame|heal|治療|c_heal|1"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "地隆嘯天大終结", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Ground",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "frame|target|特质|down|1"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "激狂大地萬里冰", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Ice",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "frame|frozen|冰凍|number|d3"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "究极无敵大衝撞", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Normal",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "强酸劇毒滅絕雨", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Poison",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "frame|poison|中毒|number|d3"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "至高精神破壞波", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Psychic",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "text|l|精神場地|Psychic"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "毀天滅地巨岩墜", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Rock",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "text|l|移除場地"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "超絕螺旋連擊", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Steel",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1", "text|l|无視特性"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	},
	{
		"name": "超级水流大漩渦", "alias": "",
		"power": "幸福度 + 忠誠度",
		"category": "all",
		"type": "Water",
		"tags": ["target|l|hybrid", "frame|self|傷害|plus|d1", "frame|self|特质|up|1"],
		"accuracy": "与原招式相同。",
		"damage": "力量/特殊 + 原招式傷害 + 幸福度 + 忠誠度",
	}
]);