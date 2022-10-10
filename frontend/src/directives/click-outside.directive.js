export default {
	bind: function (table, _, vnode) {
		table.clickOutsideEvent = function (event) {
			const isTable = table === event.target;
			const isTableChild = table.querySelector(`.${event.target._prevClass}`) !== null;
			if (!(isTable || isTableChild)) {
				vnode.context.onClickOutside();
			}
		};
		document.body.addEventListener('click', table.clickOutsideEvent);
	},
	unbind: function (table) {
		document.body.removeEventListener('click', table.clickOutsideEvent);
	},
};
