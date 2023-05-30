import type { User } from '@/api/interface'

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @returns {String}
 */
export function localGet(key: string) {
	const value = window.localStorage.getItem(key)
	try {
		return JSON.parse(window.localStorage.getItem(key) as string)
	} catch (error) {
		return value
	}
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {*} value Storage值
 * @returns {void}
 */
export function localSet(key: string, value: any) {
	window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @returns {void}
 */
export function localRemove(key: string) {
	window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @returns {void}
 */
export function localClear() {
	window.localStorage.clear()
}

/**
 * @description 判断数据类型
 * @param {*} val 需要判断类型的数据
 * @returns {String}
 */
export function isType(val: any) {
	if (val === null) return 'null'
	if (typeof val !== 'object') return typeof val
	else
		return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

/**
 * @description 生成唯一 uuid
 * @returns {String}
 */
export function generateUUID() {
	let uuid = ''
	for (let i = 0; i < 32; i++) {
		const random = (Math.random() * 16) | 0
		if (i === 8 || i === 12 || i === 16 || i === 20) uuid += '-'
		uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16)
	}
	return uuid
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns {Number}
 */
export function randomNum(min: number, max: number): number {
	const num = Math.floor(Math.random() * (min - max) + max)
	return num
}

/**
 * @description 获取当前时间对应的提示语
 * @returns {String}
 */
export function getTimeState() {
	const timeNow = new Date()
	const hours = timeNow.getHours()
	if (hours >= 6 && hours <= 10) return `早上好 ⛅`
	if (hours >= 10 && hours <= 14) return `中午好 🌞`
	if (hours >= 14 && hours <= 18) return `下午好 🌞`
	if (hours >= 18 && hours <= 24) return `晚上好 🌛`
	if (hours >= 0 && hours <= 6) return `凌晨好 🌛`
}

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(
	menuList: User.ResUserMenu[]
): User.ResUserMenu[] {
	const flattenMenuList: User.ResUserMenu[] = []
	const newMenuList: User.ResUserMenu[] = JSON.parse(JSON.stringify(menuList))
	newMenuList.forEach(item => {
		const { children, path, ...rest } = item
		// 如果当前菜单有子菜单，则递归调用
		if (children && children.length > 0) {
			const childrenList = getFlatMenuList(children)
			flattenMenuList.push(...childrenList)
		}
		flattenMenuList.push({ path, ...rest })
	})
	return flattenMenuList
}
