(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var vm = new Vue({
		el: "#App",
		data: {
			list: [
				{ text: "吃饭", status: true },
				{ text: "睡觉", status: false },
				{ text: "打豆豆", status: false }
			],
			newText: "",
			isEdit: '',
			keyWord: 'all',
			listLeft: 0
		},
		methods: {
			addList() {
				event.preventDefault();
				this.list.push({
					text: this.newText,
					status: false
				});
				this.newText = '';
			},
			delList(i) {
				this.list.splice(i, 1);
			},
			editList(i) {
				// console.log(i);
				this.isEdit = i
			},
			updateList() {
				event.preventDefault();
				this.isEdit = '';
			},
			isShow(v) {
				switch (this.keyWord) {
					case 'active':
						this.listLeft = this.list.filter(v => !v.status).length
						return !v.status
						break;
					case 'completed':
						this.listLeft = this.list.filter(v => v.status).length
						return v.status
						break;
					default:
						this.listLeft = this.list.length;
						return true;
						break;
				}
				return v.status
			},
			clearAllCom() {
				this.list = this.list.filter(v => !v.status)
			}
		},
		computed: {
			toggleAll: {
				get() {
					// console.log(this.list.filter(v => !v.status).length);
					return this.list.filter(v => !v.status).length ? false : true;
				},
				set(val) {
					// console.log(val);
					this.list.forEach(value => {
						value.status = val;
					});
				}
			}
		},
		updated() {
			var str = JSON.stringify(this.list);
			localStorage.setItem('todoList', str);
		},
		created() {
			var temList = JSON.parse(localStorage.getItem('todoList'));
			console.log(temList);
			this.list = temList ? temList : this.list
		}
	})
})(window);
