import Axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_HOST } from '../utils/Constants'

// en caso de estar en windows(Network Error), descomentar esta linea y poner direccion ip propia en vez de 192.168.1.148
// const backEndURL = 'http://192.168.1.148:8001/api'
const backEndURL = 'https://backend.nudoseline.com/api'
// const backEndURL = API_HOST


const cleanCookie = (
	cookieString: string
): { name: string, cookie: string, expiration: string } => {
	const cookieStart = cookieString.indexOf('=') + 1
	const cookieEnd = cookieString.indexOf(';')

	const name = cookieString.slice(0, cookieString.indexOf('='))
	const cookie = cookieString.slice(cookieStart, cookieEnd)
	// Expiration date comes right after cookie so we search for index
	// of the initial and final characters after their first ocurrance
	const expiration = cookieString.slice(
		cookieString.indexOf('=', cookieStart + 1) + 1,
		cookieString.indexOf(';', cookieEnd + 1)
	)
	return { name, cookie, expiration }
}


function* divideCookiesString(setCookieString: string): Generator<string> {
	const nukedStrings = setCookieString.split(', ')
	let cookieString: string = ''
	for (const [i, item] of nukedStrings.entries()) {
		if (i % 2 === 0) {
			cookieString = item
		} else {
			yield cookieString.concat(', ', item)
		}
	}
}


const storeCookies = async (response: AxiosResponse): Promise<void> => {
	if (!response.headers['set-cookie']) { return }
	const cookieStrings = divideCookiesString(response.headers['set-cookie'][0])
	for (let cookieString of cookieStrings) {
		let cookieInfo = cleanCookie(cookieString)
		if (cookieInfo.cookie === "\"\"") {
			await AsyncStorage.removeItem(cookieInfo.name)
			continue
		}
		await AsyncStorage.setItem(cookieInfo.name, JSON.stringify(cookieInfo))
	}
}

const setCSRFToken = async (
	apiService: AxiosInstance,
	request: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
	if (!['post', 'put', 'patch', 'delete'].includes(request.method || 'put')) {
		return request
	}
	let token = await AsyncStorage.getItem('csrftoken')
	if (token === null) { await apiService.get('/csrf') }
	token = await AsyncStorage.getItem('csrftoken')
	if (token == null) { return request }
	// await apiService.get('/csrf')
	// const token = await AsyncStorage.getItem('csrftoken')
	Object.assign(
		request.headers,
		{ 'X-CSRFToken': JSON.parse(token).cookie }
	)
	return request
}

const setCookies = async (
	request: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
	let cookieString: string = ''
	const storedCSRF = await AsyncStorage.getItem('csrftoken')
	const storedSessionId = await AsyncStorage.getItem('sessionid')
	if (storedCSRF === null && storedSessionId === null) { return request }

	if (storedCSRF !== null) {
		const csrfCookie = JSON.parse(storedCSRF)
		cookieString = cookieString.concat(
			csrfCookie.name.concat('=', csrfCookie.cookie)
		)
	}
	if (storedSessionId !== null && cookieString !== '') {
		const sessionIdCookie = JSON.parse(storedSessionId)
		cookieString = cookieString.concat(
			'; ',
			sessionIdCookie.name.concat('=', sessionIdCookie.cookie)
		)
	} else if (storedSessionId !== null) {
		const sessionIdCookie = JSON.parse(storedSessionId)
		cookieString = cookieString.concat(
			sessionIdCookie.name.concat('=', sessionIdCookie.cookie)
		)
	}
	Object.assign(
		request.headers,
		{ 'Cookie': cookieString }
	)
	return request
}

const generateBackEndService = () => {
	const baseService = Axios.create({
		baseURL: `${backEndURL}`,
		timeout: 1000,
		withCredentials: false,
		
		
	})

	// Add request headers
	baseService.interceptors.request.use(async (request: AxiosRequestConfig) => {
		// Add X-CSRFToken header
		request = await setCSRFToken(baseService, request)
		// Add stored cookies header
		request = await setCookies(request)
		// console.log(request.headers)
		return request
	})

	// Store response cookies
	baseService.interceptors.response.use(async (response: AxiosResponse) => {
		storeCookies(response)
		return response
	})

	return baseService
}

export { generateBackEndService }
