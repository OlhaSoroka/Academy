export default {
	bind: function (table, _, vnode) {
		table.clickOutsideEvent = function (event) {
			if (!(table === event.target || table.contains(event.target))) {
				vnode.context.onClickOutside();
			}
		};
		document.body.addEventListener('click', table.clickOutsideEvent);
	},
	unbind: function (table) {
		document.body.removeEventListener('click', table.clickOutsideEvent);
	},
};
