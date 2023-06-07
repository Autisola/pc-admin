import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import type { Device } from '@/global/device'
import {
	getAllDeviceInfo,
	addDevice,
	editDevice,
	delDevice
} from '@/api/modules/device'

export const useDeviceStore = defineStore(
	'device',
	() => {
		// 设备总数
		const total = ref(0)
		// 设备列表
		const deviceList = ref()
		// 获取设备数据
		async function getAllDeviceInfoAction(
			params: Device.ReqAllDevice,
			currentPage: number = 1,
			pageSize: number = 10
		) {
			const { result } = await getAllDeviceInfo(params, currentPage, pageSize)
			total.value = result.total
			deviceList.value = result.deviceList
		}
		// 添加设备
		async function addDeviceAction(params: Device.ReqAddDevice) {
			const { code } = await addDevice(params)
			return code
		}
		// 编辑设备
		async function editDeviceAction(params: Device.ReqEditDevice) {
			const { code } = await editDevice(params)
			return code
		}
		// 删除设备
		async function delDeviceAction(params: any) {
			const { code } = await delDevice(params)
			return code
		}
		return {
			total,
			deviceList,
			getAllDeviceInfoAction,
			addDeviceAction,
			editDeviceAction,
			delDeviceAction
		}
	},
	{
		persist: piniaPersistConfig('device', [])
	}
)
