/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-qr-scanner' {
	import { type CSSProperties, Component } from 'react'

	interface QrScannerProps {
		delay?: number
		onError?: (error: any) => void
		onScan?: (data: { text: string } | null) => void
		style?: CSSProperties
	}

	export default class QrScanner extends Component<QrScannerProps> {}
}
